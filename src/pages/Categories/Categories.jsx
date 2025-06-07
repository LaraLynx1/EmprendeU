import { Box, useMediaQuery, useTheme, Avatar, IconButton, Container } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from '@mui/icons-material';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

import CardSellers from '../../components/CardSellers/CardSellers';
import Category from '../../components/Category/Category';
import BannerProfile from '../../components/bannerProfile/bannerProfile';
import Navbar from '../../components/navbar/navbar';
import Sidebar from '../../components/SideBar/Sidebar';

import WhiteLogo from '../../resources/logo icesi white.png';
import avatarImage from '../../resources/avatar 1.png';

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

      const sellerRef = doc(db, 'users', id);
      await updateDoc(sellerRef, {
        isFavorite: !sellers.find((seller) => seller.id === id).isFavorite,
      });
    } catch (error) {
      console.error('Error al actualizar el favorito:', error);
    }
  };

  useEffect(() => {
    const fetchSellers = async () => {
      if (!selectedCategory) return;

      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'users'));
        const sellersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filteredSellers = sellersData.filter((user) => 
          user.productos?.some((product) =>
            product.descripcion?.toLowerCase().includes(selectedCategory.title.toLowerCase())
          )
        );

        setSellers(filteredSellers);
      } catch (error) {
        console.error('Error al obtener vendedores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, [selectedCategory]);

  return (
    <Box className="categories-container" sx={{ paddingBottom: isDesktop ? 2 : '80px' }}>
      {/* Desktop Header */}
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

      {isDesktop ? (
        <Box className="desktop-main-layout">
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          <Box className="desktop-content-wrapper">
          
            <Box className="desktop-category-container">
              <Category variant ='large' onCategoryChange={handleCategoryChange} />
            </Box>
            
          
            <Box className="desktop-sellers-container">
              <Box className="sellers-list desktop-sellers-list">
                {renderSellers()}
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box className="mobile-layout">
          <img src={WhiteLogo} alt='Logo' className="mobile-logo" />

          <Box className="mobile-banner-container">
            <BannerProfile variant='dark' />
          </Box>

          <Box className="mobile-category-container">
            <Category onCategoryChange={handleCategoryChange} />
          </Box>

          <Box className="sellers-list mobile-sellers-list">
            {renderSellers()}
          </Box>
        </Box>
      )}
    
      {!isDesktop && (
        <Box className="navbar-container">
          <Navbar />
        </Box>
      )}
    </Box>
  );

  function renderSellers() {
    return loading ? (
      <Box className="loading-text">Cargando vendedores...</Box>
    ) : sellers.length === 0 ? (
      <Box className="no-sellers-text">
        {selectedCategory?.title
          ? `No hay vendedores en ${selectedCategory.title}`
          : 'Selecciona una categoría'}
      </Box>
    ) : (
      sellers.map((item) => (
        <Box
          key={item.id}
          className="seller-item"
          onClick={() => navigate('/seller-profile', { state: { sellerId: item.id } })}
        >
          <CardSellers
            {...item}
            onToggleFavorite={(e) => {
              e.stopPropagation();
              toggleFavorite(item.id);
            }}
            variant={isDesktop ? 'light' : 'dark'}
          />
        </Box>
      ))
    );
  }
};

export default Categories;