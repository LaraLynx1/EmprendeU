import React, { useState } from 'react';
import './game.css';
import logo from '../../resources/icesilogo.png';
import Navbar from '../../components/navbar/navbar';

function Game() {
	const [revealedCard, setRevealedCard] = useState(null);

	const handleScratch = (index) => {
		setRevealedCard(index);
	};

	return (
		<div className='game-container'>
			<div className='logo-container'>
				<img src={logo} alt='ICESI University' className='logo' />
			</div>

			<h1 className='game-title'>Scratch and win a discount!</h1>

			<div className='scratch-card-grid'>
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

			<Navbar />
		</div>
	);
}

export default Game;
