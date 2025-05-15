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
	const [selectedCategory, setSelectedCategory] = useState(null);
	const navigate = useNavigate();

	const handleCategoryChange = (category) => {
		console.log("Categoría cambiada a:", category.title);
		setSelectedCategory(category);
	};

	useEffect(() => {
		const fetchSellers = async () => {
			if (!selectedCategory) {
				console.log("No hay categoría seleccionada todavía");
				return;
			}

			try {
				console.log("Iniciando búsqueda de vendedores para categoría:", selectedCategory.title);
				setLoading(true);

				const usersCollection = collection(db, 'users');
				const usersSnapshot = await getDocs(usersCollection);

				let sellersList = usersSnapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data()
				}));

				console.log(`Encontrados ${sellersList.length} usuarios totales en la base de datos`);

				sellersList = sellersList.filter(user => {
					if (!user.productos || !Array.isArray(user.productos)) {
						console.log(`Usuario ${user.name || user.id} no tiene productos o no es un array`);
						return false;
					}

					const hasMatchingProduct = user.productos.some(product => {
						if (!product.descripcion) {
							console.log(`Producto sin descripción para usuario ${user.name || user.id}`);
							return false;
						}

						const descripcion = product.descripcion.toLowerCase();
						const category = selectedCategory.title.toLowerCase();

						const match = descripcion.includes(category);
						if (match) {
							console.log(`Match encontrado para usuario ${user.name || user.id}: "${product.descripcion}" contiene "${category}"`);
						}
						return match;
					});

					if (!hasMatchingProduct) {
						console.log(`Usuario ${user.name || user.id} no tiene productos que coincidan con la categoría "${selectedCategory.title}"`);
					}

					return hasMatchingProduct;
				});

				console.log(`Encontrados ${sellersList.length} vendedores para categoría "${selectedCategory.title}"`);
				setSellers(sellersList);
				setLoading(false);
			} catch (error) {
				console.error("Error al obtener los vendedores:", error);
				setLoading(false);
			}
		};

		fetchSellers();
	}, [selectedCategory]);

	const toggleFavorite = async (id) => {
		try {
			console.log(`Cambiando estado de favorito para vendedor con ID: ${id}`);
			const updated = sellers.map((seller) =>
				seller.id === id ? { ...seller, isFavorite: !seller.isFavorite } : seller
			);
			setSellers(updated);

			const sellerToUpdate = sellers.find(seller => seller.id === id);
			const sellerRef = doc(db, 'users', id);
			await updateDoc(sellerRef, {
				isFavorite: !sellerToUpdate.isFavorite
			});
			console.log(`Estado de favorito actualizado con éxito para vendedor con ID: ${id}`);
		} catch (error) {
			console.error("Error al actualizar el favorito:", error);
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
						<Category onCategoryChange={handleCategoryChange} />
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
						<Box sx={{ color: 'white', mt: 2 }}>
							{selectedCategory !== "Todos"
								? `No se encontraron vendedores para la categoría ${selectedCategory}`
								: 'No se encontraron vendedores'}
						</Box>
					) : (
						sellers.map((item) => (
							<Box
								key={item.id}
								component='button'
								onClick={() => {
									console.log(`Navegando al perfil del vendedor: ${item.name || item.id}`);
									navigate('/seller-profile', { state: { sellerId: item.id } });
								}}
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
										e.stopPropagation();
										console.log(`Clic en botón de favorito para: ${item.name || item.id}`);
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
