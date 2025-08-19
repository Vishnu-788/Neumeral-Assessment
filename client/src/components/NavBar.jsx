import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuthContext";
import { API_ENDPOINTS } from "../utils/api";
import "./styles/navbar.css";

function NavBar() {
  const { token, logout } = useAuth();

  const logoutUser = async () => {
    try {
      await fetch(API_ENDPOINTS.SIGN_OUT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      logout(); // clear client session
    } catch (err) {
      console.error("Logout Error:", err);
      logout(); // still clear local session on failure
    }
  };

  return (
    <Navbar className="custom-navbar">
      <Container className="d-flex justify-content-between align-items-center">
        {/* Brand Part */}
        <Navbar.Brand as={Link} to="/">
          MyClinic
        </Navbar.Brand>

        {/* Buttons Part */}
        <div className="button-group">
          {token ? (
            <>
              <Button
                as={Link}
                to="/profile"
                variant="outline-light"
                className="me-2"
              >
                Profile
              </Button>
              <Button
                as={Link}
                to="/appointments"
                variant="outline-light"
                className="me-2"
              >
                Appoinments
              </Button>
              <Button onClick={logoutUser} variant="light">
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button
                as={Link}
                to="/signin"
                variant="outline-light"
                className="me-2"
              >
                Sign In
              </Button>
              <Button as={Link} to="/register" variant="light">
                Register
              </Button>
            </>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;
