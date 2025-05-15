import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../services/firebase';
import sellerProfile from '../../utils/dataproductos';
import ProfileBoxC from '../../components/profile-box-C/profile-box-C';
import ProductCard from '../../components/carta-producto/carta-producto';
import Navbar from '../../components/navbar/navbar';
import CreateProductModal from '../../components/CreateProductModal/CreateProductModal';
import GameProducts from '../../components/GameProducts/GameProducts';

import logo from '../../resources/logo icesi blue.png';
import arrowback from '../../resources/arrowback.png';
import edit from '../../resources/edit.png';
import plus from '../../resources/plus.png';
import coupon from '../../resources/coupon.png';
import './myStore.css';

const MyStore = () => {
	const { name, id, status, avatar } = sellerProfile;
	const [isEditing, setIsEditing] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [isGameList, setisGameList] = useState(false);
	const [products, setProducts] = useState([]);

	const fetchProducts = async () => {
		const userId = auth.currentUser?.uid;
		if (!userId) return;

		const userRef = doc(db, 'users', userId);
		const userSnap = await getDoc(userRef);

		if (userSnap.exists()) {
			const data = userSnap.data();
			const userProducts = data.productos || [];
			setProducts(userProducts);
		} else {
			setProducts([]);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

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
				<img src={coupon} alt='Game' className='header-icon1' onClick={() => setisGameList(true)} />
				{isEditing ? (
					<img src={plus} alt='Add Product' className='header-icon' onClick={() => setIsCreating(true)} />
				) : (
					<img src={edit} alt='Edit' className='header-icon' onClick={toggleEditMode} />
				)}
			</div>

			<div className='product-grid'>
				{products.map((product, idx) => (
					<ProductCard key={idx} product={product} isEditing={isEditing} />
				))}
			</div>


			<Navbar />

			<CreateProductModal
				isOpen={isCreating}
				onClose={() => {
					setIsCreating(false);
					fetchProducts(); // <-- Recarga productos al cerrar el modal
				}}
			/>
			<GameProducts isOpen={isGameList} onClose={() => setisGameList(false)} />
		</div>
	);
};

export default MyStore;
