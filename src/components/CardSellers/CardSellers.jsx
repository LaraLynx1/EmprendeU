// SIN useState aquí
import { Stack, Avatar, Typography, Box, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const CardSellers = ({ img, name, isActive, isFavorite, starProduct, onToggleFavorite }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#2A4555',
        borderRadius: 5,
        maxWidth: 365,
        height: 70,
        padding: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 1.5,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="start" spacing={2}>
        <Avatar src={img} sx={{ width: 55, height: 55 }} />
        <Stack sx={{ width: 150, height: 60, alignItems: 'flex-start' }}>
          <Typography color="white" fontWeight="bold" variant="subtitle1">
            {name}
          </Typography>
          <Typography
            color="White"
            variant="body1"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}
          >
            <StarBorderIcon />
            {starProduct}
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" alignItems="center" spacing={1}>
        <Stack
          sx={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: isActive ? 'lightgreen' : 'orange',
          }}
        />
        <Typography color="white" fontSize="0.9rem" variant='body2'>
          {isActive ? 'Activo' : 'Inactivo'}
        </Typography>
      </Stack>

      <IconButton onClick={onToggleFavorite}>
        {isFavorite ? <StarIcon sx={{ color: 'white' }} /> : <StarBorderIcon sx={{ color: 'white' }} />}
      </IconButton>
    </Box>
  );
};

export default CardSellers;
