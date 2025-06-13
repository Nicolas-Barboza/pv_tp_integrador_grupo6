import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import './App.css'; 
import './index.css'; 
import ProductsList from './views/Home';
import Footer from './components/footer';


const ProductForm = () => <div><h1>Formulario de Producto</h1><p style={{textAlign: 'center', marginTop: '20px'}}>Esta página permitirá añadir/editar productos.</p></div>;
const FavoritesPage = () => <div><h1>Favoritos</h1><p style={{textAlign: 'center', marginTop: '20px'}}>Esta página mostrará productos favoritos.</p></div>;
const ProductDetail = () => <div><h1>Detalle del Producto</h1><p style={{textAlign: 'center', marginTop: '20px'}}>Esta página mostrará los detalles del producto.</p></div>;
const Acercade = () => <div><h1>Acerca de Nosotros</h1><p style={{textAlign: 'center', marginTop: '20px'}}>Información sobre los desarrolladores.</p></div>;


function App() {
  return (
    <div>
      <Router>
        <div className="app-container">
          <NavBar />
          <main className="content-wrap" style={{ paddingTop: "10px" }}>
            <div className="main-content-area">
              <Routes>
                <Route path="/home" element={<ProductsList />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/products/new" element={<ProductForm />} />
                <Route path="/products/:id/edit" element={<ProductForm />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/acerca" element={<Acercade />} />
              </Routes>
            </div>
          </main>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;