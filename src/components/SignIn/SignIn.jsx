import { useState } from 'react';
import './SignIn.css';

function SignIn({ onSwitchToSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('Iniciando sesión:', { email, password });
    // Aquí iría la lógica de inicio de sesión
  };

  return (
    <div className="signin-container">
      <div className="signin-header">
        <h1 className="signin-main-title">EmprendeU</h1>
        <h3 className="signin-subtitle">Inicia sesión para continuar</h3>
      </div>

      <div className="signin-form-container">
        <h2 className="signin-form-title">Iniciar Sesión</h2>
        <form onSubmit={handleSignIn} className="signin-form">
          <div className="signin-form-group">
            <label htmlFor="signin-email" className="signin-label">Email:</label>
            <input
              type="email"
              id="signin-email"
              className="signin-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="signin-form-group">
            <label htmlFor="signin-password" className="signin-label">Contraseña:</label>
            <input
              type="password"
              id="signin-password"
              className="signin-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="signin-submit-btn">Iniciar Sesión</button>
        </form>

        <p className="signin-no-account">
          ¿No tienes una cuenta? <a href="#" className="signin-link" onClick={(e) => {
            e.preventDefault();
            onSwitchToSignUp();
          }}>Regístrate</a>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
