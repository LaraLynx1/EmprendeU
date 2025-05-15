import React from 'react';
import { Paper, Box, Typography, IconButton } from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import StarIcon from '@mui/icons-material/Star';
import './Profile-box.css';

const ProfileBox = ({ name, id, status, avatar, phoneNumber, variant = 'default' }) => {
  const whatsappLink = phoneNumber
    ? `https://wa.me/57${phoneNumber}?text=Hola%2C%20quiero%20más%20información%20sobre%20tu%20perfil`
    : null;

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
          justifyContent: 'flex-end',
          backgroundImage: `url(${avatar})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          padding: 3,
        }}
      >
        {/* Capa oscura */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0) 100%)',
            zIndex: 1,
          }}
        />

        {/* Contenido */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
          }}
        >
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
            {name}
          </Typography>

          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            ID: {id}
          </Typography>

          <Typography variant="body2" sx={{ color: '#00e676', mb: 2 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="status-dot" /> {status}
            </span>
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {whatsappLink && (
              <IconButton
                component="a"
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  backgroundColor: '#25D366',
                  color: 'white',
                  padding: 1,
                  borderRadius: '50%',
                  '&:hover': {
                    backgroundColor: '#1ebe5d',
                  },
                }}
              >
                <ChatBubbleIcon sx={{ fontSize: 24 }} />
              </IconButton>
            )}
            <StarIcon sx={{ color: 'white', fontSize: 30 }} />
          </Box>
        </Box>
      </Paper>
    );
  }

  // Variante mobile (default)
  return (
    <div className="profile-box">
      <img src={avatar} alt="Avatar" className="avatar" />
      <div className="info">
        <p className="status">
          <span className="status-dot" /> {status}
        </p>
        <h2 className="name">{name}</h2>
        <p className="id">ID: {id}</p>
      </div>
      <div className="final">
        {whatsappLink && (
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="chat-btn">
            <ChatBubbleIcon sx={{ color: 'white', fontSize: 20 }} />
          </a>
        )}
        <StarIcon className="star" sx={{ color: 'white', fontSize: 30 }} />
      </div>
    </div>
  );
};

export default ProfileBox;
