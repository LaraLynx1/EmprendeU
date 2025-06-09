import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery, useTheme, IconButton, Box } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Asegúrate de importar updateDoc
import { db, auth } from '../../services/firebase.js';
import { logout } from '../../utils/auth.js';

import Navbar from '../../components/navbar/navbar.jsx';
import Sidebar from '../../components/SideBar/Sidebar.jsx';
import ProfileBoxB from '../../components/ProfileBoxB/ProfileBoxB.jsx';

import BlueLogo from '../../resources/logo icesi blue.png';
import avatar from '../../resources/avatar.png';
import storeIcon from '../../resources/store.png';
import settingsIcon from '../../resources/settings.png';
import starIcon from '../../resources/Star black.png';
import helpIcon from '../../resources/help.png';
import couponIcon from '../../resources/coupon.png';
import logoutIcon from '../../resources/logout.png';
import validate from '../../resources/validate.png';

import './PersonalProfile.css';

const PersonalProfile = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [userType, setUserType] = useState(null);
	const navigate = useNavigate();
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

	useEffect(() => {
		const fetchUserType = async () => {
			try {
				const userId = auth.currentUser?.uid;
				if (!userId) return;

				const docRef = doc(db, 'users', userId);
				const docSnap = await getDoc(docRef);

				if (docSnap.exists()) {
					setUserType(docSnap.data().userType);
				}
			} catch (error) {
				console.error('Error fetching user type:', error);
			}
		};

		fetchUserType();
	}, []);

	const handleLogout = async () => {
		try {
			const userId = auth.currentUser?.uid;
			if (userId) {
				// Marca el usuario como inactivo en Firestore
				await updateDoc(doc(db, 'users', userId), { isActive: false });
			}
			await logout();
			alert('You have been logged out successfully.');
			navigate('/signin');
		} catch (error) {
			console.error('Error logging out:', error);
			alert('Failed to log out. Please try again.');
		}
	};

	return (
		<Box className={`profile-container ${isDesktop ? 'desktop' : ''}`}>
			{isDesktop && (
				<Box className='desktop-header1'>
					<Box className='logo-container1'>
						<IconButton className='menu-button' onClick={() => setSidebarOpen(true)}>
							<Menu />
						</IconButton>
						<img src={BlueLogo} alt='Logo' className='logo-desktop' />
					</Box>
				</Box>
			)}

			{isDesktop && <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />}

			<Box className={`main-content ${isDesktop ? 'desktop' : 'mobile'}`}>
				{!isDesktop && (
					<>
						<img src={BlueLogo} alt='Logo' className='logo-mobile' />
						<ProfileBoxB avatar={avatar} name='Ana Gomez' id='A0072214' logo={BlueLogo} />
					</>
				)}

				<Box className='content-wrapper'>
					{userType === 'seller' && (
						<button className='store-btn' onClick={() => navigate('/myStore')}>
							<img src={storeIcon} alt='Store' />
							<span>Mi tienda</span>
						</button>
					)}

					<div className='options'>
						<div className='option'>
							<img src={settingsIcon} alt='Settings' />
							<span>Ajustes</span>
						</div>
						<div className='option' onClick={() => navigate('/favorites')}>
							<img src={starIcon} alt='Favorites' />
							<span>Favoritos</span>
						</div>
						<div className='option'>
							<img src={helpIcon} alt='Help' />
							<span>Ayuda</span>
						</div>
						<div className='option' onClick={() => navigate('/coupons')}>
							<img src={couponIcon} alt='Coupons' />
							<span>Mis cupones</span>
						</div>
						{userType === 'seller' && (
							<div className='option' onClick={() => navigate('/ValidateCupon')}>
								<img src={validate} alt='Coupons' />
								<span>Validar cupon</span>
							</div>
						)}
						<div className='option' onClick={handleLogout}>
							<img src={logoutIcon} alt='Logout' />
							<span className='logout'>Log out</span>
						</div>
					</div>
				</Box>
			</Box>

			{!isDesktop && (
				<Box className='mobile-navbar'>
					<Navbar />
				</Box>
			)}
		</Box>
	);
};

export default PersonalProfile;
