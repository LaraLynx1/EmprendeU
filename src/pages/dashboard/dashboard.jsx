import { Box, Avatar, useMediaQuery, Container, IconButton } from '@mui/material';
import { useTheme } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import WhiteLogo from '../../resources/logo icesi white.png';
import BannerProfile from '../../components/BannerProfile/BannerProfile.jsx';
import bannerGame from '../../resources/Game.png';
import CategoriesList from '../../components/CategoriesList/CategoriesList.jsx';
import Navbar from '../../components/navbar/navbar';
import avatarImage from '../../resources/avatar.png';
import { Menu } from '@mui/icons-material';
import { useState } from 'react';
import Sidebar from '../../components/SideBar/Sidebar.jsx';

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sellers, setSellers] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearchResults = (results) => {
    setSellers(results);
    setShowSearchResults(results.length > 0 || false);
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#10263C',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowX: 'hidden',
        paddingBottom: isDesktop ? 2 : '80px',
      }}
    >
      {isDesktop && (
        <Container
          maxWidth='100%'
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
              my: 3,
            }}
          >
            <IconButton onClick={() => setSidebarOpen(true)} sx={{ color: 'white' }}>
              <Menu />
            </IconButton>

            <img src={WhiteLogo} alt='Logo' style={{ width: 130 }} />

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center',
                px: 4,
              }}
            >
	            </Box>

            <Avatar
              src={avatarImage}
              alt='Avatar'
              sx={{ width: 64, height: 64, cursor: 'pointer', border: '2px solid white' }}
              onClick={() => navigate('/perfil-personal')}
            />
          </Box>
        </Container>
      )}

      {isDesktop && <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />}

      {/* Resultados de búsqueda */}
      {showSearchResults && (
        <Box sx={{ 
          width: '100%', 
          maxWidth: 1200,
          padding: 2,
          backgroundColor: '#0b2239',
          borderRadius: 2,
          marginTop: 2,
          marginBottom: 3
        }}>
          {sellers.map(seller => (
            <Box 
              key={seller.id} 
              sx={{ 
                padding: 2, 
                marginBottom: 2, 
                backgroundColor: '#1a3a5a',
                borderRadius: 1,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#234a6a'
                }
              }}
              onClick={() => navigate(`/seller-profile/${seller.id}`)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar 
                  src={seller.photoURL || avatarImage} 
                  sx={{ width: 56, height: 56, marginRight: 2 }} 
                />
                <Box>
                  <h3 style={{ color: 'white', margin: 0 }}>{seller.name}</h3>
                  <p style={{ color: '#aaa', margin: '4px 0' }}>
                    {seller.products?.length || 0} productos disponibles
                  </p>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {!isDesktop && (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            my: 2,
          }}
        >
          <Box sx={{ my: 3 }}>
            <img src={WhiteLogo} alt='Logo' style={{ width: 120 }} />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 0.5, width: '95%' }}>
            <BannerProfile variant='light' />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', paddingX: 2 }}>
            <SearchBar onSearchResults={handleSearchResults} sx={{ width: '100%' }} />
          </Box>
        </Box>
      )}

      {/* Resto de tu contenido... */}
      {!showSearchResults && (
        <>
          <Box
            sx={{
              width: isDesktop ? '95%' : 385,
              height: isDesktop ? 440 : 190,
              overflow: 'hidden',
              mb: 3,
              cursor: 'pointer',
              borderRadius: isDesktop ? '20px' : 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => navigate('/game')}
          >
            <img
              src={bannerGame}
              alt='Banner Game'
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>

          <Box
            sx={{
              width: '100%',
              maxWidth: isDesktop ? 'none' : '100%',
              overflowX: 'auto',
              whiteSpace: isDesktop ? 'normal' : 'nowrap',
              paddingX: 2,
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              cursor: 'pointer',
              mb: isDesktop ? 4 : 0,
            }}
          >
            <CategoriesList isDesktop={isDesktop} />
          </Box>
        </>
      )}

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

export default Dashboard;