import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Typography, Button, Box } from '@mui/material';
import PortfolioItem from './PortfolioItem';
import ProjectSlider from './ProjectSlider';
import axios from 'axios';

const HomePage = ({ mode }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/img/projects');
      setProjects(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setProjects([]);
    }
  };

  useEffect(() => {
    fetchProjects();
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 64;
        window.scrollTo({
          top: element.offsetTop - headerHeight,
          behavior: 'smooth',
        });
      }
    }
  }, []);

  const memoizedProjects = useMemo(() => projects, [projects]);

  return (
    <Box
      component="div"
      className="main-page"
      aria-label="Главная страница"
      aria-live="polite"
      sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      {/* Секция Home */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        id="home"
        className="home-section"
      >
        <Container maxWidth="lg" className="container">
          <Typography
            variant="h2"
            component="h2"
            className="home-section-title"
            sx={{ color: 'var(--text-light)' }}
          >
            IT решения для бизнеса
          </Typography>
          <Typography
            variant="body1"
            className="home-section-text"
            sx={{ color: 'var(--text-light)' }}
          >
            Ваш успех — наша цель! Создаем современные сайты и автоматизируем процессы.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/contacts')}
            className="home-section-button"
            aria-label="Заказать услуги"
            sx={{
              background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
              color: 'var(--text-light)',
              '&:hover': {
                background: 'linear-gradient(90deg, var(--primary-dark), var(--secondary-dark))',
                transform: 'translateY(-2px)',
                boxShadow: 'var(--shadow-md)',
              },
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '50px',
            }}
          >
            Заказать услуги
          </Button>
        </Container>
      </motion.section>

      {/* Секция Portfolio */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
        id="portfolio-section"
        className="portfolio-section"
      >
        <Container maxWidth="lg" className="container">
          <Typography
            variant="h2"
            component="h2"
            className="portfolio-section-title"
            sx={{ color: mode === 'dark' ? 'var(--text-light)' : 'var(--text-dark)' }}
          >
            Наши работы
          </Typography>
          {memoizedProjects.length > 0 ? (
            <>
              <PortfolioItem project={memoizedProjects[0]} reverse={false} />
              {memoizedProjects.length > 1 && <PortfolioItem project={memoizedProjects[1]} reverse={true} />}
            </>
          ) : (
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography
                variant="body1"
                sx={{
                  color: 'var(--text-medium)',
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                }}
              >
                Проекты временно недоступны. Ознакомьтесь с нашими услугами!
              </Typography>
              <Button
                variant="outlined"
                onClick={() => navigate('/services')}
                sx={{
                  mt: 2,
                  color: mode === 'dark' ? 'var(--text-light)' : 'var(--text-dark)',
                  borderColor: 'var(--secondary)',
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: 'var(--primary)',
                    background: 'var(--bg-hover)',
                  },
                }}
              >
                Наши услуги
              </Button>
            </Box>
          )}
          <Button
            variant="contained"
            onClick={() => navigate('/portfolio')}
            className="portfolio-section-button"
            aria-label="Посмотреть все работы"
            sx={{
              mt: 4,
              background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
              color: '#fff',
              '&:hover': {
                background: 'linear-gradient(90deg, var(--secondary), var(--primary))',
                transform: 'translateY(-2px)',
                boxShadow: 'var(--shadow-md)',
              },
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '8px',
            }}
          >
            Посмотреть все работы
          </Button>
        </Container>
      </motion.section>

      {/* Секция Projects */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
        id="projects"
        className="projects-section"
        sx={{
          flex: '1 0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '100vh',
          background: 'var(--bg-projects)',
          padding: { xs: '2rem 0', sm: '3rem 0' },
        }}
      >
        <Container maxWidth="lg" className="container">
          <Typography
            variant="h2"
            component="h2"
            className="projects-section-title"
            sx={{ color: mode === 'dark' ? 'var(--text-light)' : 'var(--text-dark)' }}
          >
            Проекты
          </Typography>
          {memoizedProjects.length > 0 ? (
            <ProjectSlider projects={memoizedProjects} mode={mode} />
          ) : (
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography
                variant="body1"
                sx={{
                  color: 'var(--text-medium)',
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                }}
              >
                Проекты пока недоступны. Ознакомьтесь с нашими услугами!
              </Typography>
              <Button
                variant="outlined"
                onClick={() => navigate('/services')}
                sx={{
                  mt: 2,
                  color: mode === 'dark' ? 'var(--text-light)' : 'var(--text-dark)',
                  borderColor: 'var(--secondary)',
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: 'var(--primary)',
                    background: 'var(--bg-hover)',
                  },
                }}
              >
                Наши услуги
              </Button>
            </Box>
          )}
        </Container>
      </motion.section>
    </Box>
  );
};

export default HomePage;