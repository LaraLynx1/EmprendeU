import React, { useEffect, useState } from 'react';
import './game.css';
import logo from '../../resources/icesilogo.png';
import Navbar from '../../components/navbar/navbar';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../services/firebase';
import { collection, getDocs } from 'firebase/firestore';

function Game() {
	const navigate = useNavigate();
	const [cards, setCards] = useState([]);
	const [revealedCard, setRevealedCard] = useState(null);
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

	useEffect(() => {
		const fetchGameProducts = async () => {
			const querySnapshot = await getDocs(collection(db, 'users'));
			let gameProducts = [];

			querySnapshot.forEach((doc) => {
				const user = doc.data();
				const userProducts = user.productos || [];
				const active = userProducts
					.filter((p) => p.juegoDescuento?.activo)
					.map((p) => ({
						...p,
						vendor: user.nombre || 'Usuario desconocido',
					}));
				gameProducts.push(...active);
			});

			const selected = shuffleArray(gameProducts)
				.slice(0, 3)
				.map((product) => ({
					type: 'coupon',
					discount: product.juegoDescuento.porcentaje,
					product: product.nombre,
					vendor: product.vendor,
					code: generateCouponCode(),
				}));

			const blanks = Array.from({ length: 3 }, () => ({
				type: 'blank',
			}));

			setCards(shuffleArray([...selected, ...blanks]));
		};

		fetchGameProducts();
	}, []);

	const generateCouponCode = () => {
		const randomPart = Math.floor(100 + Math.random() * 900);
		const timePart = new Date().getTime().toString().slice(-3);
		return `${randomPart}-${timePart}`;
	};

	const shuffleArray = (array) => {
		return array
			.map((value) => ({ value, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ value }) => value);
	};

	const handleScratch = (index) => {
		setRevealedCard(index);
	};

	const handleClose = () => {
		navigate('/dashboard');
	};

	return (
		<div className='game-container'>
			<div className='logo-container'>
				<img src={logo} alt='ICESI University' className='logoGame' />
			</div>

			<button className='close-btn' onClick={handleClose}>
				X
			</button>

			<h1 className='game-title'>Scratch and win a discount!</h1>

			<div className={`scratch-card-grid ${isDesktop ? 'desktop-grid' : ''}`}>
				{cards.map((card, index) => (
					<div
						key={index}
						className={`scratch-card ${revealedCard === index ? 'revealed' : ''}`}
						onClick={() => handleScratch(index)}
					>
						{revealedCard === index ? (
							card.type === 'coupon' ? (
								<div className='prize-text'>
									<strong>{card.discount}% off!</strong>
									<br />
									{card.product}
									<br />
									{card.vendor}
									<br />
								</div>
							) : (
								<span className='revealed-text'>Better luck next time!</span>
							)
						) : (
							<span className='scratch-text'>Scratch me!</span>
						)}
					</div>
				))}
			</div>

			{!isDesktop && <Navbar />}
		</div>
	);
}

export default Game;
