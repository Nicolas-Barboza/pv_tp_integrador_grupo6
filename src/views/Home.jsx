import React, { useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { fetchProducts } from '../redux/slices/productsSlice'; 
import Titulo from '../components/Titulo';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from '../components/Spinner'; 

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

function Home() { 
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.items);
    const productStatus = useSelector(state => state.products.status);
    const productError = useSelector(state => state.products.error);

    useEffect(() => {
        if (productStatus === 'idle') {
            dispatch(fetchProducts());
        }
    }, [productStatus, dispatch]);

    if (productStatus === 'loading') {
        return <Spinner />;
    }

    if (productStatus === 'failed') {
        return (
            <Container className="py-4 text-center">
                <Titulo texto="Error al cargar productos" />
                <p>Ocurrió un error: {productError}</p>
            </Container>
        );
    }

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