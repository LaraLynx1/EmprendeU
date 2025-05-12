import React from 'react';
import './CreateProductModal.css';

const CreateProductModal = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className='modal-overlay'>
			<div className='modal-content'>
				<h2>Create your new product</h2>
				<div className='image-upload'>Upload image</div>

				<div className='form-group'>
					<label>Name:</label>
					<input type='text' />
				</div>
				<div className='form-group'>
					<label>Description:</label>
					<input type='text' />
				</div>
				<div className='form-group'>
					<label>Price:</label>
					<input type='text' />
				</div>

				<button className='create-btn' onClick={onClose}>
					Create!
				</button>
				<button className='close-btn' onClick={onClose}>
					✕
				</button>
			</div>
		</div>
	);
};

export default CreateProductModal;
