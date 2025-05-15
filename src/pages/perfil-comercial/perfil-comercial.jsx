import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { db } from '../../services/firebase';
import { collection, getDocs, query, where, getDoc, doc } from 'firebase/firestore';
import ProfileBox from '../../components/profile-box1/profile-box1';
import ProductCard from '../../components/carta-producto/carta-producto';
import Navbar from '../../components/navbar/navbar';
import logo from '../../resources/logo icesi blue.png';
import './perfil-comercial.css';

const SellerProfile = () => {
	const { sellerId } = useParams();
	const location = useLocation();
	const sellerInfo = location.state || {};

	const [seller, setSeller] = useState(null);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchSellerData = async () => {
			try {
				setLoading(true);

				const sellerIdToUse = sellerId || sellerInfo.id || sellerInfo.sellerId || sellerInfo.name;

				if (!sellerIdToUse) {
					throw new Error('No se encontró información del vendedor');
				}

				const sellerRef = doc(db, 'users', sellerIdToUse);
				const sellerDoc = await getDoc(sellerRef);

				if (sellerDoc.exists()) {
					const sellerData = sellerDoc.data();

					const sellerName = sellerData.name || sellerData.displayName || sellerInfo.name || sellerIdToUse;

					setSeller({
						name: sellerName,
						img: sellerData.photoURL || sellerData.img || sellerInfo.img,
						isActive: sellerData.isActive !== undefined ? sellerData.isActive : sellerInfo.isActive,
						starProduct: sellerData.starProduct || sellerInfo.starProduct || 0,
						email: sellerData.email,
						phone: sellerData.phone,
						description: sellerData.description,
					});

					if (sellerData.productos && Array.isArray(sellerData.productos)) {
						setProducts(sellerData.productos);
					} else {
						const productsRef = collection(db, 'products');
						const q = query(productsRef, where('sellerId', '==', sellerIdToUse));
						const querySnapshot = await getDocs(q);

						const productsList = [];
						querySnapshot.forEach((doc) => {
							productsList.push({
								id: doc.id,
								...doc.data(),
							});
						});

						setProducts(productsList);
					}
				} else {
					setSeller({
						name: sellerInfo.name || sellerIdToUse,
						img: sellerInfo.img,
						isActive: sellerInfo.isActive,
						starProduct: sellerInfo.starProduct || 0,
					});
				}
			} catch (err) {
				console.error('Error:', err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchSellerData();
	}, [sellerId, sellerInfo]);

	if (loading) {
		return (
			<div className='container'>
				<img src={logo} className='logoicesi' alt='ICESI Logo' />
				<div className='loading'>Cargando información del vendedor...</div>
				<Navbar />
			</div>
		);
	}

	if (error) {
		return (
			<div className='container'>
				<img src={logo} className='logoicesi' alt='ICESI Logo' />
				<div className='error'>Error: {error}</div>
				<Navbar />
			</div>
		);
	}

	if (!seller) {
		return (
			<div className='container'>
				<img src={logo} className='logoicesi' alt='ICESI Logo' />
				<div className='error'>No se encontró información del vendedor</div>
				<Navbar />
			</div>
		);
	}

	return (
		<div className='container'>
			<img src={logo} className='logoicesi' alt='ICESI Logo' />

			<ProfileBox
				name={seller.name}
				status={seller.isActive ? 'Activo' : 'Inactivo'}
				avatar={seller.img}
				starProduct={seller.starProduct}
				email={seller.email}
				phone={seller.phone}
				description={seller.description}
			/>

			<h2 className='products-title'>Productos de {seller.name}</h2>

			{products.length > 0 ? (
				<div className='product-grid'>
					{products.map((product, index) => (
						<ProductCard
							key={product.id || index}
							product={{
								...product,
								sellerName: seller.name,
							}}
						/>
					))}
				</div>
			) : (
				<div className='no-products'>No se encontraron productos para {seller.name}.</div>
			)}

			<Navbar />
		</div>
	);
};

export default SellerProfile;
