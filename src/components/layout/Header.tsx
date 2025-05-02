import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChefHat, Menu as MenuIcon, LogIn, LogOut, User, Heart, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Container,
  Menu,
  MenuItem,
  useScrollTrigger,
  Fade
} from '@mui/material';

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const drawer = (
    <Box sx={{ width: 250 }}>
      <List>
        <ListItem component={Link} to="/">
          <ListItemIcon>
            <ChefHat />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        
        {user ? (
          <>
            <ListItem component={Link} to="/favorites">
              <ListItemIcon>
                <Heart />
              </ListItemIcon>
              <ListItemText primary="Favorites" />
            </ListItem>
            
            <ListItem component={Link} to="/create-recipe">
              <ListItemIcon>
                <Plus />
              </ListItemIcon>
              <ListItemText primary="Create Recipe" />
            </ListItem>
            
            <ListItem component={Link} to="/profile">
              <ListItemIcon>
                <User />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            
            <ListItem button onClick={logout}>
              <ListItemIcon>
                <LogOut />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem component={Link} to="/login">
              <ListItemIcon>
                <LogIn />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="fixed" 
        color="default"
        elevation={trigger ? 4 : 0}
        sx={{
          backgroundColor: trigger ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
          backdropFilter: trigger ? 'blur(10px)' : 'none',
          transition: 'all 0.3s'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box component={Link} to="/" sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              textDecoration: 'none', 
              color: 'inherit' 
            }}>
              <ChefHat color="#E76F51" />
              <Typography
                variant="h6"
                sx={{ 
                  ml: 1,
                  color: 'text.primary',
                  fontWeight: 700
                }}
              >
                Cooksy Finder
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
              <Button component={Link} to="/" color="inherit">
                Home
              </Button>
              
              {user ? (
                <>
                  <Button 
                    component={Link} 
                    to="/favorites" 
                    color="inherit"
                    startIcon={<Heart />}
                  >
                    Favorites
                  </Button>
                  
                  <Button 
                    component={Link} 
                    to="/create-recipe" 
                    color="inherit"
                    startIcon={<Plus />}
                  >
                    Create Recipe
                  </Button>
                  
                  <Button
                    color="inherit"
                    onClick={handleMenuOpen}
                    startIcon={<User />}
                  >
                    {user.displayName || 'Profile'}
                  </Button>
                  
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    TransitionComponent={Fade}
                  >
                    <MenuItem 
                      component={Link} 
                      to="/profile"
                      onClick={handleMenuClose}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button 
                    component={Link} 
                    to="/login" 
                    color="inherit"
                    startIcon={<LogIn />}
                  >
                    Login
                  </Button>
                  
                  <Button
                    component={Link}
                    to="/signup"
                    variant="contained"
                    sx={{
                      bgcolor: '#E76F51',
                      '&:hover': {
                        bgcolor: '#E35D3B',
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>

            {/* Mobile menu button */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      
      {/* Mobile Navigation Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: 250 },
        }}
      >
        {drawer}
      </Drawer>
      
      {/* Toolbar spacer */}
      <Toolbar />
    </Box>
  );
};

export default Header;