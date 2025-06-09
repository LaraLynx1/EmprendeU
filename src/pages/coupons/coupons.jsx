import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery, useTheme, IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc } from 'firebase/firestore';
import { db, auth } from '../../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

import Navbar from '../../components/navbar/navbar.jsx';
import Coupon from '../../components/cupon/cupon.jsx';
import BannerProfile from '../../components/BannerProfile/BannerProfile.jsx';
import Sidebar from '../../components/SideBar/Sidebar.jsx';
import CouponModal from '../../components/couponModal/couponModal.jsx';

import BlueLogo from '../../resources/logo icesi blue.png';
import avatar from '../../resources/avatar 1.png';
import arrowback from '../../resources/arrowback.png';

import './coupons.css';

const Coupons = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [coupons, setCoupons] = useState([]);
	const [selectedCoupon, setSelectedCoupon] = useState(null);
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();

	const handleBackClick = () => {
		navigate('/perfil-personal');
	};

	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

	useEffect(() => {
		const fetchUserCoupons = async () => {
			setLoading(true);

			onAuthStateChanged(auth, async (user) => {
				if (user) {
					try {
						const userRef = doc(db, 'users', user.uid);
						const couponsRef = collection(userRef, 'coupons');
						const snapshot = await getDocs(couponsRef);
						const couponsData = snapshot.docs.map((doc) => ({
							id: doc.id,
							...doc.data(),
						}));
						setCoupons(couponsData);
					} catch (error) {
						console.error('Error fetching user coupons:', error);
					} finally {
						setLoading(false);
					}
				} else {
					console.warn('No user signed in');
					setCoupons([]);
					setLoading(false);
				}
			});
		};

		fetchUserCoupons();
	}, []);

	const handleCouponClick = (coupon) => {
		setSelectedCoupon(coupon);
	};

	const closeModal = () => {
		setSelectedCoupon(null);
	};

	return (
		<Box className='coupons-wrapper'>
			{isDesktop && (
				<Box className='coupons-header'>
					<Box className='coupons-header-left'>
						<IconButton onClick={() => setSidebarOpen(true)} className='menu-btn'>
							<Menu />
						</IconButton>
						<img src={BlueLogo} alt='Logo' className='coupons-logo' />
					</Box>
				</Box>
			)}

			{isDesktop && <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />}

			{isDesktop ? (
				<Box className='desktop-main-layout'>
					<Box className='desktop-banner-container'>
						<img src={arrowback} alt='Back' className='header-icon' onClick={handleBackClick} />
						<BannerProfile variant='large' />
					</Box>

					<Box className='desktop-coupons-section'>
						<h2 className='coupons-title'>My Coupons</h2>

						{loading ? (
							<Box className='coupons-loading' />
						) : (
							<div className='coupons-container'>
								{coupons.map((coupon) => (
									<div key={coupon.id} onClick={() => handleCouponClick(coupon)}>
										<Coupon titulo={coupon.product} autor={`${coupon.discount}% off - ${coupon.vendor}`} />
									</div>
								))}
							</div>
						)}
					</Box>
				</Box>
			) : (
				<Box className='mobile-content'>
					<Box className='mobile-logo-box'>
						<img src={BlueLogo} alt='Logo' className='mobile-logo' />
					</Box>
					<Box className='mobile-profile-box'>
						<BannerProfile avatar={avatar} variant='dark' sx={{ width: '95%' }} />
					</Box>

					<Box className='coupons-section'>
						<img src={arrowback} alt='Back' className='header-icon' onClick={handleBackClick} />

						<h2 className='coupons-title'>Mis cupones</h2>

						{loading ? (
							<Box className='coupons-loading' />
						) : (
							<div className='coupons-container'>
								{coupons.map((coupon) => (
									<div key={coupon.id} onClick={() => handleCouponClick(coupon)}>
										<Coupon titulo={coupon.product} autor={`${coupon.discount}% off - ${coupon.vendor}`} />
									</div>
								))}
							</div>
						)}
					</Box>
				</Box>
			)}

			<CouponModal
				isOpen={!!selectedCoupon}
				onClose={closeModal}
				titulo={selectedCoupon?.product}
				autor={`${selectedCoupon?.discount}% off - ${selectedCoupon?.vendor}`}
				codigo={selectedCoupon?.code}
			/>

			{!isDesktop && (
				<Box className='navbar-mobile'>
					<Navbar />
				</Box>
			)}
		</Box>
	);
};

export default Coupons;
