import {
  Box, Avatar, useMediaQuery, Container, IconButton, Drawer, List, ListItemButton, ListItemText
} from '@mui/material';
import { useTheme } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import WhiteLogo from '../../resources/logo icesi white.png';
import BannerProfile from '../../components/BannerProfile/BannerProfile.jsx';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import bannerGame2 from '../../resources/bannerGame2.png';
import CategoriesList from '../../components/CategoriesList/CategoriesList.jsx';
import Navbar from '../../components/navbar/navbar';
import avatarImage from '../../resources/Avatar1.png';
import { ChevronLeft, ChevronRight, Menu } from '@mui/icons-material';
import { useState } from 'react';
import Sidebar from '../../components/SideBar/Sidebar.jsx';
import Game from '../../resources/Game.png';

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        paddingBottom: { xs: '80px', md: 2 },
      }}
    >
      <Container
        maxWidth="100%"
        sx={{
          width: '100%',
          px: { xs: 2, md: 4 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {isDesktop && (
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

            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              flex: 1,
              justifyContent: 'center',
              px: 4,
            }}>
              <SearchBar />
            </Box>

            <Avatar
              src={avatarImage}
              alt='Avatar'
              sx={{ width: 63, height: 64, cursor: 'pointer' }}
              onClick={() => navigate('/perfil-personal')}
            />
          </Box>
        )}

        {isDesktop &&
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />}

        {!isDesktop && (
          <Box sx={{
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            my: 2
          }}>
            <Box sx={{ mb: 2 }}>
              <img src={WhiteLogo} alt='Logo' style={{ width: 112 }} />
            </Box>

            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
              onClick={() => navigate('/perfil-personal')}>
              <BannerProfile variant='light' />
            </Box>

            <Box sx={{ width: '100%' }}>
              <SearchBar />
            </Box>
          </Box>
        )}

        {/* Imagen del banner condicional según tamaño */}
        <Box
          sx={{
            width: '100%',
            overflow: 'hidden',
            cursor: 'pointer',
            borderRadius: '20px',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 2,
            height: isDesktop ? 300 : 150
          }}
          onClick={() => navigate('/game')}
        >
          {isDesktop ? (
            <Box
              component="img"
              src={bannerGame2}
              alt="Banner Desktop"
              sx={{
                width: '90%',
                height: '90%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
            />
          ) : (
            <Box
              component="img"
              src={Game}
              alt="Banner Mobile"
              sx={{
                width: '95%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
                borderRadius: '20px',
              }}
            />
          )}
        </Box>

        <Box sx={{
          width: '90%',
          position: 'relative',
          mb: 4,
          flex: 1,
          display: 'flex',
          alignItems: 'center',
        }}>
          {isDesktop && (
            <>
              <IconButton
                sx={{
                  position: 'absolute',
                  left: -56,
                  color: 'white',
                  backgroundColor: 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  document.getElementById('categoriesScrollContainer').scrollBy({ left: -200, behavior: 'smooth' });
                }}
              >
                <ChevronLeft sx={{ fontSize: 32 }} />
              </IconButton>

              <IconButton
                sx={{
                  position: 'absolute',
                  right: -56,
                  color: 'white',
                  backgroundColor: 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  document.getElementById('categoriesScrollContainer').scrollBy({ left: 200, behavior: 'smooth' });
                }}
              >
                <ChevronRight sx={{ fontSize: 32 }} />
              </IconButton>
            </>
          )}

          <Box
            id="categoriesScrollContainer"
            sx={{
              width: '100%',
              overflow: isDesktop ? 'auto hidden' : 'hidden auto',
              display: 'flex',
              gap: 3,
              px: isDesktop ? 0 : 1,
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
              flexDirection: 'row',
              flexWrap: isDesktop ? 'nowrap' : 'wrap',
              maxHeight: isDesktop ? 'none' : 'unset',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/categories')}
          >
            <CategoriesList isDesktop={isDesktop} />
          </Box>
        </Box>
      </Container>

      {!isDesktop && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            zIndex: 10,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Navbar />
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
