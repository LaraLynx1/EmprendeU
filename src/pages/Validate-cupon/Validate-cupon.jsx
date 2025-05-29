import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery, useTheme, IconButton, Box } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../services/firebase';
import { logout } from '../../utils/auth';
import Navbar from '../../components/navbar/navbar';
import Sidebar from '../../components/SideBar/Sidebar.jsx';
import ProfileBoxB from '../../components/ProfileBoxB/ProfileBoxB';
import BlueLogo from '../../resources/logo icesi blue.png';
import avatar from '../../resources/avatar.png';
import storeIcon from '../../resources/store.png';
import settingsIcon from '../../resources/settings.png';
import starIcon from '../../resources/Star black.png';
import helpIcon from '../../resources/help.png';
import couponIcon from '../../resources/coupon.png';
import logoutIcon from '../../resources/logout.png';
import validate from '../../resources/validate.png';
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

	return <></>;
};

export default PersonalProfile;
