import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, selectFilteredProducts, setCategoryFilter } from '../redux/slices/productsSlice';
import Titulo from '../components/Titulo';
import ProductCard from '../components/ProductCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from '../components/Spinner';
import '../styles/Home.css';

const listContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    padding: '20px 0'
};

const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'electronics', name: 'Electrónicos' },
    { id: 'jewelery', name: 'Joyería' },
    { id: "men's clothing", name: 'Ropa Masculina' },
    { id: "women's clothing", name: 'Ropa Femenina' }
];

function Home() {
    const dispatch = useDispatch();
    const filteredProducts = useSelector(selectFilteredProducts);
    const productStatus = useSelector(state => state.products.status);
    const productError = useSelector(state => state.products.error);
    const currentCategory = useSelector(state => state.products.categoryFilter);

    useEffect(() => {
        if (productStatus === 'idle') {
            dispatch(fetchProducts());
        }
    }, [productStatus, dispatch]);

    const handleCategoryFilter = (category) => {
        dispatch(setCategoryFilter(category));
    };

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

    return (
        <Container className="pt-0 pb-4 home-container">
            <Row className="mb-10">
                <Col xs={12} className="text-center">
                    <Titulo texto="Los Mejores Productos" />
                </Col>
            </Row>

            <Row className="mb-4 justify-content-center">
                <Col xs={12} md={10} lg={8}>
                    <div className="category-buttons-container">
                        <div className="category-buttons">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    className={`category-btn ${currentCategory === category.id ? 'active' : ''}`}
                                    onClick={() => handleCategoryFilter(category.id)}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </Col>
            </Row>

            <div style={listContainerStyle}>
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>

            {filteredProducts.length === 0 && productStatus === 'succeeded' && (
                <div className="text-center py-5 no-products">
                    <p>No se encontraron productos</p>
                </div>
            )}
        </Container>
    );
}

export default Home;