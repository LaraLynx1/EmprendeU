import { Box, Typography, Avatar, Paper } from '@mui/material';

const BannerProfile = ({ variant = 'light' }) => {
	const isLight = variant === 'light';
	const backgroundColor = isLight ? '#fff' : '#2A4555';
	const nameColor = isLight ? '#E20435' : '#fff';

	return (
		<Paper
			elevation={3}
			sx={{
				display: 'flex',
				alignItems: 'center',
				padding: 1.5,
				width: 345,
				height: 50,
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
					Jhon Doe
				</Typography>
				<Typography
					variant='body2'
					sx={{ color: 'gray', marginTop: 0.5 }} // Espacio entre el nombre y el código
				>
					A0072114
				</Typography>
			</Box>
		</Paper>
	);
};

export default BannerProfile;
