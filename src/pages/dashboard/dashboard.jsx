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
import avatarImage from '../../resources/avatar.png';
import Sidebar from '../../components/SideBar/Sidebar.jsx';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box className="dashboard-container">
      {/* Header Desktop */}
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

            <Avatar
              src={avatarImage}
              alt="Avatar"
              className="profile-avatar"
              onClick={() => navigate('/perfil-personal')}
            />
          </Box>
        </Container>
      )}

      {isDesktop && <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />}

      {/* Header Mobile */}
      {!isDesktop && (
        <Box className="mobile-header">
          <Box className="mobile-logo-container">
            <img src={WhiteLogo} alt="Logo" className="mobile-logo" />
          </Box>

          <Box className="mobile-banner-container">
            <BannerProfile variant="light" />
          </Box>
        </Box>
      )}

      {/* Contenido principal */}
      <Box className={isDesktop ? "main-content-desktop" : "main-content-mobile"}>
        {isDesktop && <Box className="left-spacer" />}

        <Box className="right-side-wrapper">
          <Box className="right-side-content">
            <Box 
              className="game-banner"
              onClick={() => navigate('/game')}
            >
              <img
                src={bannerGame}
                alt="Banner Game"
                className="banner-image"
              />
            </Box>

            <Box className={`categories-container ${isDesktop ? 'force-three-columns' : ''}`}>
              <CategoriesList />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Navbar Mobile */}
      {!isDesktop && (
        <Box className="mobile-navbar-container">
          <Navbar />
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
