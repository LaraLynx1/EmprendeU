import React, { useEffect, useState } from 'react';
import './game.css';
import logo from '../../resources/icesilogo.png';
import Navbar from '../../components/navbar/navbar';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../services/firebase';
import { collection, getDocs, doc, getDoc, updateDoc, setDoc, Timestamp } from 'firebase/firestore';

function Game() {
	const navigate = useNavigate();
	const [cards, setCards] = useState([]);
	const [revealedIndexes, setRevealedIndexes] = useState([]);
	const [remainingScratches, setRemainingScratches] = useState(2);
	const [alreadyPlayed, setAlreadyPlayed] = useState(false);

	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

	const shuffleArray = (array) => {
		return array
			.map((value) => ({ value, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ value }) => value);
	};

	const generateCouponCode = () => {
		const randomPart = Math.floor(100 + Math.random() * 900);
		const timePart = new Date().getTime().toString().slice(-3);
		return `${randomPart}-${timePart}`;
	};

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
					vendor: user.name || 'Usuario desconocido',
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

	const checkDailyPlayLimit = async () => {
		const user = auth.currentUser;
		if (!user) return;

		const userRef = doc(db, 'users', user.uid);
		const userSnap = await getDoc(userRef);

		if (userSnap.exists()) {
			const data = userSnap.data();
			const lastPlayed = data.lastPlayed?.toDate();

			const today = new Date();
			today.setHours(0, 0, 0, 0);

			if (lastPlayed && lastPlayed.getTime() === today.getTime()) {
				setAlreadyPlayed(true);
				setRemainingScratches(data.scratchesLeft ?? 0);
			} else {
				// Reset for new day
				await updateDoc(userRef, {
					lastPlayed: Timestamp.fromDate(today),
					scratchesLeft: 2,
				});
				setRemainingScratches(2);
			}
		}
	};

	const handleScratch = async (index) => {
		if (revealedIndexes.includes(index) || remainingScratches <= 0) return;

		const user = auth.currentUser;
		if (!user) return;

		const userRef = doc(db, 'users', user.uid);

		const newRevealed = [...revealedIndexes, index];
		setRevealedIndexes(newRevealed);

		const newRemaining = remainingScratches - 1;
		setRemainingScratches(newRemaining);

		await updateDoc(userRef, {
			scratchesLeft: newRemaining,
		});

		const card = cards[index];
		if (card.type === 'coupon') {
			const couponRef = doc(collection(userRef, 'coupons'));
			await setDoc(couponRef, {
				product: card.product,
				discount: card.discount,
				vendor: card.vendor,
				code: card.code,
				createdAt: Timestamp.now(),
			});
		}
	};

	const handleClose = () => {
		navigate('/dashboard');
	};

	useEffect(() => {
		checkDailyPlayLimit();
		fetchGameProducts();
	}, []);

	useEffect(() => {
	if (remainingScratches === 0) {
		const timer = setTimeout(() => {
			navigate('/dashboard');
		}, 10000);

		return () => clearTimeout(timer); 
	}
}, [remainingScratches, navigate]);

	return (
		<div className='game-container'>
			<div className='logo-container'>
				<img src={logo} alt='ICESI University' className='logoGame' />
			</div>

			<button className='close-btn' onClick={handleClose}>
				X
			</button>

			<h1 className='game-title'>
				{alreadyPlayed && remainingScratches === 0 ? 'You already played today!' : 'Scratch and win a discount!'}
			</h1>

			<div className={`scratch-card-grid ${isDesktop ? 'desktop-grid' : ''}`}>
				{cards.map((card, index) => (
					<div
						key={index}
						className={`scratch-card ${revealedIndexes.includes(index) ? 'revealed' : ''}`}
						onClick={() => handleScratch(index)}
					>
						{revealedIndexes.includes(index) ? (
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
