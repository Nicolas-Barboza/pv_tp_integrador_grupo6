// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, updateProduct, deleteProduct } from './redux/slices/productsSlice'; // Solo las acciones CRUD
import { removeFavorite } from './redux/slices/favoritesSlice';
import NavBar from './components/NavBar';
import Home from './views/Home';
import ProductDetail from './views/ProductDetail';
import ProductForm from './views/ProductForm';
import FavoritesPage from './views/FavoritesPage';
import Footer from './components/Footer';
import Notification from './components/Notification';
// Ya no necesitamos importar Spinner aquí

function App() {
  const dispatch = useDispatch();
  // Ya no necesitamos productStatus ni productError aquí, Home los manejará
  const products = useSelector(state => state.products.items); // Todavía útil para manejar el ID al agregar

  const [notification, setNotification] = useState(null);

  // Ya no necesitamos useEffect para fetchProducts aquí, lo movimos a Home.jsx

  const mostrarNotification = (mensaje, tipo) => {
    setNotification({ mensaje, tipo });
  };

  const handleGuardarProducto = (productData, esEdicion) => {
    if (esEdicion) {
      dispatch(updateProduct({ id: productData.id, updatedProduct: productData }));
      mostrarNotification('Producto editado con éxito', 'success');
    } else {
      // Calcula el nuevo ID basado en los productos existentes para evitar duplicados
      const newProductId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      const newProductWithId = { ...productData, id: newProductId };
      dispatch(addProduct(newProductWithId));
      mostrarNotification('Producto guardado con éxito', 'success');
    }
  };

  const handleEliminarProducto = (productIdToDelete) => {
    dispatch(deleteProduct(productIdToDelete));
    dispatch(removeFavorite(productIdToDelete));
    mostrarNotification('Producto eliminado con éxito', 'error');
  };

  // Aquí ya no hay lógica de carga, el spinner se manejará en Home.jsx

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
                  element={<Home />} // Home ahora maneja su propia carga
                />
                <Route
                  path="/home"
                  element={<Home />} // Home ahora maneja su propia carga
                />
                <Route
                  path="/products/:id"
                  element={<ProductDetail products={products} />} // ProductDetail puede seguir recibiendo products para buscar
                />
                <Route
                  path="/products/new"
                  element={<ProductForm products={products} onGuardar={handleGuardarProducto} />}
                />
                <Route
                  path="/products/:id/edit"
                  element={<ProductForm products={products} onGuardar={handleGuardarProducto} />}
                />
                <Route path="/favorites" element={<FavoritesPage />} />
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