import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  CircularProgress,
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import { useNav } from '../NavContext';

const drawerWidth = 240;

function Navigation({ mode, modeChange }) {
  const { navItems, loading, error } = useNav();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!loading && (error || navItems.length === 0)) {
      navigate('/error', { replace: true });
    }
  }, [loading, error, navItems, navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const scrollToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      const headerHeight = document.querySelector('.header')?.offsetHeight || 64;
      window.scrollTo({
        top: element.offsetTop - headerHeight,
        behavior: 'smooth',
      });
    }
  };

  const handleNavClick = (item) => {
    if (location.pathname === '/' && item.section) {
      scrollToSection(item.section);
    }
    setMobileOpen(false);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography
        variant="h6"
        sx={{ my: 2, color: mode === 'dark' ? 'var(--text-light)' : 'var(--text-dark)' }}
      >
        Меню
      </Typography>
      <Divider sx={{ bgcolor: 'var(--secondary)' }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              sx={{
                textAlign: 'center',
                color: mode === 'dark' ? 'var(--text-light) !important' : 'var(--text-dark) !important',
                '&:hover': { color: 'var(--secondary) !important' },
                '&.active': { color: 'var(--secondary) !important' },
              }}
              component={NavLink}
              to={item.to}
              onClick={() => handleNavClick(item)}
              className={({ isActive }) => (isActive ? 'active' : '')}
              aria-label={item.label}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', display: 'flex', gap: 2, justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box component="header" className="header">
      <CssBaseline />
      <AppBar
        component="nav"
        className={`header${scrolled ? ' scrolled' : ''}`}
        sx={{
          position: 'fixed',
          background: 'var(--bg-header)',
          boxShadow: 'var(--shadow-sm)',
          zIndex: 50,
        }}
      >
        <Toolbar className="navigation-bar">
          <IconButton
            color="inherit"
            aria-label="Открыть меню"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color: mode === 'dark' ? 'var(--text-light)' : 'var(--text-dark)' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="h1"
            sx={{
              margin: '0 16px',
              fontSize: 'clamp(1.1rem, 4vw, 1.3rem)',
              fontWeight: 800,
              color: mode === 'dark' ? 'var(--text-light)' : 'var(--text-dark)',
            }}
          >
            IT Solutions
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            onClick={modeChange}
            color="inherit"
            aria-label="Переключить тему"
            sx={{ color: mode === 'dark' ? 'var(--text-light)' : 'var(--text-dark)' }}
          >
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={NavLink}
                to={item.to}
                onClick={() => handleNavClick(item)}
                sx={{
                  color: mode === 'dark' ? 'var(--text-light) !important' : 'var(--text-dark) !important',
                  backgroundColor: 'transparent !important',
                  mx: 0.5,
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  '&:hover': { color: 'var(--secondary) !important', backgroundColor: 'transparent !important' },
                  '&.active': { color: 'var(--secondary) !important', borderBottom: '2px solid var(--secondary)' },
                }}
                aria-label={item.label}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              background: 'var(--bg-header)',
              color: mode === 'dark' ? 'var(--text-light)' : 'var(--text-dark)',
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Toolbar />
    </Box>
  );
}

export default Navigation;