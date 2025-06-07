import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../services/firebase';
import ProfileBoxC from '../../components/profile-box-C/profile-box-C';
import ProductCard from '../../components/productCard/ProductCard';
import Navbar from '../../components/navbar/navbar';
import CreateProductModal from '../../components/CreateProductModal/CreateProductModal';
import GameProducts from '../../components/GameProducts/GameProducts';
import { useNavigate } from 'react-router-dom';

import logo from '../../resources/logo icesi blue.png';
import arrowback from '../../resources/arrowback.png';
import edit from '../../resources/edit.png';
import plus from '../../resources/plus.png';
import coupon from '../../resources/coupon.png';
import './myStore.css';

const MyStore = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [isGameList, setisGameList] = useState(false);
	const [products, setProducts] = useState([]);
	const [userData, setUserData] = useState(null);
	const navigate = useNavigate();

	const fetchUserDataAndProducts = async () => {
		const userId = auth.currentUser?.uid;
		if (!userId) return;

		const userRef = doc(db, 'users', userId);
		const userSnap = await getDoc(userRef);

		if (userSnap.exists()) {
			const data = userSnap.data();
			setUserData(data);
			const userProducts = data.productos || [];
			setProducts(userProducts);
		} else {
			setUserData(null);
			setProducts([]);
		}
	};

	useEffect(() => {
		fetchUserDataAndProducts();
	}, []);

	const toggleEditMode = () => {
		setIsEditing((prev) => !prev);
	};

	const handleBackClick = () => {
		navigate('/perfil-personal');
	};

	return (
		<div className='container'>
			<img src={logo} className='logoicesi' alt='ICESI Logo' />

			<ProfileBoxC name={userData?.name} id={userData?.code} status={userData?.status} avatar={userData?.avatar} />

			<div className='store-header'>
				<img src={arrowback} alt='Back' className='header-icon' onClick={handleBackClick} />
				<h2 className='store-title'>
					<em>Mi tienda:</em>
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
					<ProductCard
						key={idx}
						product={product}
						isEditing={isEditing}
						idx={idx}
						refreshProducts={fetchUserDataAndProducts}
					/>
				))}
			</div>

			<Navbar />

			<CreateProductModal
				isOpen={isCreating}
				onClose={() => {
					setIsCreating(false);
					fetchUserDataAndProducts();
				}}
			/>
			<GameProducts isOpen={isGameList} onClose={() => setisGameList(false)} />
		</div>
	);
};

export default MyStore;
