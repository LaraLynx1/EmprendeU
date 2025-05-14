import React, { useState } from 'react';
import sellerProfile from '../../utils/dataproductos';
import ProfileBoxC from '../../components/profile-box-C/profile-box-C';
import ProductCard from '../../components/carta-producto/carta-producto';
import Navbar from '../../components/navbar/navbar';
import CreateProductModal from '../../components/CreateProductModal/CreateProductModal';

import logo from '../../resources/logo icesi blue.png';
import arrowback from '../../resources/arrowback.png';
import edit from '../../resources/edit.png';
import plus from '../../resources/plus.png';
import coupon from '../../resources/coupon.png';
import './myStore.css';

const MyStore = () => {
	const { name, id, status, avatar, products } = sellerProfile;
	const [isEditing, setIsEditing] = useState(false);
	const [isCreating, setIsCreating] = useState(false);

	const toggleEditMode = () => {
		setIsEditing((prev) => !prev);
	};

	const handleBackClick = () => {
		if (isEditing) {
			setIsEditing(false);
		} else {
			console.log('Volver a pantalla anterior');
		}
	};

	return (
		<div className='container'>
			<img src={logo} className='logoicesi' alt='ICESI Logo' />

			<ProfileBoxC name={name} id={id} status={status} avatar={avatar} />

			<div className='store-header'>
				<img src={arrowback} alt='Back' className='header-icon' onClick={handleBackClick} />
				<h2 className='store-title'>
					<em>My store:</em>
				</h2>
				<img src={coupon} alt='Game' className='header-icon1' />
				{isEditing ? (
					<img src={plus} alt='Add Product' className='header-icon' onClick={() => setIsCreating(true)} />
				) : (
					<img src={edit} alt='Edit' className='header-icon' onClick={toggleEditMode} />
				)}
			</div>

			<div className='product-grid'>
				{products.map((product) => (
					<ProductCard key={product.id} product={product} isEditing={isEditing} />
				))}
			</div>

			<Navbar />

			<CreateProductModal isOpen={isCreating} onClose={() => setIsCreating(false)} />
		</div>
	);
};

export default MyStore;
