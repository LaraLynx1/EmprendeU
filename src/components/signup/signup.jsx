    import { useState } from 'react';
    import './SignUp.css';

    function SignUp({ onSwitchToSignIn }) {
      const [signupName, setSignupName] = useState('');
      const [signupLastName, setSignupLastName] = useState('');
      const [signupPassword, setSignupPassword] = useState('');
      const [userType, setUserType] = useState('');

      const handleSignUp = (e) => {
        e.preventDefault();
        console.log('Registrando usuario:', {
          signupName,
          signupLastName,
          signupPassword,
          userType
        });
        // Aquí iría la lógica de registro
      };

      return (
        <div className="signup-container">
          <div className="signup-header">
            <h1 className="signup-main-title">EmprendeU</h1>
            <h3 className="signup-subtitle">Crea tu cuenta y comienza a emprender</h3>
          </div>

          <div className="signup-form-container">
            <h2 className="signup-form-title">Registrarse</h2>
            <form onSubmit={handleSignUp} className="signup-form">
              <div className="signup-form-group">
                <label htmlFor="signup-name" className="signup-label">Nombre:</label>
                <input
                  type="text"
                  id="signup-name"
                  className="signup-input"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                />
              </div>

              <div className="signup-form-group">
                <label htmlFor="signup-lastname" className="signup-label">Apellido:</label>
                <input
                  type="text"
                  id="signup-lastname"
                  className="signup-input"
                  value={signupLastName}
                  onChange={(e) => setSignupLastName(e.target.value)}
                  required
                />
              </div>

              <div className="signup-form-group">
                <label htmlFor="signup-password" className="signup-label">Contraseña:</label>
                <input
                  type="password"
                  id="signup-password"
                  className="signup-input"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
              </div>

              <div className="signup-user-type-selection">
                <p className="signup-selection-label">Selecciona tu tipo de usuario:</p>
                <div className="signup-user-type-buttons">
                  <button
                    type="button"
                    className={`signup-type-btn ${userType === 'vendedor' ? 'signup-selected' : ''}`}
                    onClick={() => setUserType('vendedor')}
                  >
                    Vendedor
                  </button>
                  <button
                    type="button"
                    className={`signup-type-btn ${userType === 'cliente' ? 'signup-selected' : ''}`}
                    onClick={() => setUserType('cliente')}
                  >
                    Cliente
                  </button>
                </div>
              </div>

              <button type="submit" className="signup-submit-btn">Registrarse</button>
            </form>

            <p className="signup-have-account">
              Already have an account? <a href="#" className="signup-link" onClick={(e) => {
                e.preventDefault();
                onSwitchToSignIn();
              }}>Sign in</a>
            </p>
          </div>
        </div>
      );
    }

    export default SignUp;
