import { Drawer, List, ListItemButton, ListItemText, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home, Person, Category, Close } from '@mui/icons-material';

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: '#2A4555',
          color: 'white',
          width: 250,
          paddingTop: 4,
        },
      }}
    >
        <IconButton onClick={onClose} sx={{ alignSelf: 'flex-end', m: 1, color: 'white' }}>
  <Close />
</IconButton>
      <List>
  <ListItemButton onClick={() => { navigate('/dashboard'); onClose(); }}>
    <Home sx={{ mr: 2 }} />
    <ListItemText primary="Inicio" />
  </ListItemButton>

  <ListItemButton onClick={() => { navigate('/perfil-personal'); onClose(); }}>
    <Person sx={{ mr: 2 }} />
    <ListItemText primary="Perfil" />
  </ListItemButton>

  <ListItemButton onClick={() => { navigate('/categories'); onClose(); }}>
    <Category sx={{ mr: 2 }} />
    <ListItemText primary="Categorías" />
  </ListItemButton>
</List>
    </Drawer>
  );
};

export default Sidebar;
