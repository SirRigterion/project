import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import PortfolioPage from './components/PortfolioPage';
import ServicesPage from './components/ServicesPage';
import AboutPage from './components/AboutPage';
import ContactsPage from './components/ContactsPage';
import TermsPage from './components/TermsPage';
import PrivacyPage from './components/PrivacyPage';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';
import { NavProvider } from './NavContext';
import axios from 'axios';

axios.defaults.baseURL = 'http://178.130.58.105:8000/api';

const App = () => {
  const [mode, setMode] = useState('light');
  const location = useLocation();

  const theme = createTheme({
    palette: {
      mode: mode,
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 700,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  const modeChange = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Устанавливаем data-theme на корневой элемент
  document.documentElement.setAttribute('data-theme', mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavProvider>
        <div className="App" data-theme={mode}>
          <Navigation mode={mode} modeChange={modeChange} />
          <main className="page-container" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Routes location={location}>
                  <Route path="/" element={<HomePage mode={mode} />} />
                  <Route path="/portfolio" element={<PortfolioPage mode={mode} />} />
                  <Route path="/services" element={<ServicesPage mode={mode} />} />
                  <Route path="/about" element={<AboutPage mode={mode} />} />
                  <Route path="/contacts" element={<ContactsPage mode={mode} />} />
                  <Route path="/terms" element={<TermsPage mode={mode} />} />
                  <Route path="/privacy" element={<PrivacyPage mode={mode} />} />
                  <Route path="/error" element={<ErrorPage mode={mode} />} />
                  <Route path="*" element={<NotFoundPage mode={mode} />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </NavProvider>
    </ThemeProvider>
  );
};

export default App;