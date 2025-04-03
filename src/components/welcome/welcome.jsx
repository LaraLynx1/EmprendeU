import { useState, useEffect } from 'react';
// import './Welcome.css';

function Welcome({ user, onNavigate }) {
  const [timeLeft, setTimeLeft] = useState(5); // 5 segundos de temporizador

  useEffect(() => {
    // Si el temporizador llega a cero, navegar a la página principal
    if (timeLeft === 0) {
      onNavigate(); // Llamar a la función de navegación proporcionada por App.jsx
      return;
    }

    // Configurar un intervalo para reducir el temporizador cada segundo
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(timer);
  }, [timeLeft, onNavigate]);

  // Si no tienes la imagen, usa este estilo alternativo:
  // <div className="welcome-container">
  return (
    <div
      className="welcome-container"
      style={{
        backgroundColor: '#10263C' // Color de fondo en lugar de imagen
        // Si quieres usar una imagen, asegúrate de que esté en la carpeta public
        // backgroundImage: `url(${process.env.PUBLIC_URL}/welcome-bg.jpg)`
      }}
    >
      <div className="welcome-content">
        <h1 className="welcome-title">¡Bienvenido a EmprendeU, {user?.name || 'Usuario'}!</h1>
        <h2 className="welcome-subtitle">
          {user?.userType === 'vendedor'
            ? 'Tu espacio para vender y crecer como emprendedor'
            : 'Descubre productos increíbles de emprendedores universitarios'}
        </h2>

        <div className="welcome-timer">
          <p>Redirigiendo a tu página principal en <span className="timer-count">{timeLeft}</span> segundos</p>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${(timeLeft / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        <button
          className="skip-button"
          onClick={onNavigate}
        >
          Ir a mi página principal
        </button>
      </div>
    </div>
  );
}

export default Welcome;
