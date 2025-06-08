import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  useMediaQuery,
  useTheme,
  Avatar,
  IconButton,
  Container
} from '@mui/material';
import { collection, getDocs, query, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../services/firebase';
import CardSellers from '../../components/CardSellers/CardSellers';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import BlueLogo from '../../resources/logo icesi blue.png';
import { Menu } from '@mui/icons-material';
import Sidebar from '../../components/SideBar/Sidebar';
import BannerProfile from '../../components/BannerProfile/BannerProfile';
import './Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setError('Debes iniciar sesión para ver tus favoritos');
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const favoritesRef = collection(db, `users/${user.uid}/favorites`);
        const favoritesQuery = query(favoritesRef);
        const favoritesSnapshot = await getDocs(favoritesQuery);

        const favoritesData = favoritesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          isFavorite: true,
        }));

        setFavorites(favoritesData);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener favoritos:', error);
        setError('Error al cargar los favoritos: ' + error.message);
        setLoading(false);
      }
    };

    if (user) fetchFavorites();
  }, [user]);

  const removeFavorite = async (sellerId) => {
    try {
      if (!user) {
        setError('Debes iniciar sesión para gestionar tus favoritos');
        return;
      }

      const favoriteDocRef = doc(db, `users/${user.uid}/favorites`, sellerId);
      await deleteDoc(favoriteDocRef);
      setFavorites(favorites.filter((seller) => seller.id !== sellerId));
    } catch (error) {
      console.error('Error al eliminar favorito:', error);
      setError('Error al eliminar favorito: ' + error.message);
    }
  };

  const handleLogin = () => navigate('/login');

  return (
    <Box className={`favorites-container ${isDesktop ? 'desktop-container' : 'mobile-container'}`}>
 
      {isDesktop && (
        <Container className="desktop-header-container" maxWidth='100%'>
          <Box className="desktop-header-content">
            <IconButton onClick={() => setSidebarOpen(true)} sx={{ color: '#2A4555' }}>
              <Menu />
            </IconButton>

            <img src={BlueLogo} alt='Logo' style={{ width: 130 }} />

            <Box sx={{ flex: 1 }} />
          </Box>
        </Container>
      )}

      {isDesktop && <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />}

      {isDesktop ? (
        <Box className="desktop-main-layout">
       
          <Box className="desktop-banner-container">
            <BannerProfile variant="large" />
          </Box>

          <Box className="desktop-content-wrapper">
            <Box className="desktop-favorites-section">
              <Typography sx={{color: '#E20435', fontWeight: 'bold', fontSize: '1.5rem', mb: 2}}>
                Mis Favoritos
              </Typography>

              <Box className="favorites-list">
                {loading ? (
                  <CircularProgress color="primary" className="loading-spinner" />
                ) : error ? (
                  <Box className="error-message">
                    <Typography color="error" sx={{ mb: 2 }}>
                      {error}
                    </Typography>
                    {!user && (
                      <Button variant='contained' color='primary' onClick={handleLogin}>
                        Iniciar Sesión
                      </Button>
                    )}
                  </Box>
                ) : favorites.length === 0 ? (
                  <Typography color="text.primary" className="empty-message">
                    You have no favorite sellers saved.
                  </Typography>
                ) : (
                  favorites.map((seller) => (
                    <Box
                      key={seller.id}
                      className="favorite-item"
                      onClick={() => navigate('/seller-profile', { state: { sellerId: seller.id } })}
                    >
                      <CardSellers
                        {...seller}
                        onToggleFavorite={(e) => {
                          e.stopPropagation();
                          removeFavorite(seller.id);
                        }}
                        variant="light"
                      />
                    </Box>
                  ))
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
      
        <Box className="mobile-main-content">
          <Box className="mobile-logo-container">
            <img src={BlueLogo} alt='Logo' style={{ width: 120 }} />
          </Box>
          <BannerProfile variant='dark' sx={{width: '100%', mb: 2}} />
          <Typography className="mobile-title"sx={{color: '#E20435', fontWeight: 'bold', fontSize: '1rem', mb: 2}}>
            Mis Favoritos
          </Typography>

          <Box className="mobile-favorites-section">
            {loading ? (
              <CircularProgress color="secondary" className="loading-spinner" />
            ) : error ? (
              <Box className="error-message">
                <Typography color="white" sx={{ mb: 2 }}>
                  {error}
                </Typography>
                {!user && (
                  <Button variant='contained' color='primary' onClick={handleLogin}>
                    Iniciar Sesión
                  </Button>
                )}
              </Box>
            ) : favorites.length === 0 ? (
              <Typography color="white" className="empty-message">
                No tienes vendedores favoritos guardados.
              </Typography>
            ) : (
              favorites.map((seller) => (
                <Box
                  key={seller.id}
                  className="favorite-item"
                  onClick={() => navigate('/seller-profile', { state: { sellerId: seller.id } })}
                >
                  <CardSellers
                    {...seller}
                    onToggleFavorite={(e) => {
                      e.stopPropagation();
                      removeFavorite(seller.id);
                    }}
                    variant="dark"
                  />
                </Box>
              ))
            )}
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
};

export default Favorites;