import React, { useState } from 'react';
import './game.css';
import logo from '../../resources/icesilogo.png';
import Navbar from '../../components/navbar/navbar';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import { useNavigate } from 'react-router-dom';

function Game() {
	const navigate = useNavigate();
	const [revealedCard, setRevealedCard] = useState(null);
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

	const handleScratch = (index) => {
		setRevealedCard(index);
	};

	const handleClose = () => {
		navigate('/dashboard');
	};

	return (
		<div className='game-container'>
			<div className='logo-container'>
				<img src={logo} alt='ICESI University' className='logo' />
			</div>

			{/* Botón de cerrar añadido desde la rama geraldine */}
			<button className='close-btn' onClick={handleClose}>
				X
			</button>

			<h1 className='game-title'>Scratch and win a discount!</h1>

			{/* Grid adaptativo para desktop/mobile */}
			<div className={`scratch-card-grid ${isDesktop ? 'desktop-grid' : ''}`}>
				{Array.from({ length: 6 }).map((_, index) => (
					<div
						key={index}
						className={`scratch-card ${revealedCard === index ? 'revealed' : ''}`}
						onClick={() => handleScratch(index)}
					>
						{revealedCard === index ? (
							index === 2 ? (
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

			{/* Navbar solo en mobile (mejora de la rama geraldine) */}
			{!isDesktop && <Navbar />}
		</div>
	);
}

export default Game;
