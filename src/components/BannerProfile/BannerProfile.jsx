import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../services/firebase';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { Box, Typography, Avatar, Paper, CircularProgress } from '@mui/material';
import avatarImage from '../../resources/Avatar1.png';

const BannerProfile = ({ variant = 'light' }) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);

  // Estado para el toggle de active/inactive (para la variante 'largeb')
  const [status, setStatus] = useState('inactive');
  const isActive = status === 'active';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        try {
          const q = query(collection(db, 'users'), where('email', '==', user.email));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const data = querySnapshot.docs[0].data();
            setName(data.name || '');
            setCode(data.code || '');
          } else {
            setName('');
            setCode('');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setName('');
          setCode('');
        }
      } else {
        setName('');
        setCode('');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleStatus = () => {
    setStatus(prev => (prev === 'active' ? 'inactive' : 'active'));
  };

  if (loading) {
    return (
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 1.5,
          width: '90%',
          height: 80,
          borderRadius: 20,
          backgroundColor: variant === 'dark' ? '#2A4555' : '#fff',
          marginBottom: 2,
        }}
      >
        <CircularProgress size={24} />
      </Paper>
    );
  }

  if (!name) {
    return (
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 1.5,
          width: '90%',
          height: 80,
          borderRadius: 20,
          backgroundColor: variant === 'dark' ? '#2A4555' : '#fff',
          marginBottom: 2,
        }}
      >
        <Avatar
          src={avatarImage}
          alt="Avatar"
          sx={{ width: 63, height: 64, marginRight: 2 }}
        />
        <Box sx={{ textAlign: 'left' }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ color: variant === 'dark' ? '#fff' : '#E20435', lineHeight: 1 }}
          >
            Guest
          </Typography>
          <Typography variant="body2" sx={{ color: 'gray', marginTop: 0.5 }}>
            Not logged in
          </Typography>
        </Box>
      </Paper>
    );
  }

  if (variant === 'large') {
    return (
      <Paper
        elevation={6}
        sx={{
          position: 'relative',
          width: 450,
          height: 600,
          borderRadius: 4,
          overflow: 'hidden',
          cursor: 'pointer',
          boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          backgroundImage: `url(${avatarImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          padding: 24,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0) 100%)',
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: 'absolute',  
            bottom: 0,
            left: 0,
            zIndex: 2,
            paddingLeft: 3,
            paddingBottom: 2,
          }}
        >
          <Typography variant="h4" fontWeight="bold" fontStyle="italic">
            {name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ opacity: 0.8, mt: 0 }}
          >
            {code}
          </Typography>
        </Box>
      </Paper>
    );
  }

  if (variant === 'largeb') {
    return (
      <Paper
        elevation={6}
        sx={{
          position: 'relative',
          width: 450,
          height: 600,
          borderRadius: 4,
          overflow: 'hidden',
          cursor: 'pointer',
          boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          backgroundImage: `url(${avatarImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          padding: 24,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0) 100%)',
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            zIndex: 2,
            paddingLeft: 3,
            paddingBottom: 2,
          }}
        >
          <Typography variant="h4" fontWeight="bold" fontStyle="italic">
            {name}
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.8, mt: 0 }}>
            {code}
          </Typography>

          <Box
            onClick={toggleStatus}
            sx={{
              marginTop: 1.5,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              userSelect: 'none',
              padding: '6px 12px',
              borderRadius: 20,
              backgroundColor: isActive ? '#4CAF50' : '#B0BEC5',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              transition: '0.3s',
              width: 'fit-content',
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: '#fff',
              }}
            />
            {isActive ? 'Active' : 'Inactive'}
          </Box>
        </Box>
      </Paper>
    );
  }

  // Default light or dark banner
  const isLight = variant === 'light';
  const backgroundColor = isLight ? '#fff' : '#2A4555';
  const nameColor = isLight ? '#E20435' : '#fff';

  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 1.5,
        width: '90%',
        height: 80,
        borderRadius: 20,
        backgroundColor: backgroundColor,
        marginBottom: 2,
      }}
    >
      <Avatar
        src={avatarImage}
        alt="Avatar"
        sx={{ width: 63, height: 64, cursor: 'pointer', marginRight: 2 }}
      />
      <Box sx={{ textAlign: 'left' }}>
        <Typography variant="h6" fontWeight="bold" sx={{ color: nameColor, lineHeight: 1 }}>
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'gray', marginTop: 0.5 }}>
          {code}
        </Typography>
      </Box>
    </Paper>
  );
};

export default BannerProfile;
