import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../redux/slices/productsSlice';
import { removeFavorite } from '../redux/slices/favoritesSlice';
import Home from '../views/Home';
import ProductDetail from '../views/ProductDetail';
import ProductForm from '../views/ProductForm';
import FavoritesPage from '../views/FavoritesPage';
import AcercaDe from '../views/AcercaDe';

function AppContent({ mostrarNotification }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleProductFormSuccess = (message, type) => {
        mostrarNotification(message, type);
        navigate('/home'); // Navegar a Home después de guardar/editar
    };

    // Función para manejar la eliminación de un producto
    const handleProductDeleteSuccess = (productIdToDelete, productTitle) => {
        dispatch(deleteProduct(productIdToDelete));
        dispatch(removeFavorite(productIdToDelete));
        mostrarNotification(`Producto "${productTitle}" eliminado con éxito`, 'error'); // Notificación de eliminación
        navigate('/home'); // Navegar a Home después de eliminar
    };

    return (
        <>
            <main className="content-wrap" style={{ paddingTop: "10px" }}>
                <div className="main-content-area">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route
                            path="/products/:id"
                            element={<ProductDetail onDeleteSuccess={handleProductDeleteSuccess} />}
                        />
                        <Route
                            path="/products/new"
                            element={<ProductForm onFormSubmitSuccess={handleProductFormSuccess} />}
                        />
                        <Route
                            path="/products/:id/edit"
                            element={<ProductForm onFormSubmitSuccess={handleProductFormSuccess} />}
                        />
                        <Route path="/favorites" element={<FavoritesPage />} />
                        <Route path="/acerca" element={<AcercaDe />}/>
                    </Routes>
                </div>
            </main>
        </>
    );
}

export default AppContent;