import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import logo from '../../resources/logo icesi blue.png';
import avatar from '../../resources/avatar.png';
import sellerProfile from '../../utils/dataproductos';
import Coupon from '../../components/cupon/cupon';
import ProfileBoxB from '../../components/ProfileBoxB/ProfileBoxB';
import CouponModal from '../../components/couponModal/couponModal';

import './coupons.css';

const Coupons = () => {
	const coupons = sellerProfile.cupones;

	const [selectedCoupon, setSelectedCoupon] = useState(null);

	const handleCouponClick = (coupon) => {
		setSelectedCoupon(coupon);
	};

	const closeModal = () => {
		setSelectedCoupon(null);
	};

	return (
		<div className='profile-container'>
			<img src={logo} alt='Logo' className='logo' />
			<ProfileBoxB avatar={avatar} name='Ana Gomez' id='A0072214' logo={logo} />
			<h2 className='coupons-title'>My Coupons</h2>

			<div className='coupons-container'>
				{coupons.map((coupon) => (
					<div key={coupon.id} onClick={() => handleCouponClick(coupon)}>
						<Coupon titulo={coupon.titulo} autor={coupon.autor} />
					</div>
				))}
			</div>

			<CouponModal
				isOpen={!!selectedCoupon}
				onClose={closeModal}
				titulo={selectedCoupon?.titulo}
				autor={selectedCoupon?.autor}
				codigo={selectedCoupon?.codigo}
			/>

			<Navbar />
		</div>
	);
};

export default Coupons;
