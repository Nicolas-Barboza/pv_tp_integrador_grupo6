import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaHome, FaInfoCircle, FaHeart } from 'react-icons/fa'; 
import { BsFillBoxSeamFill} from 'react-icons/bs';
import '../styles/CustomNavBar.css';

function NavBar() {
    return (
        <Navbar fixed="top" expand="lg" variant="dark" className="custom-navbar">
            <Container fluid>
                <Navbar.Brand as={NavLink} to="/home" className="custom-navbar-brand">
                    <BsFillBoxSeamFill className="me-2 icono-titulo" />
                    Sistema de Gestión de Productos
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link as={NavLink} to="/home" className="custom-nav-link">
                            <FaHome className="me-1" /> Inicio
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/favorites" className="custom-nav-link">
                            <FaHeart className="me-1" /> Favoritos
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/acerca" className="custom-nav-link">
                            <FaInfoCircle className="me-1" /> Acerca de
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;