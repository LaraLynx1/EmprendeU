import { useState, useEffect } from 'react';
import {
	Box,
	Typography,
	CircularProgress,
	Button,
	useMediaQuery,
	useTheme,
	Avatar,
	IconButton,
	Container,
} from '@mui/material';
import { collection, getDocs, query, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../services/firebase';
import CardSellers from '../../components/CardSellers/CardSellers';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import WhiteLogo from '../../resources/logo icesi white.png';
import BlueLogo from '../../resources/logo icesi blue.png';
import { Menu } from '@mui/icons-material';
import avatarImage from '../../resources/avatar.png';
import Sidebar from '../../components/SideBar/Sidebar';

const Favorites = () => {
	const [favorites, setFavorites] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [user, setUser] = useState(null);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const navigate = useNavigate();
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((currentUser) => {
			console.log('Estado de autenticación:', currentUser ? 'Usuario autenticado' : 'No autenticado');
			setUser(currentUser);

			if (!currentUser) {
				setError('Debes iniciar sesión para ver tus favoritos');
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
				console.log('Iniciando búsqueda de favoritos para usuario:', user.uid);

				const favoritesRef = collection(db, `users/${user.uid}/favorites`);
				const favoritesQuery = query(favoritesRef);

				console.log('Ejecutando consulta a Firestore...');
				const favoritesSnapshot = await getDocs(favoritesQuery);
				console.log('Respuesta recibida, documentos:', favoritesSnapshot.docs.length);

				const favoritesData = favoritesSnapshot.docs.map((doc) => {
					console.log('Datos del documento:', doc.id, doc.data());
					return {
						id: doc.id,
						...doc.data(),
						isFavorite: true,
					};
				});

				console.log('Favoritos procesados:', favoritesData);
				setFavorites(favoritesData);
				setLoading(false);
			} catch (error) {
				console.error('Error al obtener favoritos:', error);
				setError('Error al cargar los favoritos: ' + error.message);
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
				setError('Debes iniciar sesión para gestionar tus favoritos');
				return;
			}

			console.log(`Eliminando favorito: ${sellerId}`);

			const favoriteDocRef = doc(db, `users/${user.uid}/favorites`, sellerId);
			await deleteDoc(favoriteDocRef);

			setFavorites(favorites.filter((seller) => seller.id !== sellerId));
			console.log(`Vendedor ${sellerId} eliminado de favoritos`);
		} catch (error) {
			console.error('Error al eliminar favorito:', error);
			setError('Error al eliminar favorito: ' + error.message);
		}
	};

	const handleLogin = () => {
		navigate('/login');
	};

	return (
		<Box
			sx={{
				width: '100%',
				minHeight: '100vh',
				backgroundColor: isDesktop ? '#FDFBF7' : '#10263C',
				display: 'flex',
				flexDirection: 'column',
				overflowX: 'hidden',
				paddingBottom: isDesktop ? 2 : '80px',
			}}
		>
			{isDesktop && (
				<Container
					maxWidth='100%'
					sx={{
						width: '100%',
						px: 4,
						py: 2,
					}}
				>
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<IconButton onClick={() => setSidebarOpen(true)} sx={{ color: isDesktop ? '#2A4555' : 'white' }}>
							<Menu />
						</IconButton>

						<img src={isDesktop ? BlueLogo : WhiteLogo} alt='Logo' style={{ width: 130 }} />

						<Box sx={{ flex: 1 }} />

						<Avatar
							src={avatarImage}
							alt='Avatar'
							sx={{
								width: 64,
								height: 64,
								cursor: 'pointer',
								border: '2px solid white',
							}}
							onClick={() => navigate('/perfil-personal')}
						/>
					</Box>
				</Container>
			)}

			{isDesktop && <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />}

			<Box
				sx={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: isDesktop ? 'row' : 'column',
					...(isDesktop && {
						paddingLeft: '280px',
						justifyContent: 'flex-end',
					}),
				}}
			>
				{!isDesktop && (
					<>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								my: 3,
							}}
						>
							<img src={WhiteLogo} alt='Logo' style={{ width: 120 }} />
						</Box>
						<Typography variant='h5' color='white' sx={{ textAlign: 'center', mb: 3 }}>
							Mis Favoritos
						</Typography>
					</>
				)}

				<Box
					sx={{
						width: isDesktop ? '50%' : '100%',
						maxWidth: isDesktop ? 'none' : '600px',
						paddingX: isDesktop ? 4 : 2,
					}}
				>
					{isDesktop && (
						<Typography color='#E20435' fontWeight='bold' fontSize={24} sx={{ mb: 3 }}>
							Your Favorites
						</Typography>
					)}

					<Box
						sx={{
							flexGrow: 1,
							overflowY: 'auto',
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
							<CircularProgress color={isDesktop ? 'primary' : 'secondary'} sx={{ mt: 4 }} />
						) : error ? (
							<Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
								<Typography color={isDesktop ? 'error' : 'white'} sx={{ mb: 2, textAlign: 'center' }}>
									{error}
								</Typography>
								{!user && (
									<Button variant='contained' color='primary' onClick={handleLogin}>
										Iniciar Sesión
									</Button>
								)}
							</Box>
						) : favorites.length === 0 ? (
							<Typography color={isDesktop ? 'text.primary' : 'white'} sx={{ mt: 4, textAlign: 'center' }}>
								{isDesktop ? 'You have no favorite sellers saved.' : 'No tienes vendedores favoritos guardados.'}
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
										marginBottom: isDesktop ? 2 : 1,
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
										variant={isDesktop ? 'light' : 'dark'}
									/>
								</Box>
							))
						)}
					</Box>
				</Box>
			</Box>

			{!isDesktop && (
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
			)}
		</Box>
	);
};

export default Favorites;
