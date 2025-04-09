import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WhiteLogo from '../../recursos/logo icesi white.png';
import BannerProfile from '../../components/BannerProfile/BannerProfile.jsx';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import bannerGame from '../../recursos/Game.png';
import CategoriesList from '../../components/CategoriesList/CategoriesList.jsx';
import Navbar from '../../components/navbar/navbar';

const Dashboard = () => {
	const navigate = useNavigate();

	return (
		<Box
			sx={{
				paddingY: 2,
				width: '100%',
				height: '100vh',
				backgroundColor: '#10263C',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				overflow: 'hidden',
			}}
		>
			<Box
				sx={{
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
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
							cursor: 'pointer',
						}}
						onClick={() => navigate('/juego')}
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

				<Box
					sx={{
						maxWidth: '100%',
						overflowX: 'auto',
						whiteSpace: 'nowrap',
						paddingX: 2,
						scrollbarWidth: 'none',
						'&::-webkit-scrollbar': {
							display: 'none',
						},
						cursor: 'pointer',
					}}
					onClick={() => navigate('/categorias')}
				>
					<CategoriesList />
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

export default Dashboard;
