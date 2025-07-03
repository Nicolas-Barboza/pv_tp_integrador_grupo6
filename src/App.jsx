import React, { useState } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom'; // Importa useLocation
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
        <AppContentWithLocation
          notification={notification}
          setNotification={setNotification}
          mostrarNotification={mostrarNotification}
        />
      </Router>
    </div>
  );
}

function AppContentWithLocation({ notification, setNotification, mostrarNotification }) {
  const location = useLocation();
  const hidePaths = ['/login', '/registro']; 
  const shouldShowHeaderAndFooter = !hidePaths.includes(location.pathname);

  return (
    <div className="app-container">
      {shouldShowHeaderAndFooter && <NavBar />} 
      <AppContent mostrarNotification={mostrarNotification} />
      {shouldShowHeaderAndFooter && <Footer />}
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