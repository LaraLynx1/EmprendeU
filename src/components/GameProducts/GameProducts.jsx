import React, { useState } from 'react';
import './GameProducts.css';

const GameProducts = ({ isOpen, onClose }) => {
	if (!isOpen) return null;
	return (
		<div className='modal-overlay1'>
			<div className='modal-content1'>
				<button className='close-btn1' onClick={onClose}>
					×
				</button>

				<h2>Tus productos con descuento</h2>

				<div className='Container-gamePopup1'>
					<label className='tittle1'>Aregar producto</label>
					<select id='discount-selector1' name='discount-selector'>
						<option value=''>Selecciona un producto</option>
						<option value='producto1'>Brownie de Milo</option>
						<option value='producto2'>Galleta Red Velvet</option>
						<option value='producto3'>Trufa de Café</option>
					</select>
					<select id='discount-selector1' name='discount-selector'>
						<option value=''>¿Cuánto descuento?</option>
						<option value='producto1'>10%</option>
						<option value='producto2'>15%</option>
						<option value='producto3'>25%</option>
					</select>
				</div>

				<div className='discount-list-placeholder1'></div>
				<div className='Container-gamePopup1'>
					<label className='tittle1'>Quitar producto</label>
					<select id='discount-selector2' name='discount-selector'>
						<option value=''>Selecciona un producto</option>
						<option value='producto1'>Brownie de Milo</option>
						<option value='producto2'>Galleta Red Velvet</option>
						<option value='producto3'>Trufa de Café</option>
					</select>
				</div>
				<button className='create-btnx' onClick={onClose}>
					Guardar
				</button>
			</div>
		</div>
	);
};

export default GameProducts;
