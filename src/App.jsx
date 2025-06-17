import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Notification from './components/Notification';
import AppContent from './components/AppContent';

function App() {
  const [notification, setNotification] = useState(null);

  const mostrarNotification = (mensaje, tipo) => {
    setNotification({ mensaje, tipo });
  };

  return (
    <div>
      <Router>
        <div className="app-container">
          <NavBar />
          <AppContent mostrarNotification={mostrarNotification} />
          <Footer />
        </div>
        {notification && (
          <Notification
            mensaje={notification.mensaje}
            tipo={notification.tipo}
            onClose={() => setNotification(null)}
          />
        )}
      </Router>
    </div>
  );
}

export default App;