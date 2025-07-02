import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import { FaHome, FaInfoCircle, FaHeart, FaUserCircle, FaSearch, FaPlusCircle, FaBars } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { removeSessionUser } from '../redux/slices/usersSlice';
import { logout } from '../utils/auth';
import { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { setSearchTerm } from '../redux/slices/productsSlice';
import '../styles/CustomNavBar.css';

function NavBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.users.sessionUser);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const isMobile = useMediaQuery({ maxWidth: 991.98 });
    const menuRef = useRef(null);

    const handleLogout = () => {
        dispatch(removeSessionUser());
        logout();
        navigate('/login');
    };

    const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(searchInput));
    
    // Redirigir a la página de inicio si no estamos ya allí
    if (window.location.pathname !== '/home') {
        navigate('/home');
    }
    
    if (isMobile) setIsSearchVisible(false);
};

    // Cerrar el menú si se hace clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <Navbar fixed="top" variant="dark" className="custom-navbar">
                <Container fluid className="justify-content-between align-items-center">
                    <div style={{ position: 'relative' }}>
                        <Button
                            variant="link"
                            className="text-white border-0 d-flex align-items-center no-underline"
                            onClick={() => setMenuVisible(!menuVisible)}
                        >
                            <FaBars className="me-2" />
                            <strong>MENÚ</strong>
                        </Button>

                        {menuVisible && (
                            <div className="custom-popup-menu" ref={menuRef}>
                                <Nav className="flex-column">
                                    <NavLink to="/home" className="simple-nav-link" onClick={() => setMenuVisible(false)}>
                                        <FaHome className="me-2" /> Inicio
                                    </NavLink>
                                    <NavLink to="/favorites" className="simple-nav-link" onClick={() => setMenuVisible(false)}>
                                        <FaHeart className="me-2" /> Favoritos
                                    </NavLink>
                                    <NavLink to="/products/new" className="simple-nav-link" onClick={() => setMenuVisible(false)}>
                                        <FaPlusCircle className="me-2" /> Crear Producto
                                    </NavLink>
                                    <NavLink to="/acerca" className="simple-nav-link" onClick={() => setMenuVisible(false)}>
                                        <FaInfoCircle className="me-2" /> Acerca de
                                    </NavLink>
                                </Nav>
                            </div>
                        )}
                    </div>

                    {sessionUser && !isMobile && (
                        <>
                            <Form className="d-flex search-form-container" onSubmit={handleSearchSubmit}>
                                <InputGroup>
                                    <FormControl
                                        type="search"
                                        placeholder="Buscar producto por nombre o descripción..."
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        className="search-input-custom"
                                    />
                                    <Button variant="outline-light" type="submit" className="search-button-custom">
                                        <FaSearch className="search-icon" />
                                    </Button>
                                </InputGroup>
                            </Form>

                            <div className="d-flex align-items-center ms-3">
                                <span className="text-white me-3">
                                    Bienvenido, <FaUserCircle className="mx-2" style={{ fontSize: '1.3em' }} />
                                    {sessionUser.name || sessionUser.email.split('@')[0]}
                                </span>
                                <Button className="btn-logout-custom" onClick={handleLogout}>
                                    Cerrar sesión
                                </Button>
                            </div>
                        </>
                    )}

                    {sessionUser && isMobile && (
                        <div className="d-flex align-items-center ms-auto">
                            <Button variant="link" className="text-white me-2" onClick={() => setIsSearchVisible(true)}>
                                <FaSearch size={18} />
                            </Button>
                            <span className="text-white me-2 d-flex align-items-center">
                                <FaUserCircle size={20} className="me-1" />
                                <span className="user-name-mobile">
                                    {sessionUser.name || sessionUser.email.split('@')[0]}
                                </span>
                            </span>
                            <Button className="btn-logout-custom py-1 px-2" onClick={handleLogout}>
                                <span>⎋</span>
                            </Button>
                        </div>
                    )}
                </Container>
            </Navbar>

            {isMobile && isSearchVisible && (
                <div className="mobile-search-container">
                    <Form onSubmit={handleSearchSubmit}>
                        <InputGroup>
                            <FormControl
                                type="search"
                                placeholder="Buscar producto por nombre o descripción..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="mobile-search-input"
                                autoFocus
                            />
                            <Button variant="outline-light" type="submit" className="mobile-search-button">
                                <FaSearch className="search-icon" />
                            </Button>
                        </InputGroup>
                    </Form>
                </div>
            )}
        </>
    );
}

export default NavBar;
