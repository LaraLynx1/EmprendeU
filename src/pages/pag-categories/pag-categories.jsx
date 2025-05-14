import { useState } from 'react';
import { 
  Box, 
  useMediaQuery, 
  useTheme,
  Avatar,
  IconButton,
  Container
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { sellersData as initialData } from '../../utils/SellersData';
import CardSellers from '../../components/CardSellers/CardSellers';
import WhiteLogo from '../../resources/logo icesi white.png';
import BlueLogo from '../../resources/logo icesi blue.png';
import Category from '../../components/Category/Category';
import BannerProfile from '../../components/BannerProfile/BannerProfile';
import Navbar from '../../components/navbar/navbar';
import { Menu } from '@mui/icons-material';
import avatarImage from '../../resources/avatar.png';
import Sidebar from '../../components/SideBar/Sidebar.jsx';

const Categories = () => {
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

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#10263C',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
        paddingBottom: isDesktop ? 2 : '80px',
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
              sx={{ color: 'white' }}
            >
              <Menu />
            </IconButton>

            <img src={WhiteLogo} alt='Logo' style={{ width: 130 }} />

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

      {/* Contenido principal - Layout ajustado al lado derecho */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: isDesktop ? 'row' : 'column',
          ...(isDesktop && {
            paddingLeft: '280px', // Ancho del sidebar
            justifyContent: 'flex-end', // Alinea todo a la derecha
          })
        }}
      >
        {/* Versión mobile */}
        {!isDesktop && (
          <>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              my: 3 
            }}>
              <img src={WhiteLogo} alt='Logo' style={{ width: 120 }} />
            </Box>

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mb: 2,
              width: '90%'
            }}>
              <BannerProfile variant='dark' />
            </Box>

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mb: 2,
              width: '90%'
            }}>
              <Category />
            </Box>
          </>
        )}

        {/* Contenedor de Cardsellers - Alineado a la derecha */}
        <Box
          sx={{
            width: isDesktop ? 'calc(100% - 300px)' : '100%', // Resta el ancho del sidebar + margen
            maxWidth: isDesktop ? '700px' : 'none',
            marginTop: isDesktop ? '20px' : '0'
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxHeight: isDesktop ? 'calc(100vh - 120px)' : 'calc(100vh - 280px)',
              overflowY: 'auto',
              paddingX: isDesktop ? 1 : 2,
              paddingBottom: 2,
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: isDesktop ? 'flex-end' : 'center', // Alinea cards a la derecha
              gap: '16px'
            }}
          >
            {sellers.map((item) => (
              <Box
                key={item.id}
                component='button'
                onClick={() => navigate('/seller-profile')}
                sx={{
                  all: 'unset',
                  width: isDesktop ? '100%' : '100%',
                  maxWidth: '100%',
                  cursor: 'pointer',
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

export default Categories;