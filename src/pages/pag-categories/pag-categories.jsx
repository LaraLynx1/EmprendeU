import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CardSellers from '../../components/CardSellers/CardSellers.jsx';
import WhiteLogo from '../../resources/logo icesi white.png';
import Category from '../../components/Category/Category.jsx';
import BannerProfile from '../../components/BannerProfile/BannerProfile.jsx';
import Navbar from '../../components/navbar/navbar.jsx';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase.js';

const Categories = () => {
	const [sellers, setSellers] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	// Función para obtener los vendedores desde Firebase
	useEffect(() => {
		const fetchSellers = async () => {
			try {
				// Get all users
				const usersCollection = collection(db, 'users');
				const usersSnapshot = await getDocs(usersCollection);

				// Filter users to only include those with a product containing "Galletas" in description
				const sellersList = usersSnapshot.docs
					.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}))
					.filter((user) => {
						// Check if user has products array and at least one product with description "Galletas"
						return (
							user.productos &&
							Array.isArray(user.productos) &&
							user.productos.some((product) => product.descripcion && product.descripcion.includes('Galletas'))
						);
					});

				console.log('Vendedores con productos de Galletas:', sellersList);
				setSellers(sellersList);
				setLoading(false);
			} catch (error) {
				console.error('Error al obtener los vendedores:', error);
				setLoading(false);
			}
		};

		fetchSellers();
	}, []);

	// Función para actualizar el estado de favorito en Firebase
	const toggleFavorite = async (id) => {
		try {
			// Primero actualizamos el estado local para una respuesta inmediata en la UI
			const updated = sellers.map((seller) =>
				seller.id === id ? { ...seller, isFavorite: !seller.isFavorite } : seller
			);
			setSellers(updated);

			// Luego actualizamos en Firebase
			const sellerToUpdate = sellers.find((seller) => seller.id === id);
			const sellerRef = doc(db, 'users', id);
			await updateDoc(sellerRef, {
				isFavorite: !sellerToUpdate.isFavorite,
			});
		} catch (error) {
			console.error('Error al actualizar el favorito:', error);
			// Si hay un error, revertimos el cambio local
			setSellers(sellers);
		}
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
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Box sx={{ flexShrink: 0 }}>
					<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 3 }}>
						<img src={WhiteLogo} alt='Logo' style={{ width: 120 }} />
					</Box>
					<Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
						<BannerProfile variant='light' />
					</Box>
					<Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
						<Category />
					</Box>
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
						<Box sx={{ color: 'white', mt: 2 }}>Cargando vendedores...</Box>
					) : sellers.length === 0 ? (
						<Box sx={{ color: 'white', mt: 2 }}>No se encontraron vendedores con productos de Galletas</Box>
					) : (
						sellers.map((item) => (
							<Box
								key={item.id}
								component='button'
								onClick={() => navigate('/seller-profile', { state: { sellerId: item.id } })}
								sx={{
									all: 'unset',
									width: '100%',
									cursor: 'pointer',
									marginBottom: -0.5,
								}}
							>
								<CardSellers
									img={item.img}
									isActive={item.isActive}
									isFavorite={item.isFavorite}
									name={item.name}
									starProduct={item.starProduct}
									onToggleFavorite={(e) => {
										e.stopPropagation(); // Prevent navigation when clicking the favorite button
										toggleFavorite(item.id);
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

export default Categories;
