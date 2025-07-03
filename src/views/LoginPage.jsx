import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSessionUser } from '../redux/slices/usersSlice'; // Importa la acción para establecer la sesión
import Titulo from '../components/Titulo';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.css';

function LoginPage({ mostrarNotification }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state) => state.users.entities); // Obtener la lista de usuarios registrados

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Limpiar errores previos

        // Buscar el usuario por email y password en la lista de usuarios
        const foundUser = users.find(
            (user) => user.email === email && user.password === password
        );

        if (foundUser) {
            // Si el usuario es encontrado, establecer la sesión
            dispatch(setSessionUser({ email: foundUser.email, name: foundUser.name })); // Guarda al menos el correo y el nombre
            if (mostrarNotification) {
                mostrarNotification(`¡Bienvenido, ${foundUser.name || foundUser.email}!`, 'success'); // Muestra mensaje de bienvenida
            }
            navigate('/home'); // Redirige a la página Home
        } else {
            // Si no coincide, mostrar error
            setError('Credenciales inválidas. Por favor, verifica tu correo y contraseña.');
            if (mostrarNotification) {
                mostrarNotification('Credenciales inválidas.', 'error');
            }
        }
    };
    console.log("LoginPage loaded");

    return (
        <div className="login-wrapper">
            <Titulo texto="Iniciar Sesión" />
            <Container className="login-container">
            <Card className="login-card">
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Ingresa tu correo"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                isInvalid={!!error} // Marca como inválido si hay un error general
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                isInvalid={!!error} // Marca como inválido si hay un error general
                            />
                            {error && (
                                <Form.Control.Feedback type="invalid">
                                    {error}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mt-3">
                            Ingresar
                        </Button>
                        <div className="text-center mt-3">
                            ¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
        </div>
    );
}

export default LoginPage;