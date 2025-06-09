import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { db } from '../../services/firebase';
import { collection, getDocs, query, where, getDoc, doc } from 'firebase/firestore';
import { useMediaQuery, Box, IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';

import ProfileBox from '../../components/profile-box1/profile-box1';
import ProductCard from '../../components/ProductCard/ProductCard';
import Navbar from '../../components/navbar/navbar';
import Sidebar from '../../components/SideBar/Sidebar';

import BlueLogo from '../../resources/logo icesi blue.png';
import arrowback from '../../resources/arrowback.png';
import './SellerProfile.css';

const SellerProfile = () => {
	const { sellerId } = useParams();
	const location = useLocation();
	const sellerInfo = location.state || {};
	const isDesktop = useMediaQuery('(min-width:768px)');
	const navigate = useNavigate();

	const [seller, setSeller] = useState(null);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [sidebarOpen, setSidebarOpen] = useState(false);

	useEffect(() => {
		const fetchSellerData = async () => {
			try {
				setLoading(true);

				const sellerIdToUse = sellerId || sellerInfo.id || sellerInfo.sellerId || sellerInfo.name;

				if (!sellerIdToUse) throw new Error('No se encontró información del vendedor');

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
						phone: sellerData.phoneNumber,
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

	if (loading || error || !seller) {
		return (
			<div className='container'>
				<img src={BlueLogo} className='logoicesi' alt='ICESI Logo' />
				<IconButton className='arrowback-btn' onClick={() => navigate('/dashboard')}>
					<img src={arrowback} alt='Volver' style={{ width: 32, height: 32 }} />
				</IconButton>
				{loading && <div className='loading'>Cargando información del vendedor...</div>}
				{error && <div className='error'>Error: {error}</div>}
				{!isDesktop && <Navbar />}
			</div>
		);
	}

	return (
		<div className='container'>
			{isDesktop ? (
				<>
					<div className='desktop-header'>
						<IconButton className='arrowback-btn' onClick={() => navigate('/dashboard')}>
							<img src={arrowback} alt='Volver' style={{ width: 32, height: 32 }} />
						</IconButton>
						<IconButton className='menu-button' onClick={() => setSidebarOpen(true)}>
							<Menu />
						</IconButton>
						<img src={BlueLogo} alt='Logo' className='logo-desktop' />
						<Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
					</div>

					<div className='desktop-layout'>
						<div className='profile-section'>
							<ProfileBox
								variant='large'
								name={seller.name}
								status={seller.isActive ? 'Inactivo' : 'Activo'}
								avatar={seller.img}
								starProduct={seller.starProduct}
								email={seller.email}
								phoneNumber={seller.phone}
								description={seller.description}
							/>
						</div>

						<div className='products-section'>
							<h2 className='products-title'>Productos de {seller.name}</h2>
							{products.length > 0 ? (
								<div className='desktop-grid'>
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
						</div>
					</div>
				</>
			) : (
				<>
					<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
						<IconButton className='arrowback-btn' onClick={() => navigate('/dashboard')}>
							<img src={arrowback} alt='Volver' style={{ width: 32, height: 32 }} />
						</IconButton>
						<img src={BlueLogo} className='logoicesi' alt='ICESI Logo' />
					</div>

					<ProfileBox
						name={seller.name}
						status={seller.isActive ? 'Inactivo' : 'Activo'}
						avatar={seller.img}
						starProduct={seller.starProduct}
						email={seller.email}
						phoneNumber={seller.phone}
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
				</>
			)}
		</div>
	);
};

export default SellerProfile;
