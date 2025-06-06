import { Box, useMediaQuery, useTheme, IconButton, Avatar } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sellersData as initialData } from '../../utils/SellersData.js';
import { Menu } from '@mui/icons-material';
import CardSellers from '../../components/CardSellers/CardSellers.jsx';
import WhiteLogo from '../../resources/logo icesi white.png';
import Category from '../../components/Category/Category.jsx';
import BannerProfile from '../../components/BannerProfile/BannerProfile.jsx';
import Navbar from '../../components/navbar/navbar.jsx';
import Sidebar from '../../components/SideBar/Sidebar.jsx';
import avatar from '../../resources/Avatar1.png';

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
        <Box
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton onClick={() => setSidebarOpen(true)} sx={{ color: 'white' }}>
                <Menu />
              </IconButton>
              <img src={WhiteLogo} alt="Logo" style={{ width: 130 }} />
            </Box>

            <Avatar
              src={avatar}
              alt="Avatar"
              sx={{
                width: 64,
                height: 64,
                cursor: 'pointer',
                border: '2px solid white',
              }}
            />
          </Box>
        </Box>
      )}

      {/* Sidebar para desktop */}
      {isDesktop && <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />}

      {/* Contenido principal */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: isDesktop ? 'row' : 'column',
          alignItems: isDesktop ? 'stretch' : 'unset',
          ...(isDesktop && {
            paddingLeft: '280px', // Ancho del sidebar
            justifyContent: 'flex-start',
            gap: 2,
            px: 4,
            mt: 2,
            height: 'calc(100vh - 120px)', // Ajusta según el header si es necesario
          }),
        }}
      >
        {/* Versión mobile */}
        {!isDesktop && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 3 }}>
              <img src={WhiteLogo} alt="Logo" style={{ width: 120 }} />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <BannerProfile variant="light" />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
              <Category />
            </Box>
          </>
        )}

        {/* Categoría en desktop (lado izquierdo) */}
        {isDesktop && (
          <Box
            sx={{
              flex: 1,
              minWidth: 300,
              paddingLeft: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end', // Para que Category quede al fondo
            }}
          >
            <Category variant="large" />
          </Box>
        )}

        {/* Contenedor de CardSellers - lado derecho */}
        <Box
          sx={{
            flex: 2,
            maxWidth: 'none',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              width: '100%',
              flexGrow: 1,
              overflowY: 'auto',
              paddingX: isDesktop ? 0 : 2,
              paddingBottom: 2,
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
              display: 'grid',
              gap: '16px',
            }}
          >
            {sellers.map((item) => (
              <Box
                key={item.id}
                component="button"
                onClick={() => navigate('/seller-profile')}
                sx={{
                  all: 'unset',
                  width: '100%',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: isDesktop ? 'none' : '400px',
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
