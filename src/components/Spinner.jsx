// src/components/Spinner.jsx
import React from 'react';
import '../styles/Spinner.css';

function Spinner() {
  return (
    <div className="spinner-overlay">
      <div className="spinner-container">
        <div className="loading-spinner"></div>
        {/* Agregamos el texto aquí */}
        <p className="loading-text">Cargando productos...</p>
      </div>
    </div>
  );
}

export default Spinner;