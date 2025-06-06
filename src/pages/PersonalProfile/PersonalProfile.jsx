import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery, useTheme, IconButton, Box } from '@mui/material';
import { Menu } from '@mui/icons-material';
import Navbar from '../../components/navbar/navbar.jsx';
import BlueLogo from '../../resources/logo icesi blue.png';
import avatar from '../../resources/Avatar1.png';
import storeIcon from '../../resources/store.png';
import settingsIcon from '../../resources/settings.png';
import starIcon from '../../resources/star black.png';
import helpIcon from '../../resources/help.png';
import couponIcon from '../../resources/coupon.png';
import logoutIcon from '../../resources/logout.png';
import ProfileBoxB from '../../components/ProfileBoxB/ProfileBoxB.jsx';
import { logout } from '../../utils/auth.js';
import Sidebar from '../../components/SideBar/Sidebar.jsx';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, collection } from 'firebase/firestore';
import { db } from '../../services/firebase.js';

import './PersonalProfile.css';
import BannerProfile from '../../components/BannerProfile/BannerProfile.jsx';

const PersonalProfile = () => {
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const handleLogout = async () => {
    try {
      await logout();
      alert('You have been logged out successfully.');
      navigate('/signin');
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  useEffect(() => {
    const fetchUserType = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        const usersRef = collection(db, 'users');
        const snapshot = await getDoc(doc(usersRef, currentUser.uid));

        if (snapshot.exists()) {
          const data = snapshot.data();
          setUserType(data.userType || '');
        }
      }
    };

    fetchUserType();
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#FDFBF7',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
        paddingBottom: isDesktop ? 2 : '80px',
      }}
    >
      {/* Header para desktop */}
      {isDesktop && (
        <Box sx={{ width: '100%', px: 4, py: 2 }}>
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
              <IconButton onClick={() => setSidebarOpen(true)} sx={{ color: '#10263C' }}>
                <Menu />
              </IconButton>
              <img src={BlueLogo} alt='Logo' style={{ width: 130 }} />
            </Box>
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
          justifyContent: 'flex-start',
          marginTop: '40px',
          paddingLeft: isDesktop ? 4 : 0,
          paddingRight: isDesktop ? 4 : 0,
        }}
      >
        {/* BannerProfile a la izquierda con ancho fijo */}
        {isDesktop && (
          <Box sx={{ width: 280, mr: 4 /* margen a la derecha para separar */ }}>
            <BannerProfile variant='large' />
          </Box>
        )}

        {/* Versión mobile */}
        {!isDesktop && (
          <>
            <img src={BlueLogo} alt='Logo' className='logo' />
            <ProfileBoxB avatar={avatar} name='Ana Gomez' id='A0072214' logo={BlueLogo} />
          </>
        )}

        {/* Contenedor de opciones */}
        <Box
          sx={{
            flexGrow: 1,
            maxWidth: 900,
            display: 'flex',
            flexDirection: 'column',
            alignItems: isDesktop ? 'flex-end' : 'center',
            padding: isDesktop ? 0 : '20px',
            gap: isDesktop ? 2 : 0,
          }}
        >
          {userType === 'seller' && (
            <button className='store-btn' onClick={() => navigate('/myStore')}>
              <img src={storeIcon} alt='Store' />
              My store
            </button>
          )}

          <div className='options'>
            <div className='option'>
              <img src={settingsIcon} alt='Settings' />
              <span>Settings</span>
            </div>
            <div className='option' onClick={() => navigate('/favorites')}>
              <img src={starIcon} alt='Favorites' />
              <span>Favorites</span>
            </div>
            <div className='option'>
              <img src={helpIcon} alt='Help' />
              <span>Help</span>
            </div>
            <div className='option' onClick={() => navigate('/coupons')}>
              <img src={couponIcon} alt='Coupons' />
              <span>My coupons</span>
            </div>
            <div className='option' onClick={handleLogout}>
              <img src={logoutIcon} alt='Logout' />
              <span className='logout'>Log out</span>
            </div>
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

export default PersonalProfile;
