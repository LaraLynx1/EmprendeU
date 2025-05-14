import { Box, Typography, Avatar, Paper } from '@mui/material';
import avatarImage from '../../resources/avatar.png';

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
				width: '90%',
				height: 80,
				borderRadius: 20,
				backgroundColor: backgroundColor,
				marginBottom: 2,
			}}
		>
			<Avatar
						  src={avatarImage}
						  alt='Avatar'
						  sx={{ width: 63, height: 64, cursor: 'pointer', marginRight: 2 }} // Espacio entre el avatar y el nombre
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
