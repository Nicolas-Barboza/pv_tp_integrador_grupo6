import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { toggleFavorite } from '../redux/slices/favoritesSlice'; // Import action
import styles from '../styles/AlumnoCard.module.css'; // You might want to rename this CSS module
import { FaEdit, FaTrashAlt, FaEye, FaHeart } from 'react-icons/fa';
import ConfirmacionModal from './ConfirmacionModal';

function ProductCard({ product, onEliminar }) {
    if (!product) {
        return null;
    }
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites.items);
    const isFavorite = favorites.some(fav => fav.id === product.id);

    const [showModal, setShowModal] = React.useState(false);

    const handleEliminarClick = () => {
        setShowModal(true);
    };

    const handleConfirmarEliminar = () => {
        if (product && onEliminar) {
            onEliminar(product.id);
        }
    };

    const handleToggleFavorite = () => {
        dispatch(toggleFavorite(product)); // Dispatch toggleFavorite action
    };

    return (
        <div className={styles.alumnoCard}>
            <div className={styles.infoContainer}>
                <h4>{product.title}</h4>
                <p><strong>Precio:</strong> ${product.price}</p>
                <p><strong>Categoría:</strong> {product.category}</p>
            </div>
            <div className={styles.actionsContainer}>
                <Link to={`/products/${product.id}/edit`} className={styles.iconLink} title="Editar Producto">
                    <FaEdit />
                </Link>
                <button onClick={handleEliminarClick} className={styles.iconButton} title="Eliminar Producto">
                    <FaTrashAlt />
                </button>
                <Link to={`/products/${product.id}`} className={styles.iconLink} title="Ver Detalles">
                    <FaEye />
                </Link>
                <button onClick={handleToggleFavorite} className={styles.iconButton} title="Marcar como favorito">
                    <FaHeart style={{ color: isFavorite ? 'red' : 'gray' }} />
                </button>
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
export default ProductCard;