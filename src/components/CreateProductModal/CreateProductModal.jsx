import React, { useState } from 'react';
import { db, auth } from '../../services/firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import './CreateProductModal.css';

const CreateProductModal = ({ isOpen, onClose }) => {
	const [nombre, setNombre] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [precio, setPrecio] = useState('');
	const [favorito, setFavorito] = useState('false');
	const [stock, setStock] = useState('false');
	if (!isOpen) return null;

	const handleCreate = async () => {
		const userId = auth.currentUser?.uid;
		if (!userId) {
			alert('Usuario no autenticado');
			return;
		}

		const newProduct = {
			id: Date.now(),
			nombre,
			descripcion,
			precio,
			favorito: favorito === 'true',
			stock: stock === 'true',
			imagen: '', 
			createdAt: new Date(),
		};

		try {
			const userRef = doc(db, 'users', userId);
			await updateDoc(userRef, {
				productos: arrayUnion(newProduct),
			});
			alert('Producto creado!');
			onClose();
			setNombre('');
			setDescripcion('');
			setPrecio('');
			setFavorito('false');
			setStock('false');
		} catch (error) {
			console.error('Error al crear producto:', error);
			alert('Error al crear producto');
		}
	};

	return (
		<div className='modal-overlayx'>
			<div className='modal-contentx'>
				<h2>Crea tu nuevo producto</h2>
				<div className='image-uploadx'>Subir imagen</div>

				<div className='form-groupx'>
					<input type='text' placeholder='Nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} />
				</div>
				<div className='form-groupx'>
					<input
						type='text'
						placeholder='Descripcion'
						value={descripcion}
						onChange={(e) => setDescripcion(e.target.value)}
					/>
				</div>
				<div className='form-groupx'>
					<input type='text' placeholder='Precio' value={precio} onChange={(e) => setPrecio(e.target.value)} />
				</div>
				<div className='form-group2'>
					<label>¿Es favorito?</label>
					<select id='favorite' name='favorite' value={favorito} onChange={(e) => setFavorito(e.target.value)}>
						<option value='false'>No favorito</option>
						<option value='true'>Favorito</option>
					</select>
				</div>
				<div className='form-group2'>
					<label htmlFor='stock'>¿Está en stock?</label>
					<select id='stock' name='stock' value={stock} onChange={(e) => setStock(e.target.value)}>
						<option value='false'>Stock</option>
						<option value='true'>No Stock</option>
					</select>
				</div>

				<button className='create-btnx' onClick={handleCreate}>
					Crear!
				</button>
				<button className='close-btnx' onClick={onClose}>
					✕
				</button>
			</div>
		</div>
	);
};

export default CreateProductModal;
