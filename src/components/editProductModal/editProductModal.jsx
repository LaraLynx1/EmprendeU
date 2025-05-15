import React, { useState, useEffect } from 'react';
import { db, auth } from '../../services/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './editProductModal.css';

const EditProductModal = ({ isOpen, onClose, product, productIdx, refreshProducts }) => {
	const [nombre, setNombre] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [precio, setPrecio] = useState('');
	const [favorito, setFavorito] = useState('false');
	const [stock, setStock] = useState('false');

	useEffect(() => {
		if (isOpen && product) {
			setNombre(product.nombre || '');
			setDescripcion(product.descripcion || '');
			setPrecio(product.precio || '');
			setFavorito(product.favorito ? 'true' : 'false');
			setStock(product.stock ? 'true' : 'false');
		}
	}, [isOpen, product]);

	if (!isOpen || !product) return null;

	const handleEdit = async (e) => {
		e.preventDefault();
		const userId = auth.currentUser?.uid;
		if (!userId) return;

		try {
			const userRef = doc(db, 'users', userId);
			const userSnap = await getDoc(userRef);
			if (!userSnap.exists()) return;

			const productos = userSnap.data().productos || [];
			console.log('Antes:', productos);
			console.log('Editando idx:', productIdx, 'Producto:', productos[productIdx]);

			const updatedProduct = {
				...productos[productIdx],
				nombre,
				descripcion,
				precio,
				favorito: favorito === 'true',
				stock: stock === 'true',
			};
			productos[productIdx] = updatedProduct;
			console.log('Después:', productos);

			await updateDoc(userRef, { productos });
			if (refreshProducts) refreshProducts();
			onClose();
		} catch (error) {
			console.error('Error editing product:', error);
			alert('Error al editar el producto');
		}
	};

	return (
		<div className='modal-overlayx'>
			<div className='modal-contentx'>
				<h2>Edita tu producto</h2>
				<form onSubmit={handleEdit}>
					<div className='form-groupx'>
						<label htmlFor='nombre'>Nombre</label>
						<input
							id='nombre'
							type='text'
							placeholder='Nombre'
							value={nombre}
							onChange={(e) => setNombre(e.target.value)}
						/>
					</div>
					<div className='form-groupx'>
						<label htmlFor='descripcion'>Descripción</label>
						<input
							id='descripcion'
							type='text'
							placeholder='Descripción'
							value={descripcion}
							onChange={(e) => setDescripcion(e.target.value)}
						/>
					</div>
					<div className='form-groupx'>
						<label htmlFor='precio'>Precio</label>
						<input
							id='precio'
							type='text'
							placeholder='Precio'
							value={precio}
							onChange={(e) => setPrecio(e.target.value)}
						/>
					</div>
					<div className='form-group2'>
						<label htmlFor='favorito'>¿Es favorito?</label>
						<select id='favorito' value={favorito} onChange={(e) => setFavorito(e.target.value)}>
							<option value='false'>No favorito</option>
							<option value='true'>Favorito</option>
						</select>
					</div>
					<div className='form-group2'>
						<label htmlFor='stock'>¿Está en stock?</label>
						<select id='stock' value={stock} onChange={(e) => setStock(e.target.value)}>
							<option value='false'>Stock</option>
							<option value='true'>No Stock</option>
						</select>
					</div>
					<button className='create-btnx' type='submit'>
						Editar!
					</button>
					<button className='close-btnx' type='button' onClick={onClose}>
						✕
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditProductModal;
