import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { collection, getDocs, query, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../services/firebase';
import CardSellers from '../CardSellers/CardSellers';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import WhiteLogo from '../../resources/logo icesi white.png';

const Favorites = () => {
	const [favorites, setFavorites] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((currentUser) => {
			console.log("Estado de autenticación:", currentUser ? "Usuario autenticado" : "No autenticado");
			setUser(currentUser);

			if (!currentUser) {
				setError("Debes iniciar sesión para ver tus favoritos");
				setLoading(false);
			}
		});

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const fetchFavorites = async () => {
			if (!user) return;

			try {
				setLoading(true);
				console.log("Iniciando búsqueda de favoritos para usuario:", user.uid);

				const favoritesRef = collection(db, `users/${user.uid}/favorites`);
				const favoritesQuery = query(favoritesRef);

				console.log("Ejecutando consulta a Firestore...");
				const favoritesSnapshot = await getDocs(favoritesQuery);
				console.log("Respuesta recibida, documentos:", favoritesSnapshot.docs.length);

				const favoritesData = favoritesSnapshot.docs.map(doc => {
					console.log("Datos del documento:", doc.id, doc.data());
					return {
						id: doc.id,
						...doc.data(),
						isFavorite: true
					};
				});

				console.log("Favoritos procesados:", favoritesData);
				setFavorites(favoritesData);
				setLoading(false);
			} catch (error) {
				console.error("Error al obtener favoritos:", error);
				setError("Error al cargar los favoritos: " + error.message);
				setLoading(false);
			}
		};

		if (user) {
			fetchFavorites();
		}
	}, [user]);

	const removeFavorite = async (sellerId) => {
		try {
			if (!user) {
				setError("Debes iniciar sesión para gestionar tus favoritos");
				return;
			}

			console.log(`Eliminando favorito: ${sellerId}`);

			const favoriteDocRef = doc(db, `users/${user.uid}/favorites`, sellerId);
			await deleteDoc(favoriteDocRef);

			setFavorites(favorites.filter(seller => seller.id !== sellerId));
			console.log(`Vendedor ${sellerId} eliminado de favoritos`);
		} catch (error) {
			console.error("Error al eliminar favorito:", error);
			setError("Error al eliminar favorito: " + error.message);
		}
	};

	const handleLogin = () => {
		navigate('/login');
	};

	return (
		<Box
			sx={{
				paddingBlock: 2,
				width: '100%',
				height: '100vh',
				backgroundColor: '#10263C',
				display: 'flex',
				justifyContent: 'center',
				overflow: 'hidden',
			}}
		>
			<Box
				sx={{
					height: '100%',
					width: '100%',
					maxWidth: '600px',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Box sx={{ flexShrink: 0 }}>
					<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 3 }}>
						<img src={WhiteLogo} alt='Logo' style={{ width: 120 }} />
					</Box>
					<Typography variant='h5' color='white' sx={{ textAlign: 'center', mb: 3 }}>
						Mis Favoritos
					</Typography>
				</Box>

				<Box
					sx={{
						flexGrow: 1,
						overflowY: 'auto',
						paddingX: 2,
						paddingBottom: 2,
						scrollbarWidth: 'none',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						'&::-webkit-scrollbar': {
							display: 'none',
						},
					}}
				>
					{loading ? (
						<CircularProgress color='primary' sx={{ mt: 4 }} />
					) : error ? (
						<Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
							<Typography color='error' sx={{ mb: 2, textAlign: 'center' }}>
								{error}
							</Typography>
							{!user && (
								<Button
									variant="contained"
									color="primary"
									onClick={handleLogin}
								>
									Iniciar Sesión
								</Button>
							)}
						</Box>
					) : favorites.length === 0 ? (
						<Typography color='white' sx={{ mt: 4, textAlign: 'center' }}>
							No tienes vendedores favoritos guardados.
						</Typography>
					) : (
						favorites.map((seller) => (
							<Box
								key={seller.id}
								component='button'
								onClick={() => {
									navigate('/seller-profile', { state: { sellerId: seller.id } });
								}}
								sx={{
									all: 'unset',
									width: '100%',
									cursor: 'pointer',
									marginBottom: 1,
								}}
							>
								<CardSellers
									name={seller.name}
									isActive={seller.isActive}
									isFavorite={seller.isFavorite}
									img={seller.img}
									starProduct={seller.starProduct}
									onToggleFavorite={(e) => {
										if (e) e.stopPropagation();
										removeFavorite(seller.id);
									}}
								/>
							</Box>
						))
					)}
				</Box>
			</Box>

			<Box
				sx={{
					position: 'fixed',
					bottom: 0,
					width: '100%',
					zIndex: 10,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Navbar />
			</Box>
		</Box>
	);
};

export default Favorites;
