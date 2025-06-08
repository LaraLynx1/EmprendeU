import React, { useEffect, useState } from 'react';
import { Paper, Box, Typography, IconButton } from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import StarIcon from '@mui/icons-material/Star';
import starIcon from '../../resources/star.png';
import whatsapplogo from '../../resources/whatsapp logo.png';
import './profile-box.css';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';


const styles = {
  largePaper: {
    position: 'relative',
    width: 450,
    height: 600,
    borderRadius: 4,
    overflow: 'hidden',
    cursor: 'pointer',
    backgroundColor: '#264653',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    padding: 3,
  },
  contentContainer: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    display: 'inline-block',
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: '#00e676',
    marginRight: 6,
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    color: 'white',
    padding: 1,
    borderRadius: '50%',
    '&:hover': {
      backgroundColor: '#1ebe5d',
    },
  },
  starIcon: {
    color: 'white',
    fontSize: 30,
  },
  typographyMargin: {
    marginBottom: 1,
  }
};

const ProfileBox = ({ name, id, status, avatar, phoneNumber, variant = 'default' }) => {
  const [whatsappApiUrl, setWhatsappApiUrl] = useState(null);
  
  useEffect(() => {
    if (!phoneNumber) return;
    
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    const phoneWithCode = cleanPhone.startsWith('57') ? cleanPhone : `57${cleanPhone}`;
    const message = encodeURIComponent('Hola, quiero más información sobre tu perfil');
    setWhatsappApiUrl(`https://wa.me/${phoneWithCode}?text=${message}`);
  }, [phoneNumber]);

  if (variant === 'large') {
    return (
      <Paper
        elevation={6}
        sx={{
          ...styles.largePaper,
          backgroundImage: avatar?.trim() ? `url(${avatar})` : 'none',
        }}
      >
        <Box sx={styles.overlay} />
        
        <Box sx={styles.contentContainer}>
          <Typography variant='h4' fontWeight='bold' sx={styles.typographyMargin}>
            {name}
          </Typography>
          
          <Typography variant='subtitle1' sx={styles.typographyMargin}>
            ID: {id}
          </Typography>
          
          <Typography variant='body2' sx={{ color: '#00e676', mb: 2 }}>
            <Box component="span" sx={styles.statusContainer}>
              <Box component="span" sx={styles.statusDot} />
              {status}
            </Box>
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {whatsappApiUrl && (
              <IconButton
                component='a'
                href={whatsappApiUrl}
                target='_blank'
                rel='noopener noreferrer'
                sx={styles.whatsappButton}
                aria-label="Contactar por WhatsApp"
              >
                <ChatBubbleIcon sx={{ fontSize: 24 }} />
              </IconButton>
            )}
            <StarIcon sx={styles.starIcon} />
          </Box>
        </Box>
      </Paper>
    );
  }

  // Versión default
  return (
    <div className='profile-box'>
      {avatar?.trim() && <img src={avatar} className='avatar' alt={`Perfil de ${name}`} />}
      <div className='info'>
        <p className='status'>
          <span className='status-dot' /> {status}
        </p>
        <h2 className='name'>{name}</h2>
        <p className='id'>{id}</p>
      </div>
      <div className='final'>
        <img src={starIcon} className='star' alt='Marcar como favorito' />
        {whatsappApiUrl ? (
          <a href={whatsappApiUrl} target='_blank' rel='noopener noreferrer' className='chat-btn'>
            <img src={whatsapplogo} alt='Chat por WhatsApp' />
          </a>
        ) : (
          <button className='chat-btn' disabled>
            <img src={whatsapplogo} alt='Chat no disponible' />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileBox;