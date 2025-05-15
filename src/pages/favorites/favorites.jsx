import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import CardSellers from '../../components/CardSellers/CardSellers';
import BlueLogo from '../../resources/logo icesi blue.png';
import BannerProfile from '../../components/BannerProfile/BannerProfile';
import Navbar from '../../components/navbar/navbar';

const Favorites = () => {
  const [sellers, setSellers] = useState(initialData);
  const navigate = useNavigate();

  const toggleFavorite = (id) => {
    const updated = sellers.map((seller) =>
      seller.id === id ? { ...seller, isFavorite: !seller.isFavorite } : seller
    );
    setSellers(updated);
  };

  const favoriteSellers = sellers.filter((seller) => seller.isFavorite);

  return (
    <Box
      sx={{
        paddingBlock: 2,
        width: '100%',
        height: '100vh',
        backgroundColor: '#FDFBF7C',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ flexShrink: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 3 }}>
            <img src={BlueLogo} alt='Logo' style={{ width: 120 }} />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <BannerProfile variant='dark' />
          </Box>
        </Box>

        <Box
          sx={{
            maxWidth: 360,
            textAlign: 'left',
            paddingLeft: 2.5,
          }}
        >
          <Typography color='#E20435' fontWeight='bold' fontSize={18} marginBottom={2}>
            Your Favorites
          </Typography>
        </Box>

        <Box
          sx={{
            maxWidth: 370,
            maxHeight: 'calc(100vh - 200px)',
            overflowY: 'auto',
            paddingX: 2,
            paddingBottom: 2,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {favoriteSellers.map((item) => (
            <Box
              key={item.id}
              component='button'
              onClick={() => navigate('/seller-profile')}
              sx={{
                all: 'unset',
                width: '100%',
                cursor: 'pointer',
                marginBottom: -0.5,
              }}
            >
              <CardSellers
                img={item.img}
                isActive={item.isActive}
                isFavorite={item.isFavorite}
                name={item.name}
                starProduct={item.starProduct}
                onToggleFavorite={() => toggleFavorite(item.id)}
              />
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Navbar />
      </Box>
    </Box>
  );
};

export default Favorites;