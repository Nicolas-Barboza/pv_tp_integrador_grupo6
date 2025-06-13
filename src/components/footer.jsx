import { Container, Row, Col } from 'react-bootstrap';
import { FaTwitter, FaFacebookF, FaGoogle, FaLinkedinIn, FaGithub, FaInstagram } from 'react-icons/fa';
import '../styles/CustomFooter.css'; 

function Footer() {
    return (
        <footer className="custom-footer">
            <Container> 
                <Row>
                    <Col className="text-center"> 
                        <div className="mb-2"> 
                            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="social-icon me-3">
                                <FaTwitter size={22} />
                            </a>
                            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="social-icon me-3">
                                <FaFacebookF size={22} />
                            </a>
                            <a href="https://google.com/" target="_blank" rel="noopener noreferrer" className="social-icon me-3">
                                <FaGoogle size={22} />
                            </a>
                            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="social-icon me-3">
                                <FaLinkedinIn size={22} />
                            </a>
                            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="social-icon me-3">
                                <FaGithub size={22} />
                            </a>
                        </div>
                        <p> © 2025 | Facultad de Ingeniería - Carrera APU - Grupo 6  </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;