import { motion } from 'framer-motion';
import { Container, Typography, Box } from '@mui/material';

const PrivacyPage = ({ mode }) => (
  <motion.section
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8 }}
    id="privacy"
    className="about-page"
    sx={{
      minHeight: '100vh',
      background: 'var(--bg-privacy)',
      paddingTop: { xs: '100px', sm: '120px' },
      paddingBottom: { xs: '2rem', sm: '3rem' },
      display: 'flex',
      alignItems: 'flex-start',
    }}
    role="main"
    aria-label="Политика конфиденциальности"
  >
    <Container maxWidth="lg" className="container">
      <Typography
        variant="h2"
        component="h2"
        className="privacy-page-title"
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
        Политика конфиденциальности
      </Typography>
      <Box
        className="about-container"
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr' },
          gap: { xs: 1.5, sm: 2 },
          background: mode === 'dark' ? '#2d3748' : '#ffffff',
          padding: { xs: 1.5, sm: 2 },
          borderRadius: '0.75rem',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box className="about-policy">
          <Typography
            variant="h3"
            component="h3"
            sx={{
              color: mode === 'dark' ? '#ffffff' : '#1e293b',
              fontSize: { xs: '1.2rem', sm: '1.4rem' },
              fontWeight: 700,
              mb: 1,
            }}
          >
            1. Сбор информации
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: mode === 'dark' ? '#9ca3af' : '#4b5563',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              mb: 1.5,
            }}
          >
            Мы собираем информацию, которую вы предоставляете при использовании нашего сайта, включая ваше имя, email и описание проекта, отправленные через форму обратной связи.
          </Typography>
          <Typography
            variant="h3"
            component="h3"
            sx={{
              color: mode === 'dark' ? '#ffffff' : '#1e293b',
              fontSize: { xs: '1.2rem', sm: '1.4rem' },
              fontWeight: 700,
              mb: 1,
            }}
          >
            2. Использование информации
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: mode === 'dark' ? '#9ca3af' : '#4b5563',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              mb: 1,
            }}
          >
            Собранная информация используется для:
          </Typography>
          <Box component="ul" sx={{ pl: 2, color: mode === 'dark' ? '#9ca3af' : '#4b5563', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            <li>Обработки ваших запросов и предоставления услуг.</li>
            <li>Улучшения нашего сайта и клиентского опыта.</li>
            <li>Отправки информационных писем, если вы дали согласие.</li>
          </Box>
          <Typography
            variant="h3"
            component="h3"
            sx={{
              color: mode === 'dark' ? '#ffffff' : '#1e293b',
              fontSize: { xs: '1.2rem', sm: '1.4rem' },
              fontWeight: 700,
              mb: 1,
              mt: 2,
            }}
          >
            3. Защита данных
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: mode === 'dark' ? '#9ca3af' : '#4b5563',
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            Мы применяем технические и организационные меры для защиты вашей информации от несанкционированного доступа, утраты или раскрытия.
          </Typography>
        </Box>
      </Box>
    </Container>
  </motion.section>
);

export default PrivacyPage;