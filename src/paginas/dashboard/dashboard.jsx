import { Box } from '@mui/material';
import WhiteLogo from '../../recursos/logo icesi white.png';
import BannerProfile from '../../components/BannerProfile/BannerProfile.jsx';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import bannerGame from '../../recursos/Game.png';
import CategoriesList from '../../components/CategoriesList/CategoriesList.jsx';

const Dashboard = () => {
	return (
		<Box
			sx={{
				paddingY: 2,
				width: '100%',
				height: '100vh',
				backgroundColor: '#10263C',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center', // Centra todo verticalmente
				overflow: 'hidden',
			}}
		>
			<Box
				sx={{
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center', // Centra todo horizontalmente
					justifyContent: 'center', // Centra todo verticalmente dentro de la columna
				}}
			>
				{/* Sección fija */}
				<Box sx={{ flexShrink: 0 }}>
					<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 3 }}>
						<img src={WhiteLogo} alt='Logo' style={{ width: 120 }} />
					</Box>

					<Box sx={{ display: 'flex', justifyContent: 'center', mb: 0.5 }}>
						<BannerProfile variant='light' />
					</Box>

					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<SearchBar />
					</Box>

					<Box
						sx={{
							width: 385,
							height: 190,
							overflow: 'hidden',
							mb: 3,
						}}
					>
						<img
							src={bannerGame}
							alt='Banner Game'
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'cover',
							}}
						/>
					</Box>
				</Box>

				{/* Sección de categorías */}
				<Box
					sx={{
						maxWidth: 380,
						maxHeight: 'calc(100vh - 200px)',
						overflowY: 'auto',
						paddingX: 2,
						paddingBottom: 2,
						scrollbarWidth: 'none',
						'&::-webkit-scrollbar': {
							display: 'none',
						},
					}}
				>
					<CategoriesList />
				</Box>
			</Box>
		</Box>
	);
};

export default Dashboard;
