import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLogin } from '../utils/auth'; 

// Este componente PublicRoute recibe 'children' como prop.
const PublicRoute = ({ children }) => {
    // Verifica si el usuario ya está logueado
    if (isLogin()) {
        return <Navigate to="/home" />;
    } else {
        // Si no está logueado, renderiza los componentes hijos (la ruta pública)
        return children;
    }
};

export default PublicRoute;