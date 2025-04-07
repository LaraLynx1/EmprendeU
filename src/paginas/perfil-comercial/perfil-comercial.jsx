import React from 'react';
import perfilvendedor from '../../recursos/dataproductos';
import ProfileBox from '../../components/profile-box1/profile-box1';
import ProductCard from '../../components/carta-producto/carta-producto';
import Navbar from '../../components/navbar/navbar';
import logo from '../../recursos/logo icesi blue.png';
import './perfil-comercial.css';

const PerfilComercial = () => {
	const { name, id, status, avatar, products } = perfilvendedor;

	return (
		<div className='container'>
			<img src={logo} className='logoicesi' />

			<ProfileBox name={name} id={id} status={status} avatar={avatar} />

			<div className='product-grid'>
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>

			<Navbar />
		</div>
	);
};

export default PerfilComercial;
