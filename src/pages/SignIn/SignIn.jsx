import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithCode } from '../../utils/auth';
import './SignIn.css';

function SignIn() {
	const [code, setCode] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSignIn = async (e) => {
		e.preventDefault();

		try {
			const user = await loginWithCode(code, password);
			console.log('User authenticated:', user);

			navigate('/welcome');
		} catch (error) {
			console.error('Error signing in:', error);
			alert('Invalid code or password. Please try again.');
		}
	};

	return (
		<div className='signin-page'>
			<div className='signin-header'>
				<h1 className='signin-title'>Welcome</h1>
				<p className='signin-subtitle'>Please sign in or create an account</p>
			</div>

			<div className='signin-form-container'>
				<form className='signin-form' onSubmit={handleSignIn}>
					<div className='input-group'>
						<label htmlFor='code'>Code</label>
						<input
							type='text'
							id='code'
							className='input-field'
							placeholder='Enter your code'
							value={code}
							onChange={(e) => setCode(e.target.value)}
						/>
					</div>

					<div className='input-group'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							className='input-field'
							placeholder='Enter your password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<button type='submit' className='signin-button'>
						Sign in
					</button>

					<p className='signup-message'>
						Don't have an account?{' '}
						<span className='signup-link' onClick={() => navigate('/signup')}>
							Sign up
						</span>
					</p>
				</form>
			</div>
		</div>
	);
}

export default SignIn;
