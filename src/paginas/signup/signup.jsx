import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

function SignUp() {
	const [userType, setUserType] = useState('cliente');
	const navigate = useNavigate();

	const handleSignUp = () => {
		navigate('/welcome');
	};

	return (
		<div className='signup-page'>
			<div className='signup-header'>
				<h1 className='signup-title'>CREATE AN ACCOUNT</h1>
				<p className='signup-subtitle'>create an account to continue</p>
			</div>

			<div className='signup-form-container'>
				<form className='signup-form'>
					<div className='input-group'>
						<label htmlFor='name'>Name</label>
						<input type='text' id='name' className='input-field' placeholder='Enter your name' />
					</div>

					<div className='input-group'>
						<label htmlFor='code'>Code</label>
						<input type='text' id='code' className='input-field' placeholder='Enter your code' />
					</div>

					<div className='input-group'>
						<label htmlFor='password'>Password</label>
						<input type='password' id='password' className='input-field' placeholder='Create a password' />
					</div>

					<div className='user-type-selection'>
						<button
							type='button'
							className={`type-button ${userType === 'vendedor' ? 'selected' : ''}`}
							onClick={() => setUserType('vendedor')}
						>
							vendedor
						</button>
						<button
							type='button'
							className={`type-button ${userType === 'cliente' ? 'selected' : ''}`}
							onClick={() => setUserType('cliente')}
						>
							cliente
						</button>
					</div>

					<button type='button' className='signup-button' onClick={handleSignUp}>
						Sign up
					</button>

					<p className='login-message'>
						Already have an account:{' '}
						<span className='login-link' onClick={() => navigate('/signin')}>
							Log in
						</span>
					</p>
				</form>
			</div>
		</div>
	);
}

export default SignUp;
