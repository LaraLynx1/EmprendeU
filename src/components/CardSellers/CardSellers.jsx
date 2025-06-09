import { Stack, Avatar, Typography, Box, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState, useEffect } from 'react';
import { db, auth } from '../../services/firebase';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const CardSellers = ({ name, id, isFavorite, img, onToggleFavorite, variant = 'default', isActive }) => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
	const [currentUser, setCurrentUser] = useState(null);
	const [favorite, setFavorite] = useState(isFavorite);
	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
		});
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		setFavorite(isFavorite);
	}, [isFavorite]);

	const handleStarClick = async (event) => {
		event?.stopPropagation();
		event?.preventDefault();

		if (!currentUser) {
			alert('Debes iniciar sesión para guardar favoritos');
			return;
		}

		try {
			const userId = currentUser.uid;
			const sellerId = id || name;
			const sellerData = {
				name: name || 'Sin nombre',
				img: img || '',
				addedAt: new Date().toISOString(),
			};

			const favoriteRef = doc(db, `users/${userId}/favorites/${sellerId}`);
			const newFavoriteState = !favorite;
			setFavorite(newFavoriteState);

			if (newFavoriteState) {
				await setDoc(favoriteRef, sellerData);
			} else {
				await deleteDoc(favoriteRef);
			}

			if (onToggleFavorite) {
				onToggleFavorite(event);
			}
		} catch (error) {
			console.error('Error al gestionar favoritos:', error);
			setFavorite(!favorite); 
		}
	};

	const handleCardClick = () => {
		const validSellerId = id || name;
		navigate(`/perfil-comercial/${validSellerId}`, {
			state: {
				id: validSellerId,
				sellerId: validSellerId,
				name,
				img,
				isActive, // <-- Usa el valor real
			},
		});
	};

	return (
		<Box
			sx={{
				backgroundColor: variant === 'large' ? '#FDFBF7' : '#2A4555',
				borderRadius: 5,
				width: isDesktop ? (variant === 'large' ? '100%' : '90%') : '100%',
				height: isDesktop ? (variant === 'large' ? 120 : 102) : 70,
				padding: isDesktop ? (variant === 'large' ? 3 : 2) : 1,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				marginBottom: isDesktop ? 0 : 2,
				cursor: 'pointer',
				'&:hover': {
					transform: 'scale(1.01)',
					transition: 'transform 0.2s ease',
				},
			}}
			onClick={handleCardClick}
		>
			<Stack direction='row' alignItems='center' spacing={2}>
				<Avatar
					src={img}
					sx={{
						width: isDesktop ? (variant === 'large' ? 80 : 70) : 55,
						height: isDesktop ? (variant === 'large' ? 80 : 70) : 55,
						border: variant === 'large' ? '2px solid #2A4555' : 'none',
					}}
				/>
				<Stack sx={{ width: isDesktop ? (variant === 'large' ? 300 : 250) : 150 }}>
					<Typography
						color={variant === 'large' ? '#2A4555' : 'white'}
						fontWeight='bold'
						variant={isDesktop ? 'h6' : 'subtitle1'}
					>
						{name}
					</Typography>
				</Stack>
			</Stack>

			<Stack direction='row' alignItems='center' spacing={2}>
				<Stack direction='row' alignItems='center' spacing={1}>
					<Box
						sx={{
							width: 10,
							height: 10,
							borderRadius: '50%',
							backgroundColor: isActive ? 'lightgreen' : 'orange',
						}}
					/>
					<Typography
						color={variant === 'large' ? '#2A4555' : 'white'}
						fontSize={isDesktop ? '1rem' : '0.9rem'}
						variant='body2'
					>
						{isActive ? 'Activo' : 'Inactivo'}
					</Typography>
				</Stack>

				<IconButton
					onClick={(e) => handleStarClick(e)}
					sx={{
						color: favorite ? 'yellow' : variant === 'large' ? '#2A4555' : 'white',
						'&:hover': {
							backgroundColor: 'rgba(255, 255, 255, 0.1)',
						},
					}}
				>
					{favorite ? <StarIcon /> : <StarBorderIcon />}
				</IconButton>
			</Stack>
		</Box>
	);
};

export default CardSellers;
