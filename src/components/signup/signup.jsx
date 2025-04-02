// import { useState } from 'react';
// import './signup.css';

// function SignUp() {
// 	const [signupName, setSignupName] = useState('');
// 	const [signupLastName, setSignupLastName] = useState('');
// 	const [signupPassword, setSignupPassword] = useState('');
// 	const [userType, setUserType] = useState('');

// 	const handleSignUp = (e) => {
// 		e.preventDefault();
// 		console.log('Registrando usuario:', {
// 			signupName,
// 			signupLastName,
// 			signupPassword,
// 			userType,
// 		});
// 		// Aquí iría la lógica de registro
// 	};

// 	return (
// 		<div className='signup-form'>
// 			<h2>Registrarse</h2>
// 			<form onSubmit={handleSignUp}>
// 				<div className='form-group'>
// 					<label htmlFor='signup-name'>Nombre:</label>
// 					<input
// 						type='text'
// 						id='signup-name'
// 						value={signupName}
// 						onChange={(e) => setSignupName(e.target.value)}
// 						required
// 					/>
// 				</div>

// 				<div className='form-group'>
// 					<label htmlFor='signup-lastname'>Apellido:</label>
// 					<input
// 						type='text'
// 						id='signup-lastname'
// 						value={signupLastName}
// 						onChange={(e) => setSignupLastName(e.target.value)}
// 						required
// 					/>
// 				</div>

// 				<div className='form-group'>
// 					<label htmlFor='signup-password'>Contraseña:</label>
// 					<input
// 						type='password'
// 						id='signup-password'
// 						value={signupPassword}
// 						onChange={(e) => setSignupPassword(e.target.value)}
// 						required
// 					/>
// 				</div>

// 				<div className='user-type-selection'>
// 					<p>Selecciona tu tipo de usuario:</p>
// 					<div className='user-type-buttons'>
// 						<button
// 							type='button'
// 							className={userType === 'vendedor' ? 'selected' : ''}
// 							onClick={() => setUserType('vendedor')}
// 						>
// 							Vendedor
// 						</button>
// 						<button
// 							type='button'
// 							className={userType === 'cliente' ? 'selected' : ''}
// 							onClick={() => setUserType('cliente')}
// 						>
// 							Cliente
// 						</button>
// 					</div>
// 				</div>

// 				<button type='submit' className='submit-btn'>
// 					Registrarse
// 				</button>
// 			</form>
// 		</div>
// 	);
// }

// export default SignUp;


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
    <div className="signup-form">
      <h2>Registrarse</h2>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label htmlFor="signup-name">Nombre:</label>
          <input
            type="text"
            id="signup-name"
            value={signupName}
            onChange={(e) => setSignupName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="signup-lastname">Apellido:</label>
          <input
            type="text"
            id="signup-lastname"
            value={signupLastName}
            onChange={(e) => setSignupLastName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="signup-password">Contraseña:</label>
          <input
            type="password"
            id="signup-password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
            required
          />
        </div>

        <div className="user-type-selection">
          <p>Selecciona tu tipo de usuario:</p>
          <div className="user-type-buttons">
            <button
              type="button"
              className={userType === 'vendedor' ? 'selected' : ''}
              onClick={() => setUserType('vendedor')}
            >
              Vendedor
            </button>
            <button
              type="button"
              className={userType === 'cliente' ? 'selected' : ''}
              onClick={() => setUserType('cliente')}
            >
              Cliente
            </button>
          </div>
        </div>

        <button type="submit" className="submit-btn">Registrarse</button>
      </form>

      <p className="have-account">
        Already have an account? <a href="#" onClick={(e) => {
          e.preventDefault();
          onSwitchToSignIn();
        }}>Sign in</a>
      </p>
    </div>
  );
}

export default SignUp;
