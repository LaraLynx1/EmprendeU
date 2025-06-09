import React, { useState } from 'react';
import { Box, useMediaQuery, Container, IconButton } from '@mui/material';
import { useTheme } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { Menu } from '@mui/icons-material';

import WhiteLogo from '../../resources/logo icesi white.png';
import bannerGame from '../../resources/Game.png';
import bannerGame2 from '../../resources/Game2.png';

import BannerProfile from '../../components/BannerProfile/BannerProfile.jsx';
import CategoriesList from '../../components/CategoriesList/CategoriesList.jsx';
import Navbar from '../../components/navbar/navbar';
import Sidebar from '../../components/SideBar/Sidebar.jsx';

import './dashboard.css';

const Dashboard = () => {
	const navigate = useNavigate();
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<Box className='dashboard-container'>
			{isDesktop && (
				<Container className='desktop-header-container'>
					<Box className='desktop-header'>
						<IconButton className='menu-button' onClick={() => setSidebarOpen(true)}>
							<Menu sx={{ color: 'white' }} />
						</IconButton>

						<img src={WhiteLogo} alt='Logo' className='desktop-logo' />

						<Box className='header-spacer' />
					</Box>
				</Container>
			)}

			{isDesktop && <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />}

			{!isDesktop && (
				<Box className='mobile-header'>
					<img src={WhiteLogo} alt='Logo' className='mobile-logo' />
					<Box className='mobile-banner-container'>
						<BannerProfile variant='light' onClick={() => navigate('/perfil-personal')} />
					</Box>
				</Box>
			)}

			<Box className={isDesktop ? 'main-content-desktop' : 'main-content-mobile'}>
				{isDesktop && (
					<Box className='left-side-wrapper'>
						<BannerProfile variant='large' onClick={() => navigate('/perfil-personal')} />
					</Box>
				)}

				<Box className={isDesktop ? 'right-side-wrapper' : ''}>
					<Box className={isDesktop ? 'right-side-content' : ''}>
						{isDesktop ? (
							<Box className='right-banner-wrapper'>
								<Box className='game-banner2' onClick={() => navigate('/game')}>
									<img src={bannerGame2} alt='Banner Game' className='banner-image' />
								</Box>
							</Box>
						) : (
							<Box className='game-banner' onClick={() => navigate('/game')}>
								<img src={bannerGame} alt='Banner Game' className='banner-image' />
							</Box>
						)}

						<Box className='categories-container'>
							<CategoriesList className='categories-grid' />
						</Box>
					</Box>
				</Box>
			</Box>

			{!isDesktop && (
				<Box className='mobile-navbar-container'>
					<Navbar />
				</Box>
			)}
		</Box>
	);
};

export default Dashboard;
