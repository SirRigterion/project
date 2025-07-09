import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, Typography, Box, Button } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PortfolioPage = ({ mode }) => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

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
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      id="portfolio"
      className="portfolio-page"
      sx={{
        minHeight: '100vh',
        background: 'var(--bg-portfolio)',
        paddingTop: { xs: '80px', sm: '100px' },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="lg" className="container">
        <Typography
          variant="h2"
          component="h2"
          className="portfolio-page-title"
          sx={{
            color: mode === 'dark' ? 'var(--text-light)' : 'var(--text-dark)',
            textAlign: 'center',
            mb: { xs: 4, sm: 6 },
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 800,
            letterSpacing: '-0.02em',
            position: 'relative',
            '&::after': {
              content: '""',
              display: 'block',
              width: '60px',
              height: '4px',
              background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
              margin: '1rem auto 0',
              borderRadius: '2px',
            },
          }}
        >
          Портфолио
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            mb: 3,
            color: 'var(--text-medium)',
            fontSize: { xs: '0.875rem', sm: '1rem' },
          }}
        >
          Мои работы способствующие развитию бизнеса.
        </Typography>
        <Box
          className="portfolio-grid"
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(auto-fit, minmax(280px, 1fr))',
            },
            gap: { xs: 1.5, sm: 2 },
            justifyContent: 'center',
          }}
        >
          {projects.length > 0 ? (
            projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="portfolio-card"
                sx={{
                  background: 'var(--card-bg)',
                  borderRadius: 'var(--radius)',
                  maxWidth: { xs: '100%', sm: '280px' },
                  width: '100%',
                  margin: '0 auto',
                  padding: { xs: 1, sm: 2 },
                }}
                role="article"
                aria-label={`Проект: ${project.title}`}
              >
                <LazyLoadImage
                  src={project.img}
                  alt={project.title}
                  className="portfolio-card-img"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: { xs: '150px', sm: '180px' },
                    objectFit: 'cover',
                    borderRadius: 'var(--radius)',
                  }}
                />
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    color: mode === 'dark' ? 'var(--text-light)' : 'var(--text-dark)',
                    fontSize: { xs: '1rem', sm: '1.25rem' },
                    mt: 1,
                  }}
                >
                  {project.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'var(--text-medium)',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  }}
                >
                  {project.description}
                </Typography>
                <Button
                  variant="contained"
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="carousel-card-button"
                  aria-label={`Подробнее о ${project.title}`}
                  sx={{
                    mt: 1,
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
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    padding: { xs: '4px 8px', sm: '6px 12px' },
                  }}
                >
                  Подробнее
                </Button>
              </motion.div>
            ))
          ) : (
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography
                variant="body1"
                sx={{
                  color: 'var(--text-medium)',
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                }}
              >
                Проекты пока недоступны.
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
        </Box>
      </Container>
    </motion.section>
  );
};

export default PortfolioPage;