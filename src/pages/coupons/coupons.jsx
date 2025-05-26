import React, { useState, useEffect } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { Menu } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Navbar from '../../components/navbar/navbar';
import BlueLogo from '../../resources/logo icesi blue.png';
import avatar from '../../resources/avatar.png';
import Coupon from '../../components/cupon/cupon';
import ProfileBoxB from '../../components/ProfileBoxB/ProfileBoxB';
import Sidebar from '../../components/SideBar/Sidebar.jsx';
import CouponModal from '../../components/couponModal/couponModal';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';

import './coupons.css';

const Coupons = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [coupons, setCoupons] = useState([]);
	const [selectedCoupon, setSelectedCoupon] = useState(null);
	const [loading, setLoading] = useState(true);

	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

	useEffect(() => {
		const fetchCoupons = async () => {
			try {
				const couponsRef = collection(db, 'coupons');
				const querySnapshot = await getDocs(couponsRef);
				const couponsData = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setCoupons(couponsData);
			} catch (error) {
				console.error('Error fetching coupons:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchCoupons();
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
									<Coupon titulo={coupon.titulo} autor={coupon.autor} />
								</div>
							))}
						</div>
					)}
				</Box>
			</Box>

			<CouponModal
				isOpen={!!selectedCoupon}
				onClose={closeModal}
				titulo={selectedCoupon?.titulo}
				autor={selectedCoupon?.autor}
				codigo={selectedCoupon?.codigo}
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
