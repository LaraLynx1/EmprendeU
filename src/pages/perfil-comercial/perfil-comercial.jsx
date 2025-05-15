import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ProfileBox from '../../components/profile-box1/profile-box1';
import ProductCard from '../../components/carta-producto/carta-producto';
import Navbar from '../../components/navbar/navbar';
import logo from '../../resources/logo icesi blue.png';
import './perfil-comercial.css';
import { db, auth } from '../../services/firebase';
import { collection, getDocs, query, where, getDoc, doc } from 'firebase/firestore';

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

				// Debug what we're receiving (solo para desarrollo, quitar en producción)
				console.log("Params sellerId:", sellerId);
				console.log("Location state:", sellerInfo);

				// Get the seller ID from params or state, with fallbacks
				const sellerIdToUse = sellerId || sellerInfo.id || sellerInfo.sellerId || sellerInfo.name;

				console.log("Using seller ID:", sellerIdToUse);

				if (!sellerIdToUse) {
					console.error("No seller ID found in params or state");
					throw new Error("No se encontró información del vendedor");
				}

				// Intentar obtener el vendedor y sus productos directamente del documento del vendedor
				try {
					// Primero intentamos en la colección users
					const userRef = doc(db, 'users', sellerIdToUse);
					const userDoc = await getDoc(userRef);

					if (userDoc.exists()) {
						console.log("Found seller in users collection");
						const userData = userDoc.data();

						// Establecer la información del vendedor (sin incluir el ID en el objeto)
						setSeller({
							// No incluimos el ID en el objeto seller
							name: userData.name || userData.displayName || sellerInfo.name || "Vendedor",
							img: userData.photoURL || userData.img || sellerInfo.img,
							isActive: userData.isActive !== undefined ? userData.isActive : sellerInfo.isActive,
							starProduct: userData.starProduct || sellerInfo.starProduct || 0,
							email: userData.email,
							phone: userData.phone,
							description: userData.description
						});

						// Verificar si el documento tiene un array de productos
						if (userData.productos && Array.isArray(userData.productos)) {
							console.log(`Found ${userData.productos.length} products in user document`);

							// Asegurarse de que los productos no contengan información sensible
							const safeProducts = userData.productos.map(product => {
								// Crear una copia del producto sin el ID del vendedor
								const { sellerId, ...safeProduct } = product;
								return safeProduct;
							});

							setProducts(safeProducts);
						} else {
							console.log("No products array found in user document");
						}
					} else {
						// Si no está en users, intentamos en sellers
						const sellerRef = doc(db, 'sellers', sellerIdToUse);
						const sellerDoc = await getDoc(sellerRef);

						if (sellerDoc.exists()) {
							console.log("Found seller in sellers collection");
							const sellerData = sellerDoc.data();

							// Establecer la información del vendedor (sin incluir el ID)
							setSeller({
								// No incluimos el ID en el objeto seller
								name: sellerData.name || sellerInfo.name || "Vendedor",
								img: sellerData.img || sellerInfo.img,
								isActive: sellerData.isActive !== undefined ? sellerData.isActive : sellerInfo.isActive,
								starProduct: sellerData.starProduct || sellerInfo.starProduct || 0,
								email: sellerData.email,
								phone: sellerData.phone,
								description: sellerData.description
							});

							// Verificar si el documento tiene un array de productos
							if (sellerData.productos && Array.isArray(sellerData.productos)) {
								console.log(`Found ${sellerData.productos.length} products in seller document`);

								// Asegurarse de que los productos no contengan información sensible
								const safeProducts = sellerData.productos.map(product => {
									// Crear una copia del producto sin el ID del vendedor
									const { sellerId, ...safeProduct } = product;
									return safeProduct;
								});

								setProducts(safeProducts);
							} else {
								console.log("No products array found in seller document");
							}
						} else {
							// Si no está en sellers, intentamos en vendors
							const vendorRef = doc(db, 'vendors', sellerIdToUse);
							const vendorDoc = await getDoc(vendorRef);

							if (vendorDoc.exists()) {
								console.log("Found seller in vendors collection");
								const vendorData = vendorDoc.data();

								// Establecer la información del vendedor (sin incluir el ID)
								setSeller({
									// No incluimos el ID en el objeto seller
									name: vendorData.name || sellerInfo.name || "Vendedor",
									img: vendorData.img || sellerInfo.img,
									isActive: vendorData.isActive !== undefined ? vendorData.isActive : sellerInfo.isActive,
									starProduct: vendorData.starProduct || sellerInfo.starProduct || 0,
									email: vendorData.email,
									phone: vendorData.phone,
									description: vendorData.description
								});

								// Verificar si el documento tiene un array de productos
								if (vendorData.productos && Array.isArray(vendorData.productos)) {
									console.log(`Found ${vendorData.productos.length} products in vendor document`);

									// Asegurarse de que los productos no contengan información sensible
									const safeProducts = vendorData.productos.map(product => {
										// Crear una copia del producto sin el ID del vendedor
										const { sellerId, ...safeProduct } = product;
										return safeProduct;
									});

									setProducts(safeProducts);
								} else {
									console.log("No products array found in vendor document");
								}
							} else {
								// Si no se encuentra en ninguna colección, usar la información del state
								console.log("Seller not found in any collection, using navigation state");
								setSeller({
									// No incluimos el ID en el objeto seller
									name: sellerInfo.name || "Vendedor",
									img: sellerInfo.img,
									isActive: sellerInfo.isActive,
									starProduct: sellerInfo.starProduct || 0
								});
							}
						}
					}

					// Si no encontramos productos en el array, intentamos buscar en la colección de productos
					if (products.length === 0) {
						console.log("No products found in seller document, trying products collection");

						// Intentar obtener productos de la colección products
						const productsRef = collection(db, 'products');
						const q = query(productsRef, where('sellerId', '==', sellerIdToUse));
						const querySnapshot = await getDocs(q);

						const productsList = [];
						querySnapshot.forEach((doc) => {
							// Extraer datos del producto sin incluir el ID del vendedor
							const productData = doc.data();
							const { sellerId, ...safeProductData } = productData;

							productsList.push({
								id: doc.id,
								...safeProductData
							});
						});

						if (productsList.length > 0) {
							console.log(`Found ${productsList.length} products in products collection`);
							setProducts(productsList);
						} else {
							console.log("No products found in products collection");
						}
					}
				} catch (err) {
					console.log("Error fetching seller and products:", err);
					// Usar la información del state como fallback (sin incluir el ID)
					setSeller({
						// No incluimos el ID en el objeto seller
						name: sellerInfo.name || "Vendedor",
						img: sellerInfo.img,
						isActive: sellerInfo.isActive,
						starProduct: sellerInfo.starProduct || 0
					});
				}
			} catch (err) {
				console.error("Error in fetchSellerData:", err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		// Make sure we have either sellerId from params or some info in sellerInfo
		if (sellerId || (sellerInfo && Object.keys(sellerInfo).length > 0)) {
			fetchSellerData();
		} else {
			setLoading(false);
			setError("No se proporcionó información del vendedor");
		}
	}, [sellerId, sellerInfo]);

	if (loading) {
		return (
			<div className='container'>
				<img src={logo} className='logoicesi' alt='ICESI Logo' />
				<div className="loading">Cargando información del vendedor...</div>
				<Navbar />
			</div>
		);
	}

	if (error) {
		return (
			<div className='container'>
				<img src={logo} className='logoicesi' alt='ICESI Logo' />
				<div className="error">Error: {error}</div>
				<Navbar />
			</div>
		);
	}

	if (!seller) {
		return (
			<div className='container'>
				<img src={logo} className='logoicesi' alt='ICESI Logo' />
				<div className="error">No se encontró información del vendedor</div>
				<Navbar />
			</div>
		);
	}

	return (
		<div className='container'>
			<img src={logo} className='logoicesi' alt='ICESI Logo' />

			{/* No pasamos ningún ID al ProfileBox */}
			<ProfileBox
				name={seller.name}
				status={seller.isActive ? "Activo" : "Inactivo"}
				avatar={seller.img}
				starProduct={seller.starProduct}
				email={seller.email}
				phone={seller.phone}
				description={seller.description}
			/>

			<h2 className="products-title">Productos</h2>

			{products.length > 0 ? (
				<div className='product-grid'>
					{products.map((product, index) => (
						<ProductCard
							key={product.id || index}
							product={product}
							// Asegurarse de que no se pase información del vendedor al ProductCard
							hideSellerId={true}
						/>
					))}
				</div>
			) : (
				<div className="no-products">
					No se encontraron productos para este vendedor.
				</div>
			)}

			<Navbar />
		</div>
	);
};

export default SellerProfile;
