import React from 'react';
import './cupon.css';

const Cupon = ({ titulo, autor }) => {
	return (
		<div className='cupon'>
			<p className='cupon-title'>{titulo}</p>
			<p className='cupon-author'>{autor}</p>
		</div>
	);
};

export default Cupon;
