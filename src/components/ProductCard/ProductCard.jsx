import React, { useState } from 'react';
import './ProductCard.css';
import editStore from '../../resources/editStore.png';
import deleteStore from '../../resources/deleteStore.png';
import Staryellow from '../../resources/Staryellow.png';
import EditProductModal from '../editProductModal/editProductModal';
import DeleteModal from '../DeleteModal/DeleteModal';
import { db, auth } from '../../services/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const ProductCard = ({ product, isEditing, idx, refreshProducts }) => {
	const [isEditProduct, setisEditProduct] = useState(false);
	const [isDelete, setisDelete] = useState(false);

	const handleDelete = async () => {
		const userId = auth.currentUser?.uid;
		if (!userId) return;
		try {
			const userRef = doc(db, 'users', userId);
			const userSnap = await getDoc(userRef);
			if (!userSnap.exists()) return;
			const productos = userSnap.data().productos || [];
			const nuevosProductos = productos.filter((p) => p.id !== product.id);
			await updateDoc(userRef, { productos: nuevosProductos });
			if (refreshProducts) refreshProducts();
			setisDelete(false);
		} catch (error) {
			console.error('Error al borrar producto:', error);
			alert('Error al borrar producto');
		}
	};

	console.log('Productos que llegan al grid:', product);
	return (
		<div className='product-card'>
			<img src={product.imagen} className='product-img' alt={product.nombre} />

			<div className='product-info'>
				<h3 className='product-name'>{product.nombre}</h3>
				<p className='product-desc'>{product.descripcion}</p>

				<div className='product-footer'>
					<div className='price-star-container'>
						<p className='product-price'>${product.precio}</p>
						{product.favorito && <img src={Staryellow} alt='Favorite' className='star' />}
					</div>
					<p className={`product-stock${product.stock ? ' no-stock' : ''}`}>{product.stock ? 'No Stock' : 'Stock'}</p>
				</div>
			</div>

			{isEditing && (
				<div className='edit-actions'>
					<img src={editStore} alt='Edit' className='action-icon' onClick={() => setisEditProduct(true)} />
					<img src={deleteStore} alt='Delete' className='action-icon' onClick={handleDelete} />
				</div>
			)}
			<EditProductModal
				isOpen={isEditProduct}
				onClose={() => setisEditProduct(false)}
				product={product}
				productIdx={idx}
				refreshProducts={refreshProducts}
			/>
			<DeleteModal isOpen={isDelete} onClose={() => setisDelete(false)} onDelete={handleDelete} />
		</div>
	);
};

const ProductGrid = ({ products, isEditing }) => {
	return (
		<div className='product-grid'>
			{products.map((product, idx) => (
				<ProductCard key={idx} product={product} isEditing={isEditing} idx={idx} refreshProducts={fetchProducts} />
			))}
		</div>
	);
};

export default ProductCard;
