import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './welcome.css';

const Welcome = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => {
			navigate('/dashboard');
		}, 5000);

		return () => clearTimeout(timer);
	}, [navigate]);

	return (
		<div className='welcome-container'>
			<div className='background-overlay'>
				<div className='welcome-text'>
					<h1>WELCOME</h1>
					<p>
						to your marketplace for
						<br />
						students of ICESI
					</p>
				</div>
			</div>
		</div>
	);
};

export default Welcome;
