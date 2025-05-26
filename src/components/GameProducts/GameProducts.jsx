import React, { useEffect, useState } from 'react';
import './GameProducts.css';
import { auth, db } from '../../services/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const GameProducts = ({ isOpen, onClose }) => {
	const [products, setProducts] = useState([]);
	const [selectedProductId, setSelectedProductId] = useState('');
	const [selectedDiscount, setSelectedDiscount] = useState('');
	const [productToRemoveId, setProductToRemoveId] = useState('');

	useEffect(() => {
		const fetchUserProducts = async () => {
			const userId = auth.currentUser?.uid;
			if (!userId) return;

			const userRef = doc(db, 'users', userId);
			const userSnap = await getDoc(userRef);

			if (userSnap.exists()) {
				const userData = userSnap.data();
				setProducts(userData.productos || []);
			}
		};

		if (isOpen) {
			fetchUserProducts();
		}
	}, [isOpen]);

	const handleSaveGameProducts = async () => {
		const userId = auth.currentUser?.uid;
		if (!userId) {
			alert('User not authenticated');
			return;
		}

		if (!selectedProductId && !productToRemoveId) {
			alert('Select at least one action to perform');
			return;
		}

		const updatedProducts = products.map((product) => {
			if (product.id === selectedProductId && selectedDiscount) {
				return {
					...product,
					juegoDescuento: {
						activo: true,
						porcentaje: Number(selectedDiscount),
					},
				};
			}
			if (product.id === productToRemoveId) {
				return {
					...product,
					juegoDescuento: {
						activo: false,
						porcentaje: 0,
					},
				};
			}
			return product;
		});

		try {
			const userRef = doc(db, 'users', userId);
			await updateDoc(userRef, {
				productos: updatedProducts,
			});

			alert('Changes saved successfully');
			setSelectedProductId('');
			setSelectedDiscount('');
			setProductToRemoveId('');
			onClose();
		} catch (error) {
			console.error('Error updating game products:', error);
			alert('Error saving changes. Please try again.');
		}
	};

	const activeDiscounts = products.filter((product) => product.juegoDescuento?.activo);

	if (!isOpen) return null;

	return (
		<div className='modal-overlay1'>
			<div className='modal-content1'>
				<button className='close-btn1' onClick={onClose}>
					×
				</button>

				<h2>Tus productos con descuento</h2>

				<div className='Container-gamePopup1'>
					<label className='tittle1'>Agregar producto</label>
					<select value={selectedProductId} onChange={(e) => setSelectedProductId(e.target.value)}>
						<option value=''>Selecciona un producto</option>
						{products.map((product) => (
							<option key={product.id} value={product.id}>
								{product.nombre}
							</option>
						))}
					</select>
					<select value={selectedDiscount} onChange={(e) => setSelectedDiscount(e.target.value)}>
						<option value=''>¿Cuánto descuento?</option>
						<option value='10'>10%</option>
						<option value='15'>15%</option>
						<option value='25'>25%</option>
					</select>
				</div>

				<div className='discount-list-placeholder1'>
					{activeDiscounts.map((product) => (
						<div key={product.id}>
							<strong>{product.nombre}</strong> - {product.juegoDescuento.porcentaje}% de descuento
						</div>
					))}
				</div>

				<div className='Container-gamePopup1'>
					<label className='tittle1'>Quitar producto</label>
					<select value={productToRemoveId} onChange={(e) => setProductToRemoveId(e.target.value)}>
						<option value=''>Selecciona un producto</option>
						{activeDiscounts.map((product) => (
							<option key={product.id} value={product.id}>
								{product.nombre}
							</option>
						))}
					</select>
				</div>

				<button className='create-btnx' onClick={handleSaveGameProducts}>
					Guardar
				</button>
			</div>
		</div>
	);
};

export default GameProducts;
