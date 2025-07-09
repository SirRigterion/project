import { motion } from 'framer-motion';
import { Container, Typography, Box, Button } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ServicesPage = ({ mode }) => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  const fetchServices = async () => {
    try {
      const response = await axios.get('/img/services');
      setServices(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setServices([]); // При ошибке устанавливаем пустой массив
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      id="services"
      className="services-page"
      sx={{
        minHeight: '100vh',
        background: 'var(--bg-portfolio)', // Используем тот же фон, что в PortfolioPage
        paddingTop: { xs: '80px', sm: '100px' },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="lg" className="container">
        <Typography
          variant="h2"
          component="h2"
          className="services-page-title"
          sx={{
            color: mode === 'dark' ? 'var(--text-light)' : 'var(--text-dark)',
            textAlign: 'center',
            mb: { xs: 4, sm: 6 },
            fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
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
          Услуги и цены
        </Typography>
        <Box
          className="services-grid"
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
          {services.length > 0 ? (
            services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="service-card"
                sx={{
                  background: 'var(--card-bg)',
                  borderRadius: 'var(--radius)',
                  maxWidth: { xs: '100%', sm: '280px' },
                  width: '100%',
                  margin: '0 auto',
                  padding: { xs: 1, sm: 2 },
                }}
                role="article"
                aria-label={`Услуга: ${service.title}`}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    color: mode === 'dark' ? 'var(--text-light)' : 'var(--text-dark)',
                    fontSize: { xs: '1rem', sm: '1.25rem' },
                  }}
                >
                  {service.title}
                </Typography>
                <Typography
                  variant="body1"
                  className="price"
                  sx={{
                    color: mode === 'dark' ? 'var(--text-light)' : 'var(--text-dark)',
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    fontWeight: 600,
                  }}
                >
                  {service.price}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'var(--text-medium)',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  }}
                >
                  {service.description}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate('/contacts')} // Используем navigate вместо href
                  className="service-card-button"
                  aria-label={`Заказать ${service.title}`}
                  sx={{
                    mt: 2,
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
                  Заказать
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
                Услуги пока недоступны. Свяжитесь с нами для получения дополнительной информации!
              </Typography>
              <Button
                variant="outlined"
                onClick={() => navigate('/contacts')}
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
                Связаться с нами
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </motion.section>
  );
};

export default ServicesPage;