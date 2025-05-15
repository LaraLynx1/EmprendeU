import React, { useState } from 'react';
import { useMediaQuery, useTheme, IconButton, Avatar, Box } from '@mui/material';
import { Menu } from '@mui/icons-material';
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

	// Fetch coupons from Firebase
	React.useEffect(() => {
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
		<Box
			sx={{
				width: '100%',
				minHeight: '100vh',
				backgroundColor: isDesktop ? '#FDFBF7' : '#FDFBF7',
				display: 'flex',
				flexDirection: 'column',
				overflowX: 'hidden',
				paddingBottom: isDesktop ? 2 : '80px',
			}}
		>
			{/* Desktop Header */}
			{isDesktop && (
				<Box
					sx={{
						width: '100%',
						px: 4,
						py: 2,
					}}
				>
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

						<Avatar
							src={avatar}
							alt='Avatar'
							sx={{
								width: 64,
								height: 64,
								cursor: 'pointer',
								border: '2px solid white',
							}}
						/>
					</Box>
				</Box>
			)}

			{/* Sidebar for Desktop */}
			{isDesktop && <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />}

			{/* Main Content */}
			<Box
				sx={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: isDesktop ? 'row' : 'column',
					...(isDesktop && {
						paddingLeft: '280px',
						justifyContent: 'flex-end',
					}),
				}}
			>
				{/* Mobile Version */}
				{!isDesktop && (
					<>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								my: 3,
							}}
						>
							<img src={BlueLogo} alt='Logo' style={{ width: 120 }} />
						</Box>

						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								mb: 2,
								width: '100%',
							}}
						>
							<ProfileBoxB avatar={avatar} name='Ana Gomez' id='A0072214' />
						</Box>
					</>
				)}

				{/* Coupons Container */}
				<Box
					sx={{
						width: isDesktop ? '65%' : '100%',
						maxWidth: isDesktop ? '700px' : 'none',
						marginRight: isDesktop ? '40px' : '0',
						marginTop: isDesktop ? '20px' : '0',
						padding: isDesktop ? '0 20px' : '20px',
					}}
				>
					<h2
						className='coupons-title'
						style={{
							textAlign: isDesktop ? 'left' : 'center',
							marginLeft: isDesktop ? '0' : 'auto',
							marginRight: isDesktop ? '0' : 'auto',
							color: isDesktop ? '#10263C' : '#10263C',
						}}
					>
						My Coupons
					</h2>

					{loading ? (
						<Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
							<CircularProgress />
						</Box>
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

			{/* Coupon Modal */}
			<CouponModal
				isOpen={!!selectedCoupon}
				onClose={closeModal}
				titulo={selectedCoupon?.titulo}
				autor={selectedCoupon?.autor}
				codigo={selectedCoupon?.codigo}
			/>

			{/* Mobile Navbar */}
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

export default Coupons;
