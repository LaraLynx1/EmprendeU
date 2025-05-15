import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery, useTheme, IconButton, Box } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../services/firebase';
import { logout } from '../../utils/auth';
import Navbar from '../../components/navbar/navbar';
import BlueLogo from '../../resources/logo icesi blue.png';
import avatar from '../../resources/avatar.png';
import storeIcon from '../../resources/store.png';
import settingsIcon from '../../resources/settings.png';
import starIcon from '../../resources/star black.png';
import helpIcon from '../../resources/help.png';
import couponIcon from '../../resources/coupon.png';
import logoutIcon from '../../resources/logout.png';
import ProfileBoxB from '../../components/ProfileBoxB/ProfileBoxB';
import Sidebar from '../../components/SideBar/Sidebar.jsx';
import './perfil-personal.css';

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
			await logout();
			alert('You have been logged out successfully.');
			navigate('/signin');
		} catch (error) {
			console.error('Error logging out:', error);
			alert('Failed to log out. Please try again.');
		}
	};

	return (
		<Box
			sx={{
				width: '100%',
				minHeight: '100vh',
				backgroundColor: '#FDFBF7',
				display: 'flex',
				flexDirection: 'column',
				overflowX: 'hidden',
				paddingBottom: isDesktop ? 2 : '80px',
			}}
		>
			{isDesktop && (
				<Box sx={{ width: '100%', px: 4, py: 2 }}>
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
							<IconButton onClick={() => setSidebarOpen(true)} sx={{ color: '#10263C' }}>
								<Menu />
							</IconButton>
							<img src={BlueLogo} alt='Logo' style={{ width: 130 }} />
						</Box>
					</Box>
				</Box>
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
						paddingRight: '20px',
						marginTop: '40px',
					}),
				}}
			>
				{!isDesktop && (
					<>
						<img src={BlueLogo} alt='Logo' className='logo' />
						<ProfileBoxB avatar={avatar} name='Ana Gomez' id='A0072214' logo={BlueLogo} />
					</>
				)}

				<Box
					sx={{
						width: isDesktop ? '100%' : '100%',
						maxWidth: isDesktop ? '800px' : 'none',
						display: 'flex',
						flexDirection: 'column',
						alignItems: isDesktop ? 'flex-end' : 'center',
						padding: isDesktop ? 0 : '20px',
					}}
				>
					{userType === 'seller' && (
						<button className='store-btn' onClick={() => navigate('/myStore')}>
							<img src={storeIcon} alt='Store' />
							<span>My store</span>
						</button>
					)}

					<div className='options'>
						<div className='option'>
							<img src={settingsIcon} alt='Settings' />
							<span>Settings</span>
						</div>
						<div className='option' onClick={() => navigate('/favorites')}>
							<img src={starIcon} alt='Favorites' />
							<span>Favorites</span>
						</div>
						<div className='option'>
							<img src={helpIcon} alt='Help' />
							<span>Help</span>
						</div>
						<div className='option' onClick={() => navigate('/coupons')}>
							<img src={couponIcon} alt='Coupons' />
							<span>My coupons</span>
						</div>
						<div className='option' onClick={handleLogout}>
							<img src={logoutIcon} alt='Logout' />
							<span className='logout'>Log out</span>
						</div>
					</div>
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

export default PersonalProfile;
