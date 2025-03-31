import { useState } from 'react';

function SignIn() {
  const [signinName, setSigninName] = useState('');
  const [signinPassword, setSigninPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('Iniciando sesión con:', { signinName, signinPassword });
    // Aquí iría la lógica de autenticación
  };

  return (
    <div className="signin-form">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSignIn}>
        <div className="form-group">
          <label htmlFor="signin-name">Nombre:</label>
          <input
            type="text"
            id="signin-name"
            value={signinName}
            onChange={(e) => setSigninName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="signin-password">Contraseña:</label>
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
    </div>
  );
}

export default SignIn;
