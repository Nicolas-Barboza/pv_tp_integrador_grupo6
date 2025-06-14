import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from './redux/slices/productsSlice'; 
import { removeFavorite } from './redux/slices/favoritesSlice'; 
import NavBar from './components/NavBar';
import Home from './views/Home'; 
import ProductDetail from './views/ProductDetail';
import ProductForm from './views/ProductForm';
import FavoritesPage from './views/FavoritesPage';
import Footer from './components/Footer';
import Notification from './components/Notification';

function App() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);
  const productStatus = useSelector(state => state.products.status);
  const productError = useSelector(state => state.products.error);
  const favorites = useSelector(state => state.favorites.items);

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  const mostrarNotification = (mensaje, tipo) => {
    setNotification({ mensaje, tipo });
  };

  const handleGuardarProducto = (productData, esEdicion) => {
    if (esEdicion) {
      dispatch(updateProduct({ id: productData.id, updatedProduct: productData }));
      mostrarNotification('Producto editado con éxito', 'success');
    } else {
      const newProductWithTempId = { ...productData, id: Math.max(...products.map(p => p.id)) + 1 };
      dispatch(addProduct(newProductWithTempId));
      mostrarNotification('Producto guardado con éxito', 'success');
    }
  };

  const handleEliminarProducto = (productIdToDelete) => {
    dispatch(deleteProduct(productIdToDelete));
    dispatch(removeFavorite(productIdToDelete));
    mostrarNotification('Producto eliminado con éxito', 'error');
  };

  if (productStatus === 'loading') {
    return <div>Cargando productos...</div>;
  }

  if (productStatus === 'failed') {
    return <div>Error al cargar productos: {productError}</div>;
  }

  return (
    <div>
      <Router>
        <div className="app-container">
          <NavBar />
          <main className="content-wrap" style={{ paddingTop: "10px" }}>
            <div className="main-content-area">
              <Routes>
                <Route
                  path="/"
                  element={<Home products={products} favorites={favorites} />} 
                />
                <Route
                  path="/home"
                  element={<Home products={products} favorites={favorites} />} 
                />
                <Route
                  path="/products/:id"
                  element={<ProductDetail products={products} favorites={favorites} />}
                />
                <Route
                  path="/products/new"
                  element={<ProductForm products={products} onGuardar={handleGuardarProducto} />}
                />
                <Route
                  path="/products/:id/edit"
                  element={<ProductForm products={products} onGuardar={handleGuardarProducto} />}
                />
                <Route path="/favorites" element={<FavoritesPage products={products} favorites={favorites} />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </Router>
      {notification && (
        <Notification
          mensaje={notification.mensaje}
          tipo={notification.tipo}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

export default App;