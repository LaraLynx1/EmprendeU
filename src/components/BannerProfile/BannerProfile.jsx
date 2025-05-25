import { Box, Typography, Avatar, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../services/firebase';
import avatarImage from '../../resources/avatar.png';

const BannerProfile = ({ variant = 'light' }) => {
	const [userData, setUserData] = useState(null);
	const isLight = variant === 'light';
	const backgroundColor = isLight ? '#fff' : '#2A4555';
	const nameColor = isLight ? '#E20435' : '#fff';

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const userId = auth.currentUser?.uid;
				if (!userId) {
					console.log('No user is authenticated');
					return;
				}

				const docRef = doc(db, 'users', userId);
				const docSnap = await getDoc(docRef);

				if (docSnap.exists()) {
					setUserData(docSnap.data());
				} else {
					console.log('No user data found');
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
				width: { xs: '100%', sm: '100%' },
				height: 80,
				borderRadius: 20,
				backgroundColor: backgroundColor,
				marginBottom: 2,
			}}
		>
			<Avatar
				src={userData?.photoURL || avatarImage}
				alt='User'
				sx={{
					width: 60,
					height: 60,
					marginRight: 2,
					cursor: 'pointer',
				}}
			/>

			<Box sx={{ textAlign: 'left' }}>
				<Typography
					variant='h6'
					fontWeight='bold'
					sx={{
						color: nameColor,
						lineHeight: 1,
						fontSize: { xs: '1rem', sm: '1.25rem' },
					}}
				>
					{userData ? userData.name || 'Usuario' : 'Cargando...'}
				</Typography>
				<Typography
					variant='body2'
					sx={{
						color: 'gray',
						marginTop: 0.5,
						fontSize: { xs: '0.75rem', sm: '0.875rem' },
					}}
				>
					{userData ? userData.code || userData.email || '' : ''}
				</Typography>
			</Box>
		</Paper>
	);
};

export default BannerProfile;
