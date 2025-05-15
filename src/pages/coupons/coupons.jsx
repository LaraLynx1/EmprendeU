import React, { useState } from 'react';
import { useMediaQuery, useTheme, IconButton, Avatar, Box } from '@mui/material';
import { Menu } from '@mui/icons-material';
import Sidebar from '../../components/SideBar/Sidebar.jsx';
import Navbar from '../../components/navbar/navbar.jsx';
import BlueLogo from '../../resources/logo icesi blue.png';
import avatar from '../../resources/Avatar1.png';
import sellerProfile from '../../utils/dataproductos';
import Coupon from '../../components/cupon/cupon';
import ProfileBoxB from '../../components/ProfileBoxB/ProfileBoxB';
import CouponModal from '../../components/couponModal/couponModal';
import { useNavigate } from 'react-router-dom';
import BannerProfile from '../../components/BannerProfile/BannerProfile.jsx';
import './coupons.css';

const Coupons = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const coupons = sellerProfile.cupones;
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const handleCouponClick = (coupon) => {
    setSelectedCoupon(coupon);
  };

  const closeModal = () => {
    setSelectedCoupon(null);
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#FDFBF7',
        overflowX: 'hidden',
        paddingBottom: isDesktop ? 2 : '80px',
      }}
    >
      {/* Header */}
      {isDesktop && (
        <Box sx={{ width: '100%', px: 4, py: 2 }}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton onClick={() => setSidebarOpen(true)} sx={{ color: '#10263C' }}>
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
                border: '2px solid white',
              }}
              onClick={() => navigate('/perfil-personal')}
            />
          </Box>
        </Box>
      )}

      {/* Sidebar */}
      {isDesktop && <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />}

      {/* Contenido principal */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isDesktop ? 'row' : 'column',
          paddingLeft: isDesktop ? '280px' : 0,
          paddingTop: isDesktop ? '20px' : 0,
          px: isDesktop ? 4 : 2,
          gap: isDesktop ? 4 : 3,
        }}
      >
        {/* BannerProfile solo en desktop */}
        {isDesktop && (
          <Box
            sx={{
              flex: '0 0 300px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            <BannerProfile variant='large' />
          </Box>
        )}

        {/* Cupones */}
        <Box sx={{ flex: 1, width: '100%' }}>
          {/* Mobile: Logo y ProfileBox */}
          {!isDesktop && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 3 }}>
                <img src={BlueLogo} alt='Logo' style={{ width: 120 }} />
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <ProfileBoxB avatar={avatar} name='Ana Gomez' id='A0072214' />
              </Box>
            </>
          )}

          {/* Título */}
          <h2
            className='coupons-title'
            style={{
              textAlign: isDesktop ? 'left' : 'center',
              marginLeft: isDesktop ? '80px' : '0',
            }}
          >
            My Coupons
          </h2>

          {/* Lista de cupones */}
          <div className='coupons-container'
            style={{
              marginLeft: isDesktop ? '80px' : '0',
            }}>
            {coupons.map((coupon) => (
              <div key={coupon.id} onClick={() => handleCouponClick(coupon)}>
                <Coupon titulo={coupon.titulo} autor={coupon.autor} />
              </div>
            ))}
          </div>
        </Box>

        {/* Modal de cupon */}
        <CouponModal
          isOpen={!!selectedCoupon}
          onClose={closeModal}
          titulo={selectedCoupon?.titulo}
          autor={selectedCoupon?.autor}
          codigo={selectedCoupon?.codigo}
        />
      </Box>

      {/* Navbar para mobile */}
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
