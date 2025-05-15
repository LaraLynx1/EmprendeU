import React, { useState } from 'react';
import { useMediaQuery, useTheme, IconButton, Avatar, Box } from '@mui/material';
import { Menu } from '@mui/icons-material';
import Navbar from '../../components/navbar/navbar';
import BlueLogo from '../../resources/logo icesi blue.png';
import avatar from '../../resources/avatar.png';
import sellerProfile from '../../utils/dataproductos';
import Coupon from '../../components/cupon/cupon';
import ProfileBoxB from '../../components/ProfileBoxB/ProfileBoxB';
import Sidebar from '../../components/SideBar/Sidebar.jsx';
import './coupons.css';

const Coupons = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const coupons = sellerProfile.cupones;

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: isDesktop ? '#FDFBF7' : '#FDFBF7',
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
              <IconButton 
                onClick={() => setSidebarOpen(true)} 
                sx={{ color: '#10263C' }}
              >
                <Menu />
              </IconButton>
              <img src={BlueLogo} alt='Logo' style={{ width: 130 }} />
            </Box>

            <Avatar
              src={avatar}
              alt='Avatar'
              sx={{ 
                width: 64, 
                height: 64, 
                cursor: 'pointer',
                border: '2px solid white'
              }}
            />
          </Box>
        </Box>
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
          ...(isDesktop && {
            paddingLeft: '280px', // Ancho del sidebar
            justifyContent: 'flex-end',
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
              <img src={BlueLogo} alt='Logo' style={{ width: 120 }} />
            </Box>

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mb: 2,
              width: '100%'
            }}>
              <ProfileBoxB avatar={avatar} name='Ana Gomez' id='A0072214' />
            </Box>
          </>
        )}

     {/* Contenedor de cupones */}
<Box
  sx={{
    width: isDesktop ? '65%' : '100%',
    maxWidth: isDesktop ? '700px' : 'none',
    marginRight: isDesktop ? '40px' : '0',
    marginTop: isDesktop ? '20px' : '0',
    padding: isDesktop ? '0 20px' : '20px'
  }}
>
  <h2 
    className='coupons-title'
    style={{
      textAlign: isDesktop ? 'left' : 'center',
      marginLeft: isDesktop ? '0' : 'auto',
      marginRight: isDesktop ? '0' : 'auto'
    }}
  >
    My Coupons
  </h2>
  
  <div className='coupons-container'>
    {coupons.map((coupon) => (
      <Coupon 
        key={coupon.id} 
        titulo={coupon.titulo} 
        autor={coupon.autor} 
      />
    ))}
  </div>
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

export default Coupons;