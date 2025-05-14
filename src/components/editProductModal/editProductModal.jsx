import React from 'react';
import './editProductModal.css';

const EditProductModal = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className='modal-overlayx'>
			<div className='modal-contentx'>
				<h2>Edit your product</h2>
				<div className='image-uploadx'>¿Cambiar imagen?</div>

				<div className='form-groupx'>
					<input type='text' placeholder='Nombre' />
				</div>
				<div className='form-groupx'>
					<input type='text' placeholder='Descripcion' />
				</div>
				<div className='form-groupx'>
					<input type='text' placeholder='Precio' />
				</div>
				<div className='form-group2'>
					<label>¿Es favorito?</label>
					<select id='favorite' name='favorite'>
						<option value='false'>No favorito</option>
						<option value='true'>Favorito</option>
					</select>
				</div>
				<div className='form-group2'>
					<label>¿Esta en stock?</label>
					<select id='favorite' name='favorite'>
						<option value='false'>Stock</option>
						<option value='true'>No Stock</option>
					</select>
				</div>

				<button className='create-btnx' onClick={onClose}>
					Editar!
				</button>
				<button className='close-btnx' onClick={onClose}>
					✕
				</button>
			</div>
		</div>
	);
};

export default EditProductModal;
