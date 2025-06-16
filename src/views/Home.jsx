import Titulo from '../components/Titulo';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const listContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
};
const noProductsStyle = {
    textAlign: 'center',
    marginTop: '30px',
    fontSize: '1.1em',
};

function Home({ products}) {
    if (!products || products.length === 0) {
        return (
            <Container className="py-4">
                <div className="d-flex justify-content-center align-items-center flex-column">
                    <Titulo texto={"Lista de Productos"} />
                    <div style={noProductsStyle}>
                        <p>No hay productos para mostrar.</p>
                        <Link to="/products/new" className="btn btn-success mt-3">
                            Agregar Nuevo Producto
                        </Link>
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <Container className="pt-0 pb-4">
            <Row className="mb-4 align-items-center">
                <Col></Col>
                <Col xs={12} md={6} lg={4} className="text-center"> 
                    <Titulo texto={"Lista de Productos"} />
                </Col>
                <Col className="text-end">
                    <Link to="/products/new">
                        <Button variant="primary" className="d-flex align-items-center ms-auto">
                            <FaPlusCircle className="me-2" />
                            Crear Nuevo Producto
                        </Button>
                    </Link>
                </Col>
            </Row>

            <div style={listContainerStyle}>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </Container>
    );
}

export default Home;