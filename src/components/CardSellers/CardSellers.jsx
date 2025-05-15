import { Stack, Avatar, Typography, Box, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useState, useEffect } from 'react';
import { db, auth } from '../../services/firebase';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';

const CardSellers = ({
	name,
	isActive,
	isFavorite,
	img,
	starProduct,
	onToggleFavorite
}) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [favorite, setFavorite] = useState(isFavorite);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setCurrentUser(user);
		});

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		setFavorite(isFavorite);
	}, [isFavorite]);

	const handleStarClick = async (event) => {
		// Importante: Crear un evento sintético si no se proporciona uno
		const syntheticEvent = event || {
			stopPropagation: () => {},
			preventDefault: () => {}
		};

		// Detener la propagación para evitar la navegación
		syntheticEvent.stopPropagation();
		syntheticEvent.preventDefault();

		console.log("Estrella clickeada");

		if (!currentUser) {
			console.error("Usuario no autenticado");
			alert("Debes iniciar sesión para guardar favoritos");
			return;
		}

		try {
			const userId = currentUser.uid;

			// Usar el nombre como ID del documento
			const sellerId = name;

			const sellerData = {
				name: name || "Sin nombre",
				isActive: isActive !== undefined ? isActive : false,
				img: img || "",
				starProduct: starProduct || 0,
				addedAt: new Date().toISOString()
			};

			const favoriteRef = doc(db, `users/${userId}/favorites/${sellerId}`);

			// Toggle del estado local
			const newFavoriteState = !favorite;
			setFavorite(newFavoriteState);

			if (newFavoriteState) {
				// Añadir a favoritos
				await setDoc(favoriteRef, sellerData);
				console.log("Vendedor añadido a favoritos");
			} else {
				// Eliminar de favoritos
				await deleteDoc(favoriteRef);
				console.log("Vendedor eliminado de favoritos");
			}

			// Llamar a la función de callback para actualizar el estado en el componente padre
			// Pasar el evento sintético
			if (onToggleFavorite) {
				onToggleFavorite(syntheticEvent);
			}
		} catch (error) {
			console.error("Error al gestionar favoritos:", error);
			setFavorite(!favorite);
			alert("Error al guardar favorito: " + error.message);
		}
	};

	return (
		<Box
			sx={{
				backgroundColor: '#2A4555',
				borderRadius: 5,
				maxWidth: 365,
				height: 70,
				padding: 1,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				marginBottom: 1.5,
			}}
		>
			<Stack direction='row' alignItems='center' justifyContent='start' spacing={2}>
				<Avatar src={img} sx={{ width: 55, height: 55 }} />
				<Stack sx={{ width: 150, height: 60, alignItems: 'flex-start' }}>
					<Typography color='white' fontWeight='bold' variant='subtitle1'>
						{name}
					</Typography>
					<Typography
						color='White'
						variant='body1'
						sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}
					>
						<StarBorderIcon />
						{starProduct}
					</Typography>
				</Stack>
			</Stack>
			<Stack direction='row' alignItems='center' spacing={1}>
				<Stack
					sx={{
						width: 10,
						height: 10,
						borderRadius: '50%',
						backgroundColor: isActive ? 'lightgreen' : 'orange',
					}}
				/>
				<Typography color='white' fontSize='0.9rem' variant='body2'>
					{isActive ? 'Activo' : 'Inactivo'}
				</Typography>
			</Stack>

			<IconButton
				onClick={(e) => handleStarClick(e)}
				sx={{
					padding: 1,
					'&:hover': {
						backgroundColor: 'rgba(255, 255, 255, 0.1)'
					}
				}}
			>
				{favorite ?
					<StarIcon sx={{ color: 'yellow', fontSize: '1.5rem' }} /> :
					<StarBorderIcon sx={{ color: 'white', fontSize: '1.5rem' }} />
				}
			</IconButton>
		</Box>
	);
};

export default CardSellers;
