import { Box, useMediaQuery, useTheme, Avatar, IconButton, Container } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CardSellers from '../../components/CardSellers/CardSellers';
import WhiteLogo from '../../resources/logo icesi white.png';
import BlueLogo from '../../resources/logo icesi blue.png';
import Category from '../../components/Category/Category';
import BannerProfile from '../../components/BannerProfile/BannerProfile';
import Navbar from '../../components/navbar/navbar';
import { Menu } from '@mui/icons-material';
import avatarImage from '../../resources/avatar.png';
import Sidebar from '../../components/SideBar/Sidebar';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

const Categories = () => {
	const [sellers, setSellers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const navigate = useNavigate();
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

	const handleCategoryChange = (category) => {
		console.log('Categoría cambiada a:', category.title);
		setSelectedCategory(category);
	};

	useEffect(() => {
		const fetchSellers = async () => {
			if (!selectedCategory) {
				console.log('No hay categoría seleccionada todavía');
				return;
			}

			try {
				console.log('Iniciando búsqueda de vendedores para categoría:', selectedCategory.title);
				setLoading(true);

				const usersCollection = collection(db, 'users');
				const usersSnapshot = await getDocs(usersCollection);

				let sellersList = usersSnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));

				console.log(`Encontrados ${sellersList.length} usuarios totales en la base de datos`);

				sellersList = sellersList.filter((user) => {
					if (!user.productos || !Array.isArray(user.productos)) {
						console.log(`Usuario ${user.name || user.id} no tiene productos o no es un array`);
						return false;
					}

					const hasMatchingProduct = user.productos.some((product) => {
						if (!product.descripcion) {
							console.log(`Producto sin descripción para usuario ${user.name || user.id}`);
							return false;
						}

						const descripcion = product.descripcion.toLowerCase();
						const category = selectedCategory.title.toLowerCase();

						const match = descripcion.includes(category);
						if (match) {
							console.log(
								`Match encontrado para usuario ${user.name || user.id}: "${product.descripcion}" contiene "${category}"`
							);
						}
						return match;
					});

					if (!hasMatchingProduct) {
						console.log(
							`Usuario ${user.name || user.id} no tiene productos que coincidan con la categoría "${
								selectedCategory.title
							}"`
						);
					}

					return hasMatchingProduct;
				});

				console.log(`Encontrados ${sellersList.length} vendedores para categoría "${selectedCategory.title}"`);
				setSellers(sellersList);
				setLoading(false);
			} catch (error) {
				console.error('Error al obtener los vendedores:', error);
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

			const sellerToUpdate = sellers.find((seller) => seller.id === id);
			const sellerRef = doc(db, 'users', id);
			await updateDoc(sellerRef, {
				isFavorite: !sellerToUpdate.isFavorite,
			});
			console.log(`Estado de favorito actualizado con éxito para vendedor con ID: ${id}`);
		} catch (error) {
			console.error('Error al actualizar el favorito:', error);
			setSellers(sellers);
		}
	};

	return (
		<Box
			sx={{
				width: '100%',
				minHeight: '100vh',
				backgroundColor: '#10263C',
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
						<IconButton onClick={() => setSidebarOpen(true)} sx={{ color: 'white' }}>
							<Menu />
						</IconButton>

						<img src={WhiteLogo} alt='Logo' style={{ width: 130 }} />

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

						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								mb: 2,
								width: '90%',
							}}
						>
							<BannerProfile variant='dark' />
						</Box>

						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								mb: 2,
								width: '90%',
							}}
						>
							<Category onCategoryChange={handleCategoryChange} />
						</Box>
					</>
				)}

				<Box
					sx={{
						width: isDesktop ? 'calc(100% - 300px)' : '100%',
						maxWidth: isDesktop ? '700px' : 'none',
						marginTop: isDesktop ? '20px' : '0',
					}}
				>
					<Box
						sx={{
							width: '100%',
							maxHeight: isDesktop ? 'calc(100vh - 120px)' : 'calc(100vh - 280px)',
							overflowY: 'auto',
							paddingX: isDesktop ? 1 : 2,
							paddingBottom: 2,
							scrollbarWidth: 'none',
							'&::-webkit-scrollbar': { display: 'none' },
							display: 'flex',
							flexDirection: 'column',
							alignItems: isDesktop ? 'flex-end' : 'center',
							gap: '16px',
						}}
					>
						{loading ? (
							<Box sx={{ color: 'white', mt: 2 }}>Cargando vendedores...</Box>
						) : sellers.length === 0 ? (
							<Box sx={{ color: 'white', mt: 2 }}>
								{selectedCategory !== 'Todos'
									? `No se encontraron vendedores para la categoría ${selectedCategory?.title || ''}`
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
										width: isDesktop ? '100%' : '100%',
										maxWidth: '100%',
										cursor: 'pointer',
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

export default Categories;
