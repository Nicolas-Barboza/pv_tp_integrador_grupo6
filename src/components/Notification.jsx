import React, { useEffect } from 'react';

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