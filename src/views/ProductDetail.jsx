import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Titulo from '../components/Titulo';
import styles from '../styles/ProductDetail.module.css'; 
import { FaHeart } from 'react-icons/fa';

function ProductDetail() {
    const { id: productIdParamString } = useParams(); // Changed lu to id
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.items);
    const favorites = useSelector(state => state.favorites.items);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const isFavorite = product && favorites.some(fav => fav.id === product.id);

    useEffect(() => {
        setLoading(true);
        if (productIdParamString && products && products.length > 0) {
            const productIdNumeric = parseInt(productIdParamString, 10);
            if (isNaN(productIdNumeric)) {
                console.warn("ProductDetail: El ID de la URL no es un número válido:", productIdParamString);
                setProduct(null); setLoading(false); return;
            }
            const productFound = products.find(p => p.id === productIdNumeric);
            setProduct(productFound || null);
        } else {
            setProduct(null);
        }
        setLoading(false);
    }, [productIdParamString, products]);


    const handleToggleFavorite = () => {
        if (product) {
            dispatch(toggleFavorite(product));
        }
    };

    if (loading) {
        return (
            <div>
                <Titulo texto="Cargando Detalles del Producto" />
                <p style={{ textAlign: 'center', marginTop: '20px' }}>Cargando detalles del producto...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div>
                <Titulo texto="Error al Cargar Detalles" />
                <p style={{ textAlign: 'center', marginTop: '20px' }}>
                    Producto no encontrado o ID inválido.
                </p>
                <div className={styles.centeredButtonContainer}>
                    <Link to="/products" className={styles.backButton}>Volver a la Lista</Link>
                </div>
            </div>
        );
    }

    return (
        <div>
        <div className={styles.detalleWrapper}>
        <div className={styles.imageWrapper}>
        <div className={styles.col2}>
            <img src={product.image} alt={product.title} className={styles.imagenDetalle} />
        </div>
        </div>
        <div className={styles.col1}>
        <div className={styles.detalleContainer}>
            <p className={styles.tituloDetalle}>{product.title}</p>
            <div className={styles.infoFila}>
            <div className={styles.idCircle}><strong>ID:</strong>{product.id}</div>
            <div className={styles.idCircle}><strong>Categoría:</strong> {product.category}</div>
        <div className={styles.iconWrapper}>
            <button onClick={handleToggleFavorite} className={styles.iconButton}title="Marcar como favorito">
                <FaHeart style={{ color: isFavorite ? 'red' : 'gray', fontSize: '1.2em' }} />
            </button>
        </div>
        </div>
        <hr className={styles.lineaDivisoria} />
            <p className={styles.precioDetalle}><strong>Precio:</strong> ${product.price}</p>
            <p className={styles.parrafoDetalle}><strong className={styles.strongDetalle}>Stock:</strong> {product.rating?.count || "N/A"}</p><hr className={styles.lineaDivisoria} />
            <p className={styles.parrafoDetalle}><strong className={styles.strongDetalle}>Descripción:</strong> {product.description}</p>
        </div>
        </div>
    </div>
        <div className={styles.centeredButtonContainer}>
            <Link to="/products" className={styles.backButton}>Volver a la Lista</Link>
        </div>
    </div>
    );
}

export default ProductDetail;