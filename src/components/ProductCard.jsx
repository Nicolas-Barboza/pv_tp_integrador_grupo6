import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/slices/favoritesSlice';
import styles from '../styles/ProductCard.module.css';
import { FaEye, FaHeart, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';


const renderStars = (ratingObject) => {
    const starsValue = ratingObject.rate;
    const countValue = ratingObject.count;

    const stars = [];
    const fullStars = Math.floor(starsValue);
    const hasHalfStar = starsValue % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar key={`star-full-${i}`} className={styles.starIcon} />);
    }

    if (hasHalfStar) {
        stars.push(<FaStarHalfAlt key="star-half" className={styles.starIcon} />);
    }

    while (stars.length < 5) {
        stars.push(<FaStar key={`star-empty-${stars.length}`} className={styles.emptyStarIcon} />);
    }

    return (
        <div className={styles.ratingSection}>
            <div className={styles.starsContainer}>
                {stars}
            </div>
            <span className={styles.ratingCount}>({countValue})</span>
        </div>
    );
};

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
                    <button onClick={handleToggleFavorite} className={`${styles.iconButton} ${styles.favoriteButton}`} title="Marcar como favorito">
                        <FaHeart style={{ color: isFavorite ? 'red' : 'gray' }} />
                    </button>
                </div>
                <Card.Body className={styles.cardBodyCustom}>
                    <Card.Text className={styles.productCategory}>
                        {product.category}
                    </Card.Text>
                    <Card.Title className={styles.productTitle}>{product.title}</Card.Title>

                    {product.rating && renderStars(product.rating)}

                    <Card.Text className={styles.productDescription}>
                        {product.description ? `${product.description.substring(0, 70)}...` : 'Sin descripción disponible.'}
                    </Card.Text>

                    <div className={styles.bottomSection}>
                        <p className={styles.productPrice}>
                            ${product.price}
                        </p>
                        <Link to={`/products/${product.id}`} className={`${styles.viewDetailsButton}`} title="Ver Detalles">
                            <FaEye className={styles.eyeIcon} /> Ver Detalles
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default ProductCard;