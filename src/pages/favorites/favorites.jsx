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
import BannerProfile from '../../components/BannerProfile/BannerProfile';
import Navbar from '../../components/navbar/navbar';
import { Menu } from '@mui/icons-material';
import avatarImage from '../../resources/Avatar1.png';
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
        backgroundColor: '#FDFBF7',
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

            <Box sx={{ flex: 1 }} />

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

      {/* Contenido principal */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: isDesktop ? 'row' : 'column',  
          justifyContent: 'center',
          alignItems: isDesktop ? 'flex-end' : 'center', 
          marginTop: isDesktop ? 4 : 0,
          px: 2,
          gap: 4,
        }}
      >
        {/* En móvil, BannerProfile arriba */}
        {!isDesktop && (
          <Box sx={{ width: '100%', mb: 3 }}>
            <BannerProfile variant="dark" />
          </Box>
        )}

        {/* BannerProfile a la izquierda en desktop */}
        {isDesktop && (
          <Box sx={{ width: '40%', minWidth: 250, paddingLeft: 3 }}>
            <BannerProfile variant="large" />
          </Box>
        )}

        {/* Contenedor de favoritos */}
        <Box
          sx={{
            width: isDesktop ? '70%' : '100%',
            maxWidth: !isDesktop ? '360px' : 'none',
          }}
        >
          {/* Título */}
          <Box sx={{ textAlign: 'left', mb: 3 }}>
            <Typography
              color="#E20435"
              fontWeight="bold"
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
                component="button"
                
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
  onClick={() => navigate('/seller-profile')} 
  onToggleFavorite={() => toggleFavorite(item.id)}
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
