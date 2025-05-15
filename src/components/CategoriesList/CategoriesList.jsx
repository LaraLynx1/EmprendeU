import React from 'react';
import { Box, Typography } from '@mui/material';

const CategoriesList = ({ isDesktop }) => {
 
  const categoryItemStyle = {
    position: 'relative',
    borderRadius: 2,
    overflow: 'hidden',
    flexShrink: 0,
  };

 
  const sizes = isDesktop 
    ? { width: 320, height: 300 } 
    : { width: 'calc(50% - 8px)', height: 120 }; 

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: isDesktop ? 'row' : 'row', 
      flexWrap: isDesktop ? 'nowrap' : 'wrap', 
      gap: 2,
      width: '100%',
      px: isDesktop ? 0 : 2, 
    }}>
      {CategoriesListData.map((item) => (
        <Box
          key={item.img}
          sx={{
            ...categoryItemStyle,
            ...sizes,
          }}
        >
          <Box
            component="img"
            src={item.img}
            alt={item.title}
            loading="lazy"
            sx={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover' 
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(180deg, rgba(16, 38, 60, 0.00) 30.3%, #10263C 100%)',
              display: 'flex',
              alignItems: 'flex-end',
              p: 1.5,
            }}
          >
            <Typography sx={{ 
              color: '#fff', 
              fontWeight: 600, 
              fontSize: '1rem',
              textAlign: 'left',
              width: '100%'
            }}>
              {item.title}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};


export default CategoriesList;

const CategoriesListData = [
  {
    img: 'https://i.pinimg.com/736x/79/67/44/796744abdafe91ce27d855a78716c6e1.jpg',
    title: 'Snacks y Golosinas',
  },
  {
    img: 'https://i.pinimg.com/736x/5e/80/86/5e80862e2dacb01356357a2250c4871a.jpg',
    title: 'Accesorios y Bisutería',
  },
  {
    img: 'https://i.pinimg.com/736x/24/c4/2b/24c42ba06b3253df1bc6cc4f77eacd4a.jpg',
    title: 'Galletas',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Bebidas',

  },
  {
    img: 'https://i.pinimg.com/736x/5c/df/9f/5cdf9fe29d3b35875ae5c61504edceb5.jpg',
    title: 'Postres',

  },
  {
    img: 'https://i.pinimg.com/736x/92/0c/f3/920cf3fba8cd9b5199227d8b6d6b5b24.jpg',
    title: 'Cuidado Personal y Belleza',
  },
  {
    img: 'https://i.pinimg.com/736x/35/2d/29/352d290a66d66ad5dd7955d95ce009bc.jpg',
    title: 'Morrales, Bolsos y Estuches',
  },
  {
    img: 'https://i.pinimg.com/736x/bd/1e/e8/bd1ee85925cc6e32546d0ca4cc808a56.jpg',
    title: 'Plataformas Streaming',
  },
  {
    img: 'https://i.pinimg.com/736x/ee/6a/7e/ee6a7e1a188537d424c7f246d3ebcf43.jpg',
    title: 'Accesorios para Celular',
  },
  {
    img: 'https://i.pinimg.com/736x/45/fd/fa/45fdfa5fb66119bf30935c11256805fb.jpg',
    title: 'Arte y Manualidades',
  },
  {
    img: 'https://i.pinimg.com/736x/b4/63/5f/b4635fcfa839dc0b52fe5257e60e5925.jpg',
    title: 'Libros y Apuntes',
  },
  {
    img: 'https://i.pinimg.com/736x/21/68/93/21689370d6441c6f8806c2340c5dbcd2.jpg',
    title: 'Perfumes y Fragancias',
    author: '@southside_customs',
  },
];
