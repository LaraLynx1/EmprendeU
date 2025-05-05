import { Card, Box, Typography } from '@mui/material';

const Category = () => {
  return (
    <Card
      sx={{
        width: 345,
        height: 180,
        borderRadius: 5,
        overflow: 'hidden',
        position: 'relative',
        marginBottom: 3,
      }}
    >
      <Box
        component="img"
        src="https://i.pinimg.com/736x/24/c4/2b/24c42ba06b3253df1bc6cc4f77eacd4a.jpg"
        alt="Cookies"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, rgba(16, 38, 60, 0.00) 30.3%, #10263C 100%)',
          zIndex: 2,
        }}
      />

      <Typography
        sx={{
          position: 'absolute',
          bottom: 5,
          left: 16,
          zIndex: 3,
          color: 'white',
          fontWeight: 'bold',
        }}
        variant="h6"
      >
        Galletas
      </Typography>
    </Card>
  );
};

export default Category;
