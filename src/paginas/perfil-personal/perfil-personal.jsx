import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import logo from '../../recursos/logo icesi blue.png';
import avatar from '../../recursos/avatar.png';
import storeIcon from '../../recursos/store.png';
import settingsIcon from '../../recursos/settings.png';
import starIcon from '../../recursos/star black.png';
import helpIcon from '../../recursos/help.png';
import couponIcon from '../../recursos/coupon.png';
import logoutIcon from '../../recursos/logout.png';
import ProfileBoxB from '../../components/ProfileBoxB/ProfileBoxB';

import './perfil-personal.css';

const PerfilPersonal = () => {
	const navigate = useNavigate();

	return (
		<div className='profile-container'>
			<img src={logo} alt='Logo' className='logo' />

			<ProfileBoxB avatar={avatar} name='Ana Gomez' id='A0072214' logo={logo} />

			<button className='store-btn'>
				<img src={storeIcon} alt='Store' />
				My store
			</button>

			<div className='options'>
				<div className='option'>
					<img src={settingsIcon} alt='Settings' />
					<span>Settings</span>
				</div>
				<div className='option' onClick={() => navigate('/favoritos')}>
					<img src={starIcon} alt='Favorites' />
					<span>Favorites</span>
				</div>
				<div className='option'>
					<img src={helpIcon} alt='Help' />
					<span>Help</span>
				</div>
				<div className='option' onClick={() => navigate('/cupones')}>
					<img src={couponIcon} alt='Coupons' />
					<span>My coupons</span>
				</div>
				<div className='option'>
					<img src={logoutIcon} alt='Logout' />
					<span className='logout'>Log out</span>
				</div>
			</div>

			<Navbar />
		</div>
	);
};

export default PerfilPersonal;
