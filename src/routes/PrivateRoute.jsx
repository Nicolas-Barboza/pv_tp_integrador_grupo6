import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLogin } from '../utils/auth'; 

const PrivateRoute = ({ children }) => {
    // Verifica si el usuario está logueado usando la función de auth.js
    if (isLogin()) {
        // Si está logueado, renderiza los componentes hijos 
        return children;
    } else {
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;