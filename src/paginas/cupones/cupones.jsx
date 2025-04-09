import React from 'react';
import Navbar from '../../components/navbar/navbar';
import logo from '../../recursos/logo icesi blue.png';
import avatar from '../../recursos/avatar.png';
import perfilvendedor from '../../utils/dataproductos';
import Cupon from '../../components/cupon/cupon';
import ProfileBoxB from '../../components/ProfileBoxB/ProfileBoxB';

import './cupones.css';

const Cupones = () => {
	const cupones = perfilvendedor.cupones;

	return (
		<div className='profile-container'>
			<img src={logo} alt='Logo' className='logo' />

			<ProfileBoxB avatar={avatar} name='Ana Gomez' id='A0072214' logo={logo} />
			<h2 className='cupones-title'>My Coupons</h2>
			<div className='cupones-container'>
				{cupones.map((cupon) => (
					<Cupon key={cupon.id} titulo={cupon.titulo} autor={cupon.autor} />
				))}
			</div>

			<Navbar />
		</div>
	);
};

export default Cupones;
