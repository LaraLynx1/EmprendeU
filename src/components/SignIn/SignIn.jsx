import { useState } from 'react';
import './SignIn.css';

function SignIn({ onSwitchToSignUp }) {
  const [signinName, setSigninName] = useState('');
  const [signinPassword, setSigninPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('Iniciando sesión con:', { signinName, signinPassword });
    // Aquí iría la lógica de autenticación
  };

  return (
<>
    <div className="signin-form">
      <form onSubmit={handleSignIn}>
        <div className="form-group">
          <label htmlFor="signin-name">Code:</label>
          <input
            type="text"
            id="signin-name"
            value={signinName}
            onChange={(e) => setSigninName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="signin-password">Password:</label>
          <input
            type="password"
            id="signin-password"
            value={signinPassword}
            onChange={(e) => setSigninPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Iniciar Sesión</button>
      </form>
      <p className="no-account">
        Don't have an account: <a href="#" onClick={(e) => {
          e.preventDefault(); // Prevenir la navegación del enlace
          onSwitchToSignUp(); // Llamar a la función para cambiar a SignUp
        }}>Sign up</a>
      </p>
    </div>
    </>
  );
}

export default SignIn;