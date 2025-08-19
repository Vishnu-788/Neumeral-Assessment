import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

function Layout() {
  return (
    <>
      <header>
        <NavBar />
      </header>

      <Container className="mt-4">
        <Outlet /> {/* Page content will render here */}
      </Container>
    </>
  );
}

export default Layout;
