import React from 'react';
import './CouponModal.css';

const CouponModal = ({ isOpen, onClose, titulo, autor, codigo }) => {
	if (!isOpen) return null;

	return (
		<div className='modal-overlay' onClick={onClose}>
			<div className='modal-content' onClick={(e) => e.stopPropagation()}>
				<p className='modal-title'>{titulo}</p>
				<p className='modal-code'>{codigo}</p>
				<div className='modal-footer'>
					<p className='modal-author'>{autor}</p>
				</div>
			</div>
		</div>
	);
};

export default CouponModal;
