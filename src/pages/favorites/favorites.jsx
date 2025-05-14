import { useState } from 'react';
import { 
  Box, 
  Typography, 
  useMediaQuery, 
  useTheme,
  Avatar,
  IconButton,
  Container
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { sellersData as initialData } from '../../utils/SellersData';
import CardSellers from '../../components/CardSellers/CardSellers';
import BlueLogo from '../../resources/logo icesi blue.png';
import WhiteLogo from '../../resources/logo icesi white.png';
import BannerProfile from '../../components/BannerProfile/BannerProfile';
import Navbar from '../../components/navbar/navbar';
import { Menu } from '@mui/icons-material';
import avatarImage from '../../resources/avatar.png';
import Sidebar from '../../components/SideBar/Sidebar.jsx';

const Favorites = () => {
  const [sellers, setSellers] = useState(initialData);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

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
        width: '100%',
        minHeight: '100vh',
        backgroundColor: isDesktop ? '#FDFBF7' : '#FDFBF7',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
        paddingBottom: { xs: '80px', md: 2 },
      }}
    >
      {/* Header para desktop */}
      {isDesktop && (
        <Container
          maxWidth="100%"
          sx={{
            width: '100%',
            px: 4,
            py: 2,
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <IconButton 
              onClick={() => setSidebarOpen(true)} 
              sx={{ color: '#2A4555' }}
            >
              <Menu />
            </IconButton>

            <img src={BlueLogo} alt='Logo' style={{ width: 130 }} />

            <Box sx={{ flex: 1 }} /> {/* Espacio flexible */}

            <Avatar
              src={avatarImage}
              alt='Avatar'
              sx={{ 
                width: 64, 
                height: 64, 
                cursor: 'pointer',
                border: '2px solid white'
              }}
              onClick={() => navigate('/perfil-personal')}
            />
          </Box>
        </Container>
      )}

      {/* Sidebar para desktop */}
      {isDesktop && (
        <Sidebar 
          open={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
      )}

      {/* Contenido principal - Layout modificado para desktop */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isDesktop ? 'flex-end' : 'center',
          ...(isDesktop ? {
        
            marginTop: 4
          } : {})
        }}
      >
        {/* Versión mobile - Manteniendo tu estructura original */}
        {!isDesktop && (
          <>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              my: 3 
            }}>
              <img src={BlueLogo} alt='Logo' style={{ width: 120 }} />
            </Box>

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              width: '90%', 
              mb: 2 
            }}>
              <BannerProfile variant='dark' />
            </Box>
          </>
        )}

        {/* Contenedor del 70% para desktop */}
        <Box
          sx={{
            width: isDesktop ? '50%' : '100%',
            maxWidth: !isDesktop ? '360px' : 'none',
          }}
        >
          {/* Título */}
          <Box
            sx={{
              textAlign: 'left',
              mb: 3,
            }}
          >
            <Typography 
              color={isDesktop ? '#E20435' : '#E20435'} 
              fontWeight='bold' 
              fontSize={isDesktop ? 24 : 18}
            >
              Your Favorites
            </Typography>
          </Box>

          {/* Lista de favoritos - UNA SOLA COLUMNA */}
          <Box
            sx={{
              width: '100%',
              maxHeight: !isDesktop ? 'calc(100vh - 200px)' : 'calc(100vh - 220px)',
              overflowY: 'auto',
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
                  marginBottom: !isDesktop ? -0.5 : 2,
                }}
              >
                <CardSellers
                  img={item.img}
                  isActive={item.isActive}
                  isFavorite={item.isFavorite}
                  name={item.name}
                  starProduct={item.starProduct}
                  onToggleFavorite={() => toggleFavorite(item.id)}
                  variant={isDesktop ? 'light' : 'dark'}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Navbar solo para mobile */}
      {!isDesktop && (
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
      )}
    </Box>
  );
};

export default Favorites;