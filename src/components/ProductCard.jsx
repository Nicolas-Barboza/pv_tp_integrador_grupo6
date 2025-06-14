import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/slices/favoritesSlice';
import styles from '../styles/ProductCard.module.css'; 
import { FaEye, FaHeart } from 'react-icons/fa'; 
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

function ProductCard({ product }) {
    if (!product) {
        return null;
    }
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites.items);
    const isFavorite = favorites.some(fav => fav.id === product.id);

    const handleToggleFavorite = () => {
        dispatch(toggleFavorite(product)); 
    };

    return (
        <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className={styles.productCardCustom}>
                <div className={styles.imageWrapper}>
                    <Card.Img
                        variant="top"
                        src={product.image}
                        alt={product.title}
                        className={styles.productImage}
                    />
                </div>
                <Card.Body className={styles.cardBodyCustom}>
                    <Card.Title className={styles.productTitle}>{product.title}</Card.Title>
                    <Card.Text className={styles.productCategory}>
                        <strong>Categoría:</strong> {product.category}
                    </Card.Text>
                    <Card.Text className={styles.productDescription}>
                        {product.description ? `${product.description.substring(0, 70)}...` : 'Sin descripción disponible.'}
                    </Card.Text>
                    
                    <div className={styles.bottomSection}>
                        <p className={styles.productPrice}>
                            ${product.price}
                        </p>
                        <div className={styles.actionsGroup}>
                            <Link to={`/products/${product.id}`} className={`${styles.iconButton} ${styles.viewButton}`} title="Ver Detalles">
                                <FaEye />
                            </Link>
                            <button onClick={handleToggleFavorite} className={`${styles.iconButton} ${styles.favoriteButton}`} title="Marcar como favorito">
                                <FaHeart style={{ color: isFavorite ? 'red' : 'gray' }} />
                            </button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default ProductCard;