import React, { useState } from 'react';
import './juego.css';
import logo from '../../recursos/icesilogo.png';
import Navbar from '../../components/navbar/navbar';

function Juego() {
	const [revealedCard, setRevealedCard] = useState(null);

	const handleScratch = (index) => {
		setRevealedCard(index);
	};

	return (
		<div className='juego-container'>
			{/* Logo */}
			<div className='logo-container'>
				<img src={logo} alt='Universidad ICESI' className='logo' />
			</div>

			{/* Título */}
			<h1 className='juego-title'>Scratch and win a discount!</h1>

			{/* Grid de tarjetas */}
			<div className='scratch-card-grid'>
				{Array.from({ length: 6 }).map((_, index) => (
					<div
						key={index}
						className={`scratch-card ${revealedCard === index ? 'revealed' : ''}`}
						onClick={() => handleScratch(index)}
					>
						{revealedCard === index ? (
							index === 2 ? ( // Tarjeta con premio
								<span className='prize-text'>25% off! Canneli roll - Maria H.</span>
							) : (
								<span className='revealed-text'>Better luck next time!</span>
							)
						) : (
							<span className='scratch-text'>Scratch me!</span>
						)}
					</div>
				))}
			</div>

			<Navbar />
		</div>
	);
}

export default Juego;
