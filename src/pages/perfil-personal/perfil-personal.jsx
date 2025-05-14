import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../services/firebase';
import { logout } from '../../utils/auth';
import Navbar from '../../components/navbar/navbar';
import logo from '../../resources/logo icesi blue.png';
import avatar from '../../resources/avatar.png';
import storeIcon from '../../resources/store.png';
import settingsIcon from '../../resources/settings.png';
import starIcon from '../../resources/star black.png';
import helpIcon from '../../resources/help.png';
import couponIcon from '../../resources/coupon.png';
import logoutIcon from '../../resources/logout.png';
import ProfileBoxB from '../../components/ProfileBoxB/ProfileBoxB';

import './perfil-personal.css';

const PersonalProfile = () => {
	const navigate = useNavigate();
	const [userType, setUserType] = useState(null); // Estado para almacenar el tipo de usuario

	useEffect(() => {
		const fetchUserType = async () => {
			try {
				const userId = auth.currentUser?.uid; // Obtener el UID del usuario autenticado
				if (!userId) return;

				const docRef = doc(db, 'users', userId); // Referencia al documento del usuario en Firestore
				const docSnap = await getDoc(docRef);

				if (docSnap.exists()) {
					setUserType(docSnap.data().userType); // Guardar el tipo de usuario en el estado
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
		<div className='profile-container'>
			<img src={logo} alt='Logo' className='logo' />

			<ProfileBoxB avatar={avatar} name='Ana Gomez' id='A0072214' logo={logo} />

			{/* Mostrar el botón solo si el usuario es de tipo "seller" */}
			{userType === 'seller' && (
				<button className='store-btn' onClick={() => navigate('/myStore')}>
					<img src={storeIcon} alt='Store' />
					My store
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

			<Navbar />
		</div>
	);
};

export default PersonalProfile;
