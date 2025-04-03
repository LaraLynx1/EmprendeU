import { useState } from 'react';
import './SignIn.css';
import { verifyUser } from '../../utils/userStore';

function SignIn({ onSwitchToSignUp }) {
  const [codigo, setCodigo] = useState(''); // Cambiado de email a codigo
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();

    // Verificar credenciales
    const result = verifyUser(codigo, password);

    if (result.success) {
      setIsError(false);
      setMessage(`Bienvenido, ${result.user.name}!`);

      // Aquí podrías guardar el usuario en el estado global o en localStorage
      // y redirigir a la página principal
      console.log('Usuario autenticado:', result.user);

      // Limpiar el formulario
      setCodigo('');
      setPassword('');
    } else {
      setIsError(true);
      setMessage(result.message);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-header">
        <h1 className="signin-main-title">EmprendeU</h1>
        <h3 className="signin-subtitle">Inicia sesión para continuar</h3>
      </div>

      <div className="signin-form-container">
        <h2 className="signin-form-title">Iniciar Sesión</h2>

        {message && (
          <div className={`signin-message ${isError ? 'signin-error' : 'signin-success'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSignIn} className="signin-form">
          <div className="signin-form-group">
            <label htmlFor="signin-codigo" className="signin-label">Código:</label>
            <input
              type="text" // Cambiado de email a text
              id="signin-codigo" // Cambiado el id
              className="signin-input"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
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
