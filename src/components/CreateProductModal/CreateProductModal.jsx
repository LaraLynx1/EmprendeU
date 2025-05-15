import React from 'react';
import './CreateProductModal.css';

const CreateProductModal = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className='modal-overlayx'>
			<div className='modal-contentx'>
				<h2>Crea tu nuevo producto</h2>
				<div className='image-uploadx'>Subir imagen</div>

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

				<button className='create-btnx' onClick={onClose}>
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
