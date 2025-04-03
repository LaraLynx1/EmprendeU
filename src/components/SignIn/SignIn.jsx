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
		<div className='signin-container'>
			<div className='signin-header'>
				<h1 className='main-title'>WELCOME</h1>
				<h3 className='subtitle'>Please sign in or create an account</h3>
			</div>

			<div className='signin-form'>
				<form onSubmit={handleSignIn}>
					<div className='form-group'>
						<label htmlFor='signin-email'>Code:</label>
						<input type='email' id='signin-email' value={email} onChange={(e) => setEmail(e.target.value)} required />
					</div>

					<div className='form-group'>
						<label htmlFor='signin-password'>Password:</label>
						<input
							type='password'
							id='signin-password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					<button type='submit' className='submit-btn'>
						Iniciar Sesión
					</button>
				</form>

				<p className='no-account'>
					¿No tienes una cuenta?{' '}
					<a
						href='#'
						onClick={(e) => {
							e.preventDefault();
							onSwitchToSignUp();
						}}
					>
						Regístrate
					</a>
				</p>
			</div>
		</div>
	);
}

export default SignIn;
