import React from 'react';
import Navbar from '../../components/navbar/navbar';
import logo from '../../resources/logo icesi blue.png';
import avatar from '../../resources/avatar.png';
import sellerProfile from '../../utils/dataproductos';
import Coupon from '../../components/cupon/cupon';
import ProfileBoxB from '../../components/ProfileBoxB/ProfileBoxB';

import './coupons.css';

const Coupons = () => {
	const coupons = sellerProfile.coupons;

	return (
		<div className='profile-container'>
			<img src={logo} alt='Logo' className='logo' />

			<ProfileBoxB avatar={avatar} name='Ana Gomez' id='A0072214' logo={logo} />
			<h2 className='coupons-title'>My Coupons</h2>
			<div className='coupons-container'>
				{coupons.map((coupon) => (
					<Coupon key={coupon.id} title={coupon.title} author={coupon.author} />
				))}
			</div>

			<Navbar />
		</div>
	);
};

export default Coupons;
