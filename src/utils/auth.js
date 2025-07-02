// Función para verificar si un usuario está logueado
export const isLogin = () => {
    // Busca la clave 'sessionUser' en localStorage
    if (localStorage.getItem('sessionUser')) {
        return true;
    }
    return false;
};

// Función para obtener los datos del usuario logueado
export const getUser = () => {
    try {
        const sessionUser = localStorage.getItem('sessionUser');
        return sessionUser ? JSON.parse(sessionUser) : null;
    } catch (e) {
        console.error("Error al parsear sessionUser de localStorage", e);
        return null;
    }
};

// Función para cerrar sesión
// La limpieza del estado de Redux se hará al despachar removeSessionUser en el componente.
export const logout = () => {
    localStorage.removeItem('sessionUser');
    console.log('Sesión cerrada correctamente desde auth.js');
};