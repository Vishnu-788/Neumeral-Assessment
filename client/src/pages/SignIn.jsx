import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import { API_ENDPOINTS } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuthContext";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    const signin = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.SIGN_IN, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch {
            errorData = { error: "Sign In failed" };
          }
          setError(errorData.error || "Sign In failed");
          console.error("Sign In Error:", errorData);
          return;
        }

        const res = await response.json();
        login(res.token);
        navigate("/");
      } catch (err) {
        setError("An error occurred while signing in. Please try again.");
        console.error("Sign In Error:", err);
      }
    };
    signin();
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <Card style={{ width: "22rem", padding: "1.5rem" }}>
            <h3 className="text-center mb-3">Sign In</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Sign In
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SignIn;
