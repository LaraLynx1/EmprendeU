import { Stack, Avatar, Typography, Box, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const CardSellers = ({ img, name, isActive, isFavorite, starProduct, onToggleFavorite, onClick }) => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // md = 900px

	return (
		<Box
			onClick={onClick}
			sx={{
				backgroundColor: '#2A4555',
				borderRadius: 5,
				width: isDesktop ? '90%' : '100%',
				height: isDesktop ? 102 : 70,
				padding: isDesktop ? 2 : 1,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				marginBottom: isDesktop ? 0 : 2,
				cursor: 'pointer',
			}}
		>
			<Stack direction='row' alignItems='center' spacing={2}>
				<Avatar
					src={img}
					sx={{
						width: isDesktop ? 70 : 55,
						height: isDesktop ? 70 : 55,
					}}
				/>
				<Stack sx={{ width: isDesktop ? 250 : 150 }}>
					<Typography
						color='white'
						fontWeight='bold'
						variant={isDesktop ? 'h6' : 'subtitle1'}
					>
						{name}
					</Typography>
					<Typography
						color='white'
						variant='body2'
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 0.5,
						}}
					>
						<StarBorderIcon fontSize='small' />
						{starProduct}
					</Typography>
				</Stack>
			</Stack>

			{/* Zona de estado + icono */}
			<Stack direction='row' alignItems='center' spacing={2}>
				<Stack direction='row' alignItems='center' spacing={1}>
					<Box
						sx={{
							width: 10,
							height: 10,
							borderRadius: '50%',
							backgroundColor: isActive ? 'lightgreen' : 'orange',
						}}
					/>
					<Typography
						color='white'
						fontSize={isDesktop ? '1rem' : '0.9rem'}
						variant='body2'
					>
						{isActive ? 'Activo' : 'Inactivo'}
					</Typography>
				</Stack>

				<IconButton
					onClick={(e) => {
						e.stopPropagation(); // Evita que el click también dispare el onClick de la tarjeta
						onToggleFavorite();
					}}
					sx={{ color: 'white' }}
				>
					{isFavorite ? <StarIcon /> : <StarBorderIcon />}
				</IconButton>
			</Stack>
		</Box>
	);
};

export default CardSellers;
