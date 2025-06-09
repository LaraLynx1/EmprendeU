import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import ProfileBoxB from '../../components/ProfileBoxB/ProfileBoxB';
import BlueLogo from '../../resources/logo icesi blue.png';
import avatar from '../../resources/avatar 1.png';
import { Box, Snackbar, Alert, IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';
import Sidebar from '../../components/sidebar/Sidebar';
import useMediaQuery from '@mui/material/useMediaQuery';
import BannerProfile from '../../components/BannerProfile/BannerProfile';
import arrowback from '../../resources/arrowback.png';
import { useNavigate } from 'react-router-dom';

import { collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

import './Validate-cupon.css';

const ValidateCupon = () => {
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const isDesktop = useMediaQuery('(min-width:768px)');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const handleBackClick = () => {
		navigate('/perfil-personal');
	};

  const handleValidate = async () => {
    if (!inputValue.trim()) return;

    try {
      const usersRef = collection(db, 'users');
      const usersSnapshot = await getDocs(usersRef);

      let found = false;

      for (const userDoc of usersSnapshot.docs) {
        const userCouponsRef = collection(db, 'users', userDoc.id, 'coupons');
        const couponQuery = query(userCouponsRef, where('code', '==', inputValue.trim()));
        const couponSnapshot = await getDocs(couponQuery);

        if (!couponSnapshot.empty) {
          const couponDoc = couponSnapshot.docs[0];
          await deleteDoc(doc(db, 'users', userDoc.id, 'coupons', couponDoc.id));

          setMessage('¡Cupón válido y eliminado exitosamente!');
          setSnackbarSeverity('success');
          found = true;
          break;
        }
      }

      if (!found) {
        setMessage('Cupón no válido o ya fue utilizado.');
        setSnackbarSeverity('error');
      }
    } catch (error) {
      console.error('Error al validar el cupón:', error);
      setMessage('Ocurrió un error al validar el cupón.');
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
      setInputValue('');
    }

  };

  return (
    <>
      <Box className={`profile-container ${isDesktop ? 'desktop' : ''}`}>
        {isDesktop ? (
          <>
            <Box className='desktop-header1'>
              <Box className='logo-container1'>
                <IconButton className='menu-button' onClick={() => setSidebarOpen(true)}>
                  <Menu />
                </IconButton>
                <img src={BlueLogo} alt='Logo' className='logo-desktop' />
              </Box>
            </Box>

            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <Box className='desktop-content'>
             <Box className='left-banner'>
  <Box className='top-bar'>
    <img src={arrowback} alt='Back' className='header-icon' onClick={handleBackClick} />
    <BannerProfile variant='large' />
  </Box>
</Box>


              <Box className='right-content'>
                <div className='cupon-validator'>
                  <h2 className='cupon-title-validate'>Escribe aquí el cupón para validarlo</h2>
                  <input
                    type='text'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder='Ej. 123-456'
                    className='cupon-input-validate'
                  />
                  <button className='validate-btn' onClick={handleValidate}>
                    Validar cupón
                  </button>
                </div>
              </Box>
            </Box>
          </>
        ) : (
          <>
            <img src={BlueLogo} alt='Logo' className='logo-mobile' />
           <Box className='mobile-profilebar'>
  <img src={arrowback} alt='Back' className='header-icon' onClick={handleBackClick} />
  <ProfileBoxB avatar={avatar} />
</Box>


            <div className='cupon-validator'>
              <h2 className='cupon-title-validate'>Escribe aquí el cupón para validarlo</h2>
              <input
                type='text'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder='Ej. 123-456'
                className='cupon-input-validate'
              />
              <button className='validate-btn' onClick={handleValidate}>
                Validar cupón
              </button>
            </div>

            <Navbar />
          </>
        )}
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ValidateCupon;
