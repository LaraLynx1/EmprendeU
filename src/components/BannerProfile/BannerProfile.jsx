import { Box, Typography, Avatar, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';
import avatarImage from '../../resources/avatar 1.png';

const BannerProfile = ({ variant = 'light' }) => {
	const navegate = useNavigate();
	const [userData, setUserData] = useState(null);
	const isLight = variant === 'light';
	const isLarge = variant === 'large';
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

	if (isLarge) {
		return (
			<Paper
				elevation={4}
				sx={{
					width: 520,
					height: 600,
					borderRadius: 4,
					overflow: 'hidden',
					position: 'relative',
					backgroundColor: '#f0f0f0',
					backgroundImage: `url(${userData?.photoURL || avatarImage})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-end',
				}}
			>
				<Box
					sx={{
						width: '100%',
						background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0,0,0,0))',
						paddingY: 1.5,
						paddingX: 1.5,
						borderBottomLeftRadius: 4,
						borderBottomRightRadius: 4,
					}}
				>
					<Typography
						variant='h6'
						fontWeight='bold'
						sx={{
							color: '#fff',
							fontSize: '1.1rem',
							lineHeight: 1.2,
						}}
					>
						{userData ? userData.name || 'Usuario' : '...'}
					</Typography>
					<Typography
						variant='caption'
						sx={{
							color: '#fff',
							opacity: 0.9,
						}}
					>
						{userData?.code || ''}
					</Typography>
				</Box>
			</Paper>
		);
	}

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
