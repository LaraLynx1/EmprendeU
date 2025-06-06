import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import ProfileBoxB from '../../components/ProfileBoxB/ProfileBoxB';
import BlueLogo from '../../resources/logo icesi blue.png';
import avatar from '../../resources/avatar.png';
import { Box, Snackbar, Alert } from '@mui/material';

import { collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

import './Validate-cupon.css';

const ValidateCupon = () => {
	const [inputValue, setInputValue] = useState('');
	const [message, setMessage] = useState('');
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarSeverity, setSnackbarSeverity] = useState('info');

	const handleValidate = async () => {
		if (!inputValue.trim()) return;

		try {
			const usersRef = collection(db, 'users');
			const usersSnapshot = await getDocs(usersRef);

			let found = false;

			for (const userDoc of usersSnapshot.docs) {
				const userCouponsRef = collection(db, 'users', userDoc.id, 'coupons');
				const couponQuery = query(userCouponsRef, where('code', '==', inputValue.trim()));
				const couponSnapshot = await getDocs(couponQuery);

				if (!couponSnapshot.empty) {
					const couponDoc = couponSnapshot.docs[0];
					await deleteDoc(doc(db, 'users', userDoc.id, 'coupons', couponDoc.id));

					setMessage('¡Cupón válido y eliminado exitosamente!');
					setSnackbarSeverity('success');
					found = true;
					break;
				}
			}

			if (!found) {
				setMessage('Cupón no válido o ya fue utilizado.');
				setSnackbarSeverity('error');
			}
		} catch (error) {
			console.error('Error al validar el cupón:', error);
			setMessage('Ocurrió un error al validar el cupón.');
			setSnackbarSeverity('error');
		} finally {
			setOpenSnackbar(true);
			setInputValue('');
		}
	};

	return (
		<>
			<Box className='profile-container'>
				<img src={BlueLogo} alt='Logo' className='logo-mobile' />
				<ProfileBoxB avatar={avatar} name='Ana Gomez' id='A0072214' logo={BlueLogo} />

				<div className='cupon-validator'>
					<h2 className='cupon-title-validate'>Escribe aquí el cupón para validarlo</h2>
					<input
						type='text'
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						placeholder='Ej. 123-456'
						className='cupon-input-validate'
					/>
					<button className='validate-btn' onClick={handleValidate}>
						Validar cupón
					</button>
				</div>

				<Navbar />
			</Box>

			<Snackbar
				open={openSnackbar}
				autoHideDuration={3000}
				onClose={() => setOpenSnackbar(false)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
					{message}
				</Alert>
			</Snackbar>
		</>
	);
};

export default ValidateCupon;
