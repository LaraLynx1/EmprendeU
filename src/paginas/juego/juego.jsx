import React, { useState } from 'react';
import './juego.css';
import logo from '../../recursos/icesilogo.png'; // Importa la imagen

function Juego() {
	const [revealedCard, setRevealedCard] = useState(null);

	const handleScratch = (index) => {
		setRevealedCard(index);
	};

	return (
		<div className='juego-container'>
			{/* Logo */}
			<div className='logo-container'>
				<img
					src={logo} // Usa la imagen importada
					alt='Universidad ICESI'
					className='logo'
				/>
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

			{/* Barra de navegación */}
			<div className='navbar'>
				<div className='nav-icon'>🏠</div>
				<div className='nav-icon active'>👤</div>
				<div className='nav-icon'>⭐</div>
			</div>
		</div>
	);
}

export default Juego;
