import { Box } from "@mui/material";
import { useState } from 'react';
import { sellersData as initialData } from '../../utils/sellersData';
import CardSellers from "../../components/CardSellers/CardSellers.jsx";
import WhiteLogo from "../../assets/Whitelogo.png";
import Category from "../../components/Category/Category.jsx";  
import BannerProfile from "../../components/BannerProfile/BannerProfile.jsx";   

const SellersList = () => {
  const [sellers, setSellers] = useState(initialData);

  const toggleFavorite = (id) => {
    const updated = sellers.map((seller) =>
      seller.id === id ? { ...seller, isFavorite: !seller.isFavorite } : seller
    );
    setSellers(updated);
  };

  return (
    <Box
      sx={{
        paddingBlock: 2,
        width: '100%', 
        height: '100vh', // Asegura que ocupe toda la altura de la ventana
        backgroundColor:'#10263C',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Sección fija */}
        <Box sx={{ flexShrink: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 3 }}>
            <img src={WhiteLogo} alt="Logo" style={{ width: 120 }} />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <BannerProfile variant="light" />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
            <Category />
          </Box>
        </Box>

        {/* Sección scrollable */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            paddingX: 2,
            paddingBottom: 2,
            scrollbarWidth: 'none', // Oculta la barra de scroll en Firefox
            '&::-webkit-scrollbar': {
              display: 'none', // Oculta la barra de scroll en Chrome, Edge y Safari
            },
          }}
        >
          {sellers.map((item) => (
            <CardSellers
              key={item.id}
              img={item.img}
              isActive={item.isActive}
              isFavorite={item.isFavorite}
              name={item.name}
              starProduct={item.starProduct}
              onToggleFavorite={() => toggleFavorite(item.id)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SellersList;
