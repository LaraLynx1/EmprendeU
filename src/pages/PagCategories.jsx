import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { Container, Typography, Box, CircularProgress, Alert, Stack } from '@mui/material';
import CardSellers from '../../components/CardSellers/CardSellers'; // Adjust the import path as needed

export default function PagCategories() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');

  useEffect(() => {
    const fetchSellersByCategory = async () => {
      if (!category) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Get all users
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);

        const sellersWithCategory = [];

        // Filter sellers who have products in the selected category
        usersSnapshot.docs.forEach((doc) => {
          const seller = doc.data();

          // Check if the seller has products array
          if (seller.productos && Array.isArray(seller.productos)) {
            // Check if any product has the selected category in its description
            const matchingProducts = seller.productos.filter(
              (product) => product.descripcion && product.descripcion.toLowerCase().includes(category.toLowerCase())
            );

            if (matchingProducts.length > 0) {
              sellersWithCategory.push({
                id: doc.id,
                name: seller.name || 'Vendedor sin nombre',
                img: seller.profileImage || '', // Adjust based on your data structure
                isActive: seller.status === 'active',
                starProduct: '4.5', // You can calculate this based on your data
                matchingProducts: matchingProducts,
              });
            }
          }
        });

        setSellers(sellersWithCategory);
      } catch (error) {
        console.error('Error fetching sellers by category:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSellersByCategory();
  }, [category]);

  const handleToggleFavorite = (sellerId) => {
    setFavorites((prev) => ({
      ...prev,
      [sellerId]: !prev[sellerId],
    }));
  };

  if (!category) {
    return (
      <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
        <Alert severity='warning'>No se ha seleccionado ninguna categoría</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
      <Typography variant='h4' component='h1' gutterBottom sx={{ mb: 3 }}>
        Vendedores en: {category}
      </Typography>

      {error && (
        <Alert severity='error' sx={{ mb: 3 }}>
          Error: {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
          <Typography variant='body2' sx={{ ml: 2 }}>
            Buscando vendedores...
          </Typography>
        </Box>
      ) : sellers.length > 0 ? (
        <Stack spacing={1} sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
          {sellers.map((seller) => (
            <CardSellers
              key={seller.id}
              img={seller.img}
              name={seller.name}
              isActive={seller.isActive}
              isFavorite={favorites[seller.id] || false}
              starProduct={seller.starProduct}
              onToggleFavorite={() => handleToggleFavorite(seller.id)}
            />
          ))}
        </Stack>
      ) : (
        <Box>
          <Typography variant='h6' sx={{ mt: 4, textAlign: 'center' }}>
            No se encontraron vendedores para esta categoría.
          </Typography>
        </Box>
      )}
    </Container>
  );
}
