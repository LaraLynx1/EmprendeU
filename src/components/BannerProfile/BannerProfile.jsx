import { Box, Typography, Avatar, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase'; // Asegúrate de que esta ruta sea correcta
import { auth } from '../../services/firebase'; // Para obtener el uid del usuario autenticado

const BannerProfile = ({ variant = 'light' }) => {
	const [userData, setUserData] = useState(null);
	const isLight = variant === 'light';
	const backgroundColor = isLight ? '#fff' : '#2A4555';
	const nameColor = isLight ? '#E20435' : '#fff';

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const userId = auth.currentUser?.uid; // Obtener el uid del usuario autenticado
				if (!userId) {
					console.error('No user is authenticated');
					return;
				}

				const docRef = doc(db, 'users', userId); // Referencia al documento en Firestore
				const docSnap = await getDoc(docRef);

				if (docSnap.exists()) {
					setUserData(docSnap.data()); // Guardar los datos del usuario en el estado
				} else {
					console.error('No such document!');
				}
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};

		fetchUserData();
	}, []);

	return (
		<Paper
			elevation={3}
			sx={{
				display: 'flex',
				alignItems: 'center',
				padding: 1.5,
				width: 345,
				height: 80,
				borderRadius: 20,
				backgroundColor: backgroundColor,
				marginBottom: 2,
			}}
		>
			<Avatar
				src='https://cdn-icons-png.flaticon.com/512/706/706830.png'
				alt='User'
				sx={{ width: 60, height: 60, marginRight: 2 }}
			/>

			<Box sx={{ textAlign: 'left' }}>
				<Typography variant='h6' fontWeight='bold' sx={{ color: nameColor, lineHeight: 1 }}>
					{userData ? userData.name : 'Loading...'}
				</Typography>
				<Typography variant='body2' sx={{ color: 'gray', marginTop: 0.5 }}>
					{userData ? userData.code : ''}
				</Typography>
			</Box>
		</Paper>
	);
};

export default BannerProfile;
