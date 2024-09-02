import { NavLink } from "react-router-dom";
import { CartWidget } from "./CartWidget";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export const NavBar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
        <Navbar.Brand as={NavLink} to="/">TecnoMar</Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/category/Laptos">Laptos</Nav.Link>
            <Nav.Link as={NavLink} to="/category/Tablets">Tablets</Nav.Link>
            <Nav.Link as={NavLink} to="/category/Telefonos">Telefonos</Nav.Link>
          </Nav>
          <CartWidget />
        </Container>
      </Navbar>
      
  );
};
