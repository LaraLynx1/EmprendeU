import React from 'react';
import './carta-producto.css';
import editStore from '../../resources/editStore.png';
import deleteStore from '../../resources/deleteStore.png';

const ProductCard = ({ product, isEditing }) => {
	return (
		<div className='product-card'>
			<img src={product.image} className='product-img' alt={product.name} />

			<div className='product-info'>
				<h3 className='product-name'>{product.name}</h3>
				<p className='product-desc'>{product.description}</p>

				<div className='product-footer'>
					<p className='product-price'>${product.price}</p>
					{product.favorite && <span className='star'>★</span>}
					{!product.available && <span className='stock'>Out of Stock</span>}
				</div>
			</div>

			{isEditing && (
				<div className='edit-actions'>
					<img src={editStore} alt='Edit' className='action-icon' onClick={() => alert('Editar producto')} />
					<img src={deleteStore} alt='Delete' className='action-icon' onClick={() => alert('Eliminar producto')} />
				</div>
			)}
		</div>
	);
};

export default ProductCard;
