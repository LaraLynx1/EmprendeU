import React from 'react';
import sellerProfile from '../../utils/dataproductos';
import ProfileBoxC from '../../components/profile-box-C/profile-box-C';
import ProductCard from '../../components/carta-producto/carta-producto';
import Navbar from '../../components/navbar/navbar';
import logo from '../../resources/logo icesi blue.png';
import arrowback from '../../resources/arrowback.png';
import edit from '../../resources/edit.png';
import './myStore.css';

const MyStore = () => {
	const { name, id, status, avatar, products } = sellerProfile;

	return (
		<div className='container'>
			<img src={logo} className='logoicesi' alt='ICESI Logo' />

			<ProfileBoxC name={name} id={id} status={status} avatar={avatar} />

			<div className='store-header'>
				<img src={arrowback} alt='Back' className='header-icon' />
				<h2 className='store-title'>
					<em>My store:</em>
				</h2>
				<img src={edit} alt='Edit' className='header-icon' />
			</div>

			<div className='product-grid'>
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>

			<Navbar />
		</div>
	);
};

export default MyStore;
