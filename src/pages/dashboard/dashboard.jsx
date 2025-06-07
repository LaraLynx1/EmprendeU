import React, { useState } from 'react';
import { Box, Avatar, useMediaQuery, Container, IconButton } from '@mui/material';
import { useTheme } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { Menu } from '@mui/icons-material';
import WhiteLogo from '../../resources/logo icesi white.png';
import BannerProfile from '../../components/BannerProfile/BannerProfile.jsx';
import bannerGame from '../../resources/Game.png';
import CategoriesList from '../../components/CategoriesList/CategoriesList.jsx';
import Navbar from '../../components/navbar/navbar';
import Sidebar from '../../components/SideBar/Sidebar.jsx';
import './dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); 

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box className="dashboard-container">
      {isDesktop && (
        <Container className="desktop-header-container">
          <Box className="desktop-header">
            <IconButton 
              className="menu-button"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu />
            </IconButton>

            <img src={WhiteLogo} alt="Logo" className="desktop-logo" />

            <Box className="header-spacer" />
            <BannerProfile variant='large'/>
          </Box>
        </Container>
      )}

      {isDesktop && <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />}

      {!isDesktop && (
        <Box className="mobile-header">
          <Box className="mobile-logo-container">
            <img src={WhiteLogo} alt="Logo" className="mobile-logo" />
          </Box>

          <Box className="mobile-banner-container">
            <BannerProfile variant="light"/>
          </Box>
        </Box>
      )}

      <Box
        className={isDesktop ? "main-content-desktop" : "main-content-mobile"}
        sx={{
          display: 'flex',
          flexDirection: isDesktop ? 'row' : 'column',
          justifyContent: 'center',
          alignItems: isDesktop ? 'stretch' : 'center',
          width: '100%',
          maxWidth: '100vw',
          margin: 0,
          padding: isDesktop ? 0 : '0 10px',
          boxSizing: 'border-box',
        }}
      >
        {isDesktop && <Box className="left-spacer" sx={{ flex: 1, border: '1px solid red' }} />}

        <Box
          className="right-side-wrapper"
          sx={{
            flex: isDesktop ? '0 0 50%' : '100%',
            maxWidth: isDesktop ? '50%' : '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box
            className="right-side-content"
            sx={{
            }}
          >
            <Box
              className="game-banner"
              onClick={() => navigate('/game')}
              sx={{ cursor: 'pointer' }}
            >
              <img
                src={bannerGame}
                alt="Banner Game"
                className="banner-image"
              />
            </Box>

            <Box className={`categories-container ${!isDesktop ? 'mobile-categories-container' : ''}`}>
              <CategoriesList className="categories-grid" />
            </Box>
          </Box>
        </Box>
      </Box>

      {!isDesktop && (
        <Box className="mobile-navbar-container">
          <Navbar />
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
