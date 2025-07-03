import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { add } from '../redux/slices/usersSlice'; 
import Titulo from '../components/Titulo';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import '../styles/RegisterPage.css';

// Por ahora, la definimos aquí para simplicidad
const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
};

function RegisterPage({ mostrarNotification }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Obtener la lista de usuarios para verificar duplicados
    const users = useSelector((state) => state.users.entities);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState(''); 
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let newErrors = {};
        let isValid = true;

        if (!isValidEmail(email)) {
            newErrors.email = 'Formato de correo electrónico inválido.';
            isValid = false;
        } else if (users.some(user => user.email === email)) { 
            newErrors.email = 'Este correo electrónico ya está registrado.';
            isValid = false;
        }

        if (password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
            isValid = false;
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({}); // Limpiar errores previos

        if (validateForm()) {
            const newUser = {
                id: Date.now(), // ID simple basado en timestamp
                email: email,
                password: password,
                name: name, // Guarda el campo extra
            };
            dispatch(add(newUser)); // Despacha la acción 'add' con el nuevo usuario
            if (mostrarNotification) {
                mostrarNotification('Registro exitoso. ¡Ahora puedes iniciar sesión!', 'success');
            }
            navigate('/login'); // Redirige a la página de Login
        } else {
            if (mostrarNotification) {
                mostrarNotification('Por favor, corrige los errores en el formulario.', 'error');
            }
        }
    };

    return (
        
        <div className="register-wrapper">
        <Container className="register-container">
        <Titulo texto="Registro de Usuario" />
        <Card className="register-card">
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Ingresa tu correo"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                isInvalid={!!errors.email}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Campo extra: Nombre */}
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Nombre (Opcional)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Tu nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                isInvalid={!!errors.password}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formConfirmPassword">
                            <Form.Label>Confirmar Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirma tu contraseña"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                isInvalid={!!errors.confirmPassword}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.confirmPassword}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button type="submit" className="register-button">
                            Registrarse
                        </Button>
                        <div className="register-link">
                            ¿Ya tienes una cuenta? <Button variant="link" onClick={() => navigate('/login')}>Inicia Sesión</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
        </div>
    );
}

export default RegisterPage;