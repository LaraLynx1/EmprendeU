import { Box, useMediaQuery, useTheme, Avatar, IconButton, Container } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from '@mui/icons-material';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

import CardSellers from '../../components/CardSellers/CardSellers';
import Category from '../../components/Category/Category';
import BannerProfile from '../../components/BannerProfile/BannerProfile';
import Navbar from '../../components/navbar/navbar';
import Sidebar from '../../components/SideBar/Sidebar';

import WhiteLogo from '../../resources/logo icesi white.png';
import BlueLogo from '../../resources/logo icesi blue.png';
import avatarImage from '../../resources/avatar.png';

import { db } from '../../services/firebase';
import './Categories.css';

const Categories = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const toggleFavorite = async (id) => {
    try {
      const updated = sellers.map((seller) =>
        seller.id === id ? { ...seller, isFavorite: !seller.isFavorite } : seller
      );
      setSellers(updated);

      const sellerToUpdate = sellers.find((seller) => seller.id === id);
      const sellerRef = doc(db, 'users', id);
      await updateDoc(sellerRef, {
        isFavorite: !sellerToUpdate.isFavorite,
      });
    } catch (error) {
      console.error('Error al actualizar el favorito:', error);
      setSellers(sellers);
    }
  };

  useEffect(() => {
    const fetchSellers = async () => {
      if (!selectedCategory) return;

      try {
        setLoading(true);
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);

        let sellersList = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        sellersList = sellersList.filter((user) => {
          if (!user.productos || !Array.isArray(user.productos)) return false;

          return user.productos.some((product) => {
            if (!product.descripcion) return false;
            const descripcion = product.descripcion.toLowerCase();
            const category = selectedCategory.title.toLowerCase();
            return descripcion.includes(category);
          });
        });

        setSellers(sellersList);
      } catch (error) {
        console.error('Error al obtener los vendedores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, [selectedCategory]);

  return (
    <Box className="categories-container" sx={{ paddingBottom: isDesktop ? 2 : '80px' }}>
      {isDesktop && (
        <Container className="desktop-header-container" maxWidth='100%'>
          <Box className="desktop-header-content">
            <IconButton onClick={() => setSidebarOpen(true)} sx={{ color: 'white' }}>
              <Menu />
            </IconButton>

            <img src={WhiteLogo} alt='Logo' style={{ width: 130 }} />

            <Box sx={{ flex: 1 }} />

            <Avatar
              src={avatarImage}
              alt='Avatar'
              className="avatar"
              onClick={() => navigate('/perfil-personal')}
            />
          </Box>
        </Container>
      )}

      {isDesktop && <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />}

      <Box className={`main-content ${isDesktop ? 'desktop-main-content' : ''}`}>
        {!isDesktop && (
          <>
            <Box className="logo-container">
              <img src={WhiteLogo} alt='Logo' style={{ width: 120 }} />
            </Box>

            <Box className="mobile-banner-container">
              <BannerProfile variant='dark' />
            </Box>

            <Box className="mobile-category-container">
              <Category onCategoryChange={handleCategoryChange} />
            </Box>
          </>
        )}

        <Box className="sellers-container">
          <Box className={`sellers-list ${isDesktop ? 'desktop-sellers-list' : ''}`}>
            {loading ? (
              <Box className="loading-text">Cargando vendedores...</Box>
            ) : sellers.length === 0 ? (
              <Box className="no-sellers-text">
                {selectedCategory !== 'Todos'
                  ? `No se encontraron vendedores para la categoría ${selectedCategory?.title || ''}`
                  : 'No se encontraron vendedores'}
              </Box>
            ) : (
              sellers.map((item) => (
                <Box
                  key={item.id}
                  className="seller-item"
                  onClick={() => navigate('/seller-profile', { state: { sellerId: item.id } })}
                >
                  <CardSellers
                    img={item.img}
                    isActive={item.isActive}
                    isFavorite={item.isFavorite}
                    name={item.name}
                    starProduct={item.starProduct}
                    onToggleFavorite={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    variant={isDesktop ? 'light' : 'dark'}
                  />
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Box>

      {!isDesktop && (
        <Box className="navbar-container">
          <Navbar />
        </Box>
      )}
    </Box>
  );
};

export default Categories;