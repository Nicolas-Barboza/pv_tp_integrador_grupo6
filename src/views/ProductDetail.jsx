import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/ProductDetail.module.css';
import { addFavorite, removeFavorite } from '../redux/slices/favoritesSlice';
import { FaHeart, FaEdit, FaTrashAlt, FaArrowLeft } from 'react-icons/fa';
import ConfirmacionModal from '../components/ConfirmacionModal';
import { useNavigate } from 'react-router-dom';


function ProductDetail({ onDeleteSuccess }) {
    const { id: productIdParamString } = useParams();
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.items);
    const favorites = useSelector(state => state.favorites.items);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const isFavorite = product && favorites.some(fav => fav.id === product.id);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleEliminarClick = () => {
        setShowModal(true);
    };

    const handleConfirmarEliminar = () => {
        if (product) {
            if (onDeleteSuccess) {
                onDeleteSuccess(product.id, product.title);
            }
            setShowModal(false);
        }
    };

    const handleEditar = () => {
        navigate(`/products/${product.id}/edit`);
    };

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
            // Lógica condicional para añadir o remover
            if (isFavorite) {
                dispatch(removeFavorite(product.id)); // Pasa solo el ID para remover
            } else {
                dispatch(addFavorite(product)); // Pasa el producto completo para añadir
            }
        }
    };

    if (loading) {
        return (
            <div>
                <p style={{ textAlign: 'center', marginTop: '20px' }}>Cargando detalles del producto...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div>
                <p style={{ textAlign: 'center', marginTop: '20px' }}>
                    Producto no encontrado o ID inválido.
                </p>
                <div className={styles.centeredButtonContainer}>
                    <Link to="/Home" className={styles.backArrowButton} title="Volver a página principal">
                        <FaArrowLeft className={styles.iconBeforeText} /> Volver a Inicio
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className={styles.productDetailPage}>
                <Link to="/Home" className={styles.backArrow} title="Volver a página principal"> <FaArrowLeft /> </Link>
                <div className={styles.detalleWrapper}>
                    <div className={styles.imageWrapper}>
                        <div className={styles.col2}>
                            <img src={product.image} alt={product.title} className={styles.imagenDetalle} />
                        </div>
                    </div>
                    <div className={styles.col1}>
                        <div className={styles.detalleContainer}>
                            <div className={styles.actionsContainer}>
                                <button onClick={handleEditar} className={`${styles.iconButton} ${styles.editButton}`} title="Editar Producto">
                                    <FaEdit />
                                </button>
                                <button onClick={handleEliminarClick} className={styles.iconButton} title="Eliminar Producto">
                                    <FaTrashAlt />
                                </button>
                            </div>
                            <p className={styles.tituloDetalle}>{product.title}</p>
                            <div className={styles.infoFila}>
                                <div className={styles.idCircle}><strong>ID:</strong>{product.id}</div>
                                <div className={styles.idCircle}><strong>Categoría:</strong> {product.category}</div>
                                <div className={styles.iconWrapper}>
                                    <button onClick={handleToggleFavorite} className={styles.iconButton} title="Marcar como favorito">
                                        <FaHeart style={{ color: isFavorite ? 'red' : 'gray', fontSize: '1.2em' }} />
                                    </button>
                                </div>
                            </div>
                            <hr className={styles.lineaDivisoria} />
                            <p className={styles.precioDetalle}><strong>Precio:</strong> ${product.price}</p>
                            <p className={styles.parrafoDetalle}><strong className={styles.strongDetalle}>Stock:</strong> {product.stock ?? product.rating?.count ?? "N/A"}</p>
                            <p className={styles.parrafoDetalle}><strong className={styles.strongDetalle}>Descripción:</strong> {product.description}</p>
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmacionModal
                show={showModal}
                onHide={() => setShowModal(false)}
                onConfirm={handleConfirmarEliminar}
                title="Confirmar Eliminación"
                message={`¿Estás seguro de que deseas eliminar el producto ${product.title}?`}
            />
        </div>
    );
}

export default ProductDetail;