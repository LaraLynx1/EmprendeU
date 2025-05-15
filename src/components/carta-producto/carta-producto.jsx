import React, { useState } from 'react';
import './carta-producto.css';
import editStore from '../../resources/editStore.png';
import deleteStore from '../../resources/deleteStore.png';
import Staryellow from '../../resources/staryellow.png';
import EditProductModal from '../editProductModal/editProductModal';
import DeleteModal from '../DeleteModal/DeleteModal';

const ProductCard = ({ product, isEditing }) => {
	const [isEditProduct, setisEditProduct] = useState(false);
	const [isDelete, setisDelete] = useState(false);
	console.log('Productos que llegan al grid:', product);
	return (
		<div className='product-card'>
			<img src={product.imagen} className='product-img' alt={product.nombre} />

			<div className='product-info'>
				<h3 className='product-name'>{product.nombre}</h3>
				<p className='product-desc'>{product.descripcion}</p>

				<div className='product-footer'>
					<p className='product-price'>${product.precio}</p>
					{product.favorito && <img src={Staryellow} alt='Favorite' className='star' />}

					{/* Si tienes un campo de stock, puedes dejar esto, si no, elimínalo */}
					{/* {!product.available && <span className='stock'>Out of Stock</span>} */}
				</div>
			</div>

			{isEditing && (
				<div className='edit-actions'>
					<img src={editStore} alt='Edit' className='action-icon' onClick={() => setisEditProduct(true)} />
					<img src={deleteStore} alt='Delete' className='action-icon' onClick={() => setisDelete(true)} />
				</div>
			)}
			<EditProductModal isOpen={isEditProduct} onClose={() => setisEditProduct(false)} />
			<DeleteModal isOpen={isDelete} onClose={() => setisDelete(false)} />
		</div>
	);
};

const ProductGrid = ({ products, isEditing }) => {
	return (
		<div className='product-grid'>
			{products.map((product, idx) => (
				<ProductCard key={idx} product={product} isEditing={isEditing} />
			))}
		</div>
	);
};

export default ProductCard;
