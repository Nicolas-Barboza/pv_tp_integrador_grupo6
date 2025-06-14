import React, { useEffect } from 'react';
//import '../styles/Notification.css'; 

const Notification = ({ mensaje, tipo, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
    onClose();
    }, 2500);
    return () => clearTimeout(timer);
    }, [mensaje, onClose]); 

    if (!mensaje) {
        return null;
    }

  // Determina la clase según el tipo de notificación para estilos
const notificationClass = `notification ${tipo === 'success' ? 'success' : 'error'}`;

return (
    <div className={notificationClass}>
    <p>{mensaje}</p>
    <button onClick={onClose} className="close-btn">
        &times; 
    </button>
    </div>
);
};
export default Notification;