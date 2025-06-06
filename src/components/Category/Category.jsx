import { Card, Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const categoriesData = [
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
  },
];

const Category = ({ onCategoryChange }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');

  const findCategoryByTitle = (title) => {
    return categoriesData.find((category) => category.title === title);
  };

  const defaultCategory =
    findCategoryByTitle(categoryParam) || categoriesData[1];

  const [displayedCategory, setDisplayedCategory] = useState(defaultCategory);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    if (onCategoryChange) {
      onCategoryChange(displayedCategory);
    }
  }, [displayedCategory, onCategoryChange]);

  useEffect(() => {
    if (categoryParam) {
      const matched = findCategoryByTitle(categoryParam);
      if (matched) setDisplayedCategory(matched);
    }
  }, [categoryParam]);

  const handleCategoryClick = (category) => {
    setDisplayedCategory(category);
    setShowCategories(false);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Card
        sx={{
          width: { xs: 345, md: 400 },
          height: 180,
          borderRadius: 5,
          overflow: 'hidden',
          position: 'relative',
          marginBottom: 3,
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        }}
        onClick={() => setShowCategories(!showCategories)}
      >
        <Box
          component='img'
          src={displayedCategory.img}
          alt={displayedCategory.title}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background:
              'linear-gradient(180deg, rgba(16, 38, 60, 0.00) 30.3%, #10263C 100%)',
            zIndex: 2,
          }}
        />
        <Typography
          sx={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            zIndex: 3,
            color: 'white',
            fontWeight: 'bold',
            fontSize: { xs: '1.25rem', md: '1.5rem' },
          }}
          variant='h6'
        >
          {displayedCategory.title}
        </Typography>
      </Card>

      {showCategories && (
        <Box
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            maxHeight: 400,
            overflowY: 'auto',
            backgroundColor: '#10263C',
            borderRadius: 2,
            zIndex: 10,
            padding: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'space-between',
          }}
        >
          {categoriesData.map((category) => (
            <Box
              key={category.title}
              onClick={() => handleCategoryClick(category)}
              sx={{
                width: { xs: 'calc(50% - 8px)', md: 'calc(33% - 8px)' },
                height: 100,
                position: 'relative',
                borderRadius: 2,
                overflow: 'hidden',
                cursor: 'pointer',
                border:
                  displayedCategory.title === category.title
                    ? '2px solid #2A9DF4'
                    : 'none',
                transition: 'border 0.2s ease',
              }}
            >
              <Box
                component='img'
                src={category.img}
                alt={category.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background:
                    'linear-gradient(180deg, rgba(16, 38, 60, 0.00) 30.3%, #10263C 100%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: 1,
                }}
              >
                <Typography
                  variant='body2'
                  sx={{
                    color: 'white',
                    fontWeight:
                      displayedCategory.title === category.title
                        ? 'bold'
                        : 'normal',
                  }}
                >
                  {category.title}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Category;
