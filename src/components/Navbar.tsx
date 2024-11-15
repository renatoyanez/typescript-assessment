import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function CustomNavbar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Link to="/">
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
        </Link>

        <Nav className="me-auto">
          <Link to="/">
            <Nav.Link href="/">Home</Nav.Link>
          </Link>
          <Link to="/dashboard">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
