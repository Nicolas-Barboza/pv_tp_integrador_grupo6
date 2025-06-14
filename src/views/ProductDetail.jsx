import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Titulo from '../components/Titulo';
//import styles from '../styles/DetalleAlumno.module.css'; // You might want to rename this CSS module
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
            <Titulo texto={`Detalle Producto: ${product.title}`} />

            <div className={styles.detalleContainer}>
                <p className={styles.parrafoDetalle}><strong className={styles.strongDetalle}>ID:</strong> {product.id}</p>
                <p className={styles.parrafoDetalle}><strong className={styles.strongDetalle}>Título:</strong> {product.title}</p>
                <p className={styles.parrafoDetalle}><strong className={styles.strongDetalle}>Descripción:</strong> {product.description}</p>
                <p className={styles.parrafoDetalle}><strong className={styles.strongDetalle}>Precio:</strong> ${product.price}</p>
                <p className={styles.parrafoDetalle}><strong className={styles.strongDetalle}>Categoría:</strong> {product.category}</p>
                <p className={styles.parrafoDetalle}><strong className={styles.strongDetalle}>Imagen:</strong> <img src={product.image} alt={product.title} style={{ maxWidth: '100px', height: 'auto' }} /></p>
                {/* Assuming 'stock' might be a field from the API or something you add */}
                <p className={styles.parrafoDetalle}><strong className={styles.strongDetalle}>Stock:</strong> {product.rating?.count || "N/A"}</p> {/* Example: using rating.count as stock */}
                <button onClick={handleToggleFavorite} className={styles.iconButton} title="Marcar como favorito" style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.5em', marginTop: '10px' }}>
                    <FaHeart style={{ color: isFavorite ? 'red' : 'gray' }} /> {isFavorite ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
                </button>
            </div>

            <div className={styles.centeredButtonContainer}>
                <Link to="/products" className={styles.backButton}>Volver a la Lista</Link>
            </div>
        </div>
    );
}

export default ProductDetail;