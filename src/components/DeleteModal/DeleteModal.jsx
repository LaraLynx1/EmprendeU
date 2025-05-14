import React from 'react';
import './DeleteModal.css';

const EditProductModal = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className='modal-overlayx'>
			<div className='modal-contentx'>
				<h2>¿Seguro que quieres eliminar este producto?</h2>
				<div className='flex'>
					<button className='create-btnx' onClick={onClose}>
						Eliminar
					</button>
					<button className='create-btnx' onClick={onClose}>
						Cancelar
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditProductModal;
