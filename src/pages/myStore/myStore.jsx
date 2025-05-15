import React, { useState } from 'react';
import {
  useTheme,
  useMediaQuery,
  IconButton,
  Box,
  Avatar,
} from '@mui/material';
import sellerProfile from '../../utils/dataproductos';
import ProfileBoxC from '../../components/profile-box-C/profile-box-C';
import ProductCard from '../../components/carta-producto/carta-producto';
import Navbar from '../../components/navbar/navbar';
import CreateProductModal from '../../components/CreateProductModal/CreateProductModal';
import GameProducts from '../../components/GameProducts/GameProducts';

import logo from '../../resources/logo icesi blue.png';
import arrowback from '../../resources/arrowback.png';
import edit from '../../resources/edit.png';
import plus from '../../resources/plus.png';
import coupon from '../../resources/coupon.png';
import avatarImage from '../../resources/Avatar1.png';

import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../../components/SideBar/Sidebar';

import './myStore.css';

const MyStore = () => {
  const { name, id, status, avatar, products } = sellerProfile;
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isGameList, setIsGameList] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg')); // lg: 1024px+

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const handleBackClick = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      console.log('Volver a pantalla anterior');
    }
  };

  return (
    <Box className="container">
      {/* Header Desktop */}
      {isDesktop && (
        <Box
          component="header"
          sx={{
            width: '100%',
            px: 4,
            py: 2,
            backgroundColor: '#FDFBF7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              onClick={() => setSidebarOpen(true)}
              sx={{ color: '#2A4555' }}
              aria-label="Abrir menú"
            >
              <MenuIcon />
            </IconButton>
            <img src={logo} alt="Logo ICESI" style={{ width: 130 }} />
          </Box>

          <Avatar
            src={avatarImage}
            alt={`${name} avatar`}
            sx={{
              width: 64,
              height: 64,
              cursor: 'pointer',
              border: '2px solid white',
            }}
            onClick={() => console.log('Ir a perfil personal')}
          />
        </Box>
      )}

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile logo arriba */}
      {!isDesktop && (
        <Box sx={{ px: 2, py: 2 }}>
          <img src={logo} alt="ICESI Logo" style={{ width: 130 }} />
        </Box>
      )}

      {/* Layout general */}
      <Box
        sx={{
          display: isDesktop ? 'flex' : 'block',
          width: '100%',
          px: isDesktop ? 4 : 2,
          gap: 4,
          boxSizing: 'border-box',
        }}
      >
        {/* Izquierda: Profile */}
        {isDesktop && (
          <Box sx={{ flex: 1, maxWidth: '300px' }}>
            <ProfileBoxC name={name} id={id} status={status} avatar={avatar} />
          </Box>
        )}

        {/* Derecha: Contenido principal */}
        <Box sx={{ flex: 3, width: '100%' }}>
          {/* Header secundario */}
          <Box
            className="store-header"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              mb: 2,
            }}
          >
            {/* Flecha + Título */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <img
                src={arrowback}
                alt="Back"
                className="header-icon"
                onClick={handleBackClick}
                style={{ cursor: 'pointer' }}
              />
              <h2 className="store-title">
                <em>My store:</em>
              </h2>
            </Box>

            {/* Íconos */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <img
                src={coupon}
                alt="Game"
                className="header-icon"
                onClick={() => setIsGameList(true)}
              />
              {isEditing ? (
                <img
                  src={plus}
                  alt="Add Product"
                  className="header-icon"
                  onClick={() => setIsCreating(true)}
                />
              ) : (
                <img
                  src={edit}
                  alt="Edit"
                  className="header-icon"
                  onClick={toggleEditMode}
                />
              )}
            </Box>
          </Box>

          {/* Grid productos */}
          <Box
            className="product-grid"
            sx={{
              display: 'grid',
              gridTemplateColumns: isDesktop ? 'repeat(4, 1fr)' : 'repeat(1, 1fr)',
              gap: 2,
              width: '100%',
            }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} isEditing={isEditing} />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Navbar móvil */}
      {!isDesktop && <Navbar />}

      <CreateProductModal isOpen={isCreating} onClose={() => setIsCreating(false)} />
      <GameProducts isOpen={isGameList} onClose={() => setIsGameList(false)} />
    </Box>
  );
};

export default MyStore;
