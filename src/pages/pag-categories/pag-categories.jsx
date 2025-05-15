import { Box } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardSellers from '../../components/CardSellers/CardSellers.jsx';
import WhiteLogo from '../../resources/logo icesi white.png';
import Category from '../../components/Category/Category.jsx';
import BannerProfile from '../../components/BannerProfile/BannerProfile.jsx';
import Navbar from '../../components/navbar/navbar.jsx';

const Categories = () => {
	const [sellers, setSellers] = useState(initialData);
	const navigate = useNavigate();

	const toggleFavorite = (id) => {
		const updated = sellers.map((seller) =>
			seller.id === id ? { ...seller, isFavorite: !seller.isFavorite } : seller
		);
		setSellers(updated);
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
					{sellers.map((item) => (
						<Box
							key={item.id}
							component='button'
							onClick={() => navigate('/seller-profile')}
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
								onToggleFavorite={() => toggleFavorite(item.id)}
							/>
						</Box>
					))}
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
