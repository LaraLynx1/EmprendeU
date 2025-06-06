import React, { useState } from 'react';
import { Box, IconButton, Avatar, useMediaQuery, useTheme } from '@mui/material';
import { Menu } from '@mui/icons-material';
import sellerProfile from '../../utils/dataproductos';
import ProfileBox from '../../components/profile-box1/profile-box1';
import ProductCard from '../../components/carta-producto/carta-producto';
import Navbar from '../../components/navbar/navbar';
import Sidebar from '../../components/SideBar/Sidebar';
import WhiteLogo from '../../resources/logo icesi white.png';
import Avatar1 from '../../resources/Avatar1.png';
import { useNavigate } from 'react-router-dom';

import './SellerProfile.css';

const SellerProfile = () => {
  const navigate = useNavigate();
  const { name, id, status, avatar, products } = sellerProfile;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg')); // desktop arriba de lg
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg')); // tablet entre sm y lg

  const getGridColumns = () => {
    if (isDesktop) return 'repeat(4, 1fr)';
    if (isTablet) return 'repeat(2, 1fr)';
    return '1fr'; // móvil 1 columna
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
        paddingBottom: isDesktop ? 2 : '80px',
      }}
    >
      {/* Header: visible siempre */}
      <Box
        sx={{
          width: '100%',
          px: 4,
          py: 2,
          backgroundColor: '#10263C',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* botón menú hamburguesa siempre visible */}
          <IconButton onClick={() => setSidebarOpen(true)} sx={{ color: 'white' }}>
            <Menu />
          </IconButton>

          {/* logo */}
          <img src={WhiteLogo} alt="Logo" style={{ width: 130 }} />
        </Box>

        {/* avatar clickeable */}
        <Avatar
          src={Avatar1}
          alt="Avatar"
          sx={{
            width: 64,
            height: 64,
            cursor: 'pointer',
            border: '2px solid white',
          }}
          onClick={() => navigate('/perfil-personal')}
        />
      </Box>

      {/* Sidebar: solo visible en desktop */}
      {isDesktop && <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />}

      {/* Contenido principal */}
      <Box
        sx={{
          flexGrow: 1,
          px: isDesktop ? 4 : 2,
          py: 3,
          backgroundColor: '#10263C',
          display: 'flex',
          flexDirection: isDesktop ? 'row' : 'column',
          alignItems: 'flex-start',
          gap: isDesktop ? 4 : 2,
        }}
      >
        {/* ProfileBox grande solo en desktop */}
        {isDesktop && (
          <Box sx={{ flexShrink: 0 }}>
            <ProfileBox variant="large" name={name} id={id} status={status} avatar={avatar} />
          </Box>
        )}

        {/* ProfileBox pequeño solo en mobile/tablet */}
        {!isDesktop && (
          <ProfileBox
            name={name}
            id={id}
            status={status}
            avatar={avatar}
            phoneNumber={'3012073449'}
          />
        )}

        {/* Grid de productos */}
        <Box
          className="product-grid"
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: getGridColumns(),
            gap: 2,
            mt: isDesktop ? 0 : 3,
          }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Box>
      </Box>

      {/* Navbar visible solo en móvil/tablet, oculto en desktop */}
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
            backgroundColor: 'white',
            borderTop: '1px solid #ddd',
          }}
        >
          <Navbar />
        </Box>
      )}
    </Box>
  );
};

export default SellerProfile;
