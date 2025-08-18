import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles/navbar.css";

function NavBar() {
  return (
    <Navbar className="custom-navbar">
      <Container className="d-flex justify-content-between align-items-center">
        {/* Brand Part */}
        <Navbar.Brand as={Link} to="/">
          MyBrand
        </Navbar.Brand>

        {/* Buttons Part */}
        <div className="button-group">
          <Button
            as={Link}
            to="/signin"
            variant="outline-light"
            className="me-2"
          >
            Sign In
          </Button>
          <Button as={Link} to="/dummy" variant="light">
            Dummy
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;
