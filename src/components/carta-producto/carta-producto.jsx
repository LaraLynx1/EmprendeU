import React from 'react';
import './carta-producto.css';

const ProductCard = ({ product }) => {
	return (
		<div className='product-card'>
			<img src={product.image} className='product-img' />
			<div className='product-info'>
				<h3 className='product-name'>{product.name}</h3>
				<p className='product-desc'>{product.description}</p>
				<div className='product-footer'>
					<p className='product-price'>${product.price}</p>
					{product.favorite && <span className='star'>★</span>}
					{!product.available && <span className='stock'>Out of Stock</span>}
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
