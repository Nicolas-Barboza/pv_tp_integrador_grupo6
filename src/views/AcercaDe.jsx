import React from 'react';
import Titulo from '../components/Titulo';
import { Container, Row, Col, Card } from 'react-bootstrap';
import {
    FaReact, FaUniversity, FaGithub, FaCog, FaCloud,
    FaSyncAlt, FaExternalLinkAlt, FaCode, FaLaptopCode, FaHeart,
    FaCheckCircle, FaTools, FaShieldAlt, FaShoppingCart
} from 'react-icons/fa';
import { BsFillBoxSeamFill } from 'react-icons/bs'; 
import styles from '../styles/AcercaDe.module.css';

function AcercaDe() {
    const integrantes = [
        { nombre: "Gonzalo Nicolás Barboza", githubUser: "Nicolas-Barboza" },
        { nombre: "Facundo Santiago Cortez", githubUser: "Facundo254" },
        { nombre: "Joaquin Matías Coca", githubUser: "Coca-m" },
    ];

    return (
        <Container className={styles.acercaDePage}>
            <Titulo texto="Acerca del Proyecto" />
            <section className={styles.sectionBlock}>
                <h3 className={styles.sectionHeading}>Gestion de Productos Visión General</h3>
                <Row className="justify-content-center">
                    <Col md={10}>
                        <p className={styles.paragraphText}>
                            Este sistema es el resultado de un Trabajo Práctico Integrador para la materia de Programación Visual. Su propósito es brindar una solución robusta y moderna para la gestión de productos, combinando datos obtenidos de una API externa con la capacidad de administrar productos propios.
                        </p>
                        <p className={styles.paragraphText}>
                            Demuestra el dominio de tecnologías frontend contemporáneas como React y Redux para una gestión de estado eficiente, React Router para una navegación fluida, y Fetch para la interacción con servicios externos. Además, incorpora funcionalidades avanzadas para una experiencia de usuario completa.
                        </p>
                    </Col>
                </Row>
            </section>
            <section className={styles.sectionBlock}>
                <h3 className={styles.sectionHeading}>Pilares Fundamentales</h3>
                <Row className="justify-content-center text-center">
                    <Col lg={4} md={6} className="mb-4">
                        <Card className={styles.pillarCard}>
                            <Card.Body>
                                <FaCog className={styles.pillarIcon} />
                                <Card.Title className={styles.pillarTitle}>Diseño Modular</Card.Title>
                                <Card.Text className={styles.pillarText}>
                                    Construido sobre una arquitectura de componentes reutilizables y un estado global bien definido.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4} md={6} className="mb-4">
                        <Card className={styles.pillarCard}>
                            <Card.Body>
                                <FaSyncAlt className={styles.pillarIcon} />
                                <Card.Title className={styles.pillarTitle}>Reactividad Total</Card.Title>
                                <Card.Text className={styles.pillarText}>
                                    Respuestas rápidas a la interacción del usuario y actualizaciones de datos en tiempo real.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4} md={6} className="mb-4">
                        <Card className={styles.pillarCard}>
                            <Card.Body>
                                <FaCloud className={styles.pillarIcon} />
                                <Card.Title className={styles.pillarTitle}>Integración Externa</Card.Title>
                                <Card.Text className={styles.pillarText}>
                                    Consumo eficiente de datos de la FakeStore API para un catálogo dinámico.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </section>
            <section className={styles.sectionBlock}>
                <h3 className={styles.sectionHeading}>Ecosistema Tecnológico</h3>
                <Row className="justify-content-center">
                    <Col md={10} className="text-center">
                        <div className={styles.techStackContainer}>
                            <span className={styles.techPill}><FaReact /> React 19</span>
                            <span className={styles.techPill}><FaTools /> Redux Toolkit</span>
                            <span className={styles.techPill}><FaLaptopCode /> React Router DOM</span>
                            <span className={styles.techPill}><BsFillBoxSeamFill /> React Bootstrap</span>
                            <span className={styles.techPill}><FaExternalLinkAlt /> Fetch API</span>
                            <span className={styles.techPill}><FaCode /> Vite (Bundler)</span>
                        </div>
                        <p className={`${styles.paragraphText} mt-4`}>
                            Priorizamos un conjunto de herramientas modernas y eficientes para garantizar un rendimiento óptimo y una experiencia de desarrollo ágil.
                        </p>
                    </Col>
                </Row>
            </section>
            <section className={styles.sectionBlock}>
                <h3 className={styles.sectionHeading}>Capacidades Clave</h3>
                <Row>
                    <Col md={6}>
                        <h4 className={styles.subHeading}><FaShoppingCart />Gestión de Catálogo</h4>
                        <ul className={styles.featureList}>
                            <li><FaCheckCircle className={styles.listCheckIcon} /> Visualización híbrida de productos (API + Locales).</li>
                            <li><FaCheckCircle className={styles.listCheckIcon} /> Operaciones CRUD completas para productos locales.</li>
                            <li><FaCheckCircle className={styles.listCheckIcon} /> Detalle de producto con calificación y datos extensos.</li>
                        </ul>
                    </Col>
                    <Col md={6}>
                        <h4 className={styles.subHeading}><FaHeart /> Interacción con Favoritos</h4>
                        <ul className={styles.featureList}>
                            <li><FaCheckCircle className={styles.listCheckIcon} /> Marcar/desmarcar productos con un solo clic.</li>
                            <li><FaCheckCircle className={styles.listCheckIcon} /> Página dedicada para gestionar productos favoritos.</li>
                            <li><FaCheckCircle className={styles.listCheckIcon} /> Estado gestionado globalmente con Redux.</li>
                        </ul>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col md={6}>
                        <h4 className={styles.subHeading}><FaLaptopCode /> Experiencia de Usuario</h4>
                        <ul className={styles.featureList}>
                            <li><FaCheckCircle className={styles.listCheckIcon} /> Interfaz de usuario responsiva y adaptativa a cualquier dispositivo.</li>
                            <li><FaCheckCircle className={styles.listCheckIcon} /> Gestión visual de estados de carga y errores de API.</li>
                            <li><FaCheckCircle className={styles.listCheckIcon} /> Navegación intuitiva y sin recargas de página.</li>
                            <li><FaCheckCircle className={styles.listCheckIcon} /> Notificaciones de usuario para acciones (éxito/error).</li>
                        </ul>
                    </Col>
                    <Col md={6}>
                        <h4 className={styles.subHeading}><FaShieldAlt /> Robustez y Calidad</h4>
                        <ul className={styles.featureList}>
                            <li><FaCheckCircle className={styles.listCheckIcon} /> Base de código limpia y modular para fácil mantenimiento.</li>
                            <li><FaCheckCircle className={styles.listCheckIcon} /> Validaciones de formularios en tiempo real para mejorar la entrada de datos.</li>
                            <li><FaCheckCircle className={styles.listCheckIcon} /> Prácticas de desarrollo enfocadas en la escalabilidad.</li>
                        </ul>
                    </Col>
                </Row>
            </section>
            <section className={styles.sectionBlock}>
                <h3 className={styles.sectionHeading}>Nuestro Equipo</h3>
                <Row className="justify-content-center">
                    <Col md={8} className="text-center">
                        <ul className={styles.teamList}>
                            {integrantes.map((integrante, index) => (
                                <li key={index} className={styles.teamMember}>
                                    <FaUniversity className="me-2" /> {integrante.nombre} - GitHub:
                                    <a
                                        href={`https://github.com/${integrante.githubUser}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.githubProfileLink}
                                    >
                                        <FaGithub className="ms-2 me-1" />
                                        {integrante.githubUser}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <p className={`${styles.paragraphText} mt-4`}>
                            Desarrollado en la Facultad de Ingeniería de la Universidad Nacional de Jujuy, como parte de la carrera de Analista Programador Universitario.
                        </p>
                    </Col>
                </Row>
            </section>
        </Container>
    );
}

export default AcercaDe;