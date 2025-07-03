import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { deleteProduct } from '../redux/slices/productsSlice';
import { removeFavorite } from '../redux/slices/favoritesSlice';
import Home from '../views/Home';
import ProductDetail from '../views/ProductDetail';
import ProductForm from '../views/ProductForm';
import FavoritesPage from '../views/FavoritesPage';
import AcercaDe from '../views/AcercaDe';
import LoginPage from '../views/LoginPage';       
import RegisterPage from '../views/RegisterPage';
import PrivateRoute from '../routes/PrivateRoute'; 
import PublicRoute from '../routes/PublicRoute';  

// Importa tus utilidades de autenticación
import { isLogin } from '../utils/auth'; // Necesario para la lógica de redirección inicial

function AppContent({ mostrarNotification }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.users.sessionUser); // Obtener el usuario de la sesión

    const handleProductFormSuccess = (message, type) => {
        mostrarNotification(message, type);
        navigate('/home');
    };

    const handleProductDeleteSuccess = (productIdToDelete, productTitle) => {
        dispatch(deleteProduct(productIdToDelete));
        dispatch(removeFavorite(productIdToDelete));
        mostrarNotification(`Producto "${productTitle}" eliminado con éxito`, 'error');
        navigate('/home');
    };

    return (
        <>
            <main className="content-wrap" style={{ paddingTop: "10px" }}>
                <div className="main-content-area">
                    <Routes>
                        <Route path="/" element={isLogin() ? <Home /> : <LoginPage mostrarNotification={mostrarNotification} />} />
                        <Route path="/login" element={<PublicRoute><LoginPage mostrarNotification={mostrarNotification} /></PublicRoute>} />
                        <Route path="/registro" element={<PublicRoute><RegisterPage mostrarNotification={mostrarNotification} /></PublicRoute>} />
                        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                        <Route path="/products/:id" element={<PrivateRoute><ProductDetail onDeleteSuccess={handleProductDeleteSuccess} /></PrivateRoute>} />
                        <Route path="/products/new" element={<PrivateRoute><ProductForm onFormSubmitSuccess={handleProductFormSuccess} /></PrivateRoute>} />
                        <Route path="/products/:id/edit" element={<PrivateRoute><ProductForm onFormSubmitSuccess={handleProductFormSuccess} /></PrivateRoute>} />
                        <Route path="/favorites" element={<PrivateRoute><FavoritesPage /></PrivateRoute>} />
                        <Route path="/acerca" element={<PrivateRoute><AcercaDe /></PrivateRoute>} />

                        {/* Manejo de rutas no encontradas, también protegidas */}
                        <Route path="*" element={<PrivateRoute><h1 style={{textAlign: 'center', marginTop: '50px'}}>Página no encontrada (404)</h1></PrivateRoute>} />
                    </Routes>
                </div>
            </main>
        </>
    );
}

export default AppContent;