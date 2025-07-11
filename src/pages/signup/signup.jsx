import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../../services/firebase';
import './SignUp.css';

function SignUp() {
	const [name, setName] = useState('');
	const [code, setCode] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [userType, setUserType] = useState('customer');
	const navigate = useNavigate();

	const handleSignUp = async (e) => {
		e.preventDefault();

		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const uid = userCredential.user.uid;

			await setDoc(doc(db, 'users', uid), {
				name,
				code,
				email,
				phoneNumber,
				userType,
			});

			localStorage.setItem('userType', userType);
			alert('Account created successfully!');
			navigate('/welcome');
		} catch (error) {
			console.error('Error signing up:', error);
			alert('Failed to create account. Please try again.');
		}
	};

	return (
		<div className='signup-page'>
			<div className='signup-header'>
				<h1 className='signup-title'>Create an account</h1>
				<p className='signup-subtitle'>Create an account to continue</p>
			</div>

			<div className='signup-form-container'>
				<form className='signup-form' onSubmit={handleSignUp}>
					<div className='input-group'>
						<label htmlFor='name'>Name</label>
						<input
							type='text'
							id='name'
							className='input-field'
							placeholder='Enter your name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>

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
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							id='email'
							className='input-field'
							placeholder='Enter your email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div className='input-group'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							className='input-field'
							placeholder='Create a password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					{userType === 'seller' && (
						<div className='input-group'>
							<label htmlFor='phoneNumber'>Phone Number</label>
							<input
								type='text'
								id='phoneNumber'
								className='input-field'
								placeholder='Enter your phone number'
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
							/>
						</div>
					)}

					<div className='user-type-selection'>
						<button
							type='button'
							className={`type-button ${userType === 'seller' ? 'selected' : ''}`}
							onClick={() => setUserType('seller')}
						>
							Seller
						</button>
						<button
							type='button'
							className={`type-button ${userType === 'customer' ? 'selected' : ''}`}
							onClick={() => setUserType('customer')}
						>
							Customer
						</button>
					</div>

					<button type='submit' className='signup-button'>
						Sign up
					</button>

					<p className='login-message'>
						Already have an account?{' '}
						<span className='login-link' onClick={() => navigate('/signIn')}>
							Log in
						</span>
					</p>
				</form>
			</div>
		</div>
	);
}

export default SignUp;
