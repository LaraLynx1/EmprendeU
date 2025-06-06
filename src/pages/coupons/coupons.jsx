import React, { useState, useEffect } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { Menu } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Navbar from '../../components/navbar/navbar';
import BlueLogo from '../../resources/logo icesi blue.png';
import avatar from '../../resources/avatar1.png';
import Coupon from '../../components/cupon/cupon';
import ProfileBoxB from '../../components/ProfileBoxB/ProfileBoxB';
import Sidebar from '../../components/SideBar/Sidebar.jsx';
import CouponModal from '../../components/couponModal/couponModal';
import { collection, getDocs, doc } from 'firebase/firestore';
import { db, auth } from '../../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

import './coupons.css';

const Coupons = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [coupons, setCoupons] = useState([]);
	const [selectedCoupon, setSelectedCoupon] = useState(null);
	const [loading, setLoading] = useState(true);

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
					<Avatar src={avatar} alt='Avatar' className='avatar' />
				</Box>
			)}

			{isDesktop && <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />}

			<Box className={`coupons-content ${isDesktop ? 'desktop-layout' : ''}`}>
				{!isDesktop && (
					<>
						<Box className='mobile-logo-box'>
							<img src={BlueLogo} alt='Logo' className='mobile-logo' />
						</Box>
						<Box className='mobile-profile-box'>
							<ProfileBoxB avatar={avatar} name='Ana Gomez' id='A0072214' />
						</Box>
					</>
				)}

				<Box className='coupons-section'>
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
