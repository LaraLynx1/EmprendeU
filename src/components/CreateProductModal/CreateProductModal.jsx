import React from 'react';
import './CreateProductModal.css';

const CreateProductModal = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className='modal-overlayx'>
			<div className='modal-contentx'>
				<h2>Create your new product</h2>
				<div className='image-uploadx'>Upload image</div>

				<div className='form-groupx'>
					<input type='text' placeholder='Name' />
				</div>
				<div className='form-groupx'>
					<input type='text' placeholder='Description' />
				</div>
				<div className='form-groupx'>
					<input type='text' placeholder='Price' />
				</div>

				<button className='create-btnx' onClick={onClose}>
					Create!
				</button>
				<button className='close-btnx' onClick={onClose}>
					✕
				</button>
			</div>
		</div>
	);
};

export default CreateProductModal;
