import { motion } from 'framer-motion';
import { Container, Typography, Box } from '@mui/material';

const TermsPage = ({ mode }) => (
  <motion.section
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8 }}я
    id="terms"
    className="terms-page"
    sx={{
      minHeight: '100vh',
      background: 'var(--bg-terms)',
      paddingTop: { xs: '100px', sm: '120px' },
      paddingBottom: { xs: '2rem', sm: '3rem' },
      display: 'flex',
      alignItems: 'flex-start',
    }}
    role="main"
    aria-label="Условия использования"
  >
    <Container maxWidth="lg" className="container">
      <Typography
        variant="h2"
        component="h2"
        className="terms-page-title"
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
        Условия использования
      </Typography>
      <Box
        className="terms-container"
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr' },
          gap: { xs: 1.5, sm: 2 },
          background: 'var(--card-bg)',
          padding: { xs: 1.5, sm: 2 },
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <Box className="about-policy">
          <Typography
            variant="h3"
            component="h3"
            sx={{
              color: mode === 'dark' ? 'var(--text-light)' : 'var(--text-dark)',
              fontSize: { xs: '1.2rem', sm: '1.4rem' },
              fontWeight: 700,
              mb: 1,
            }}
          >
            1. Общие положения
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'var(--text-medium)',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              mb: 1.5,
            }}
          >
            Настоящие Условия использования (далее — «Условия») регулируют использование нашего веб-сайта и услуг. Используя наш сайт, вы соглашаетесь с данными Условиями.
          </Typography>
          <Typography
            variant="h3"
            component="h3"
            sx={{
              color: mode === 'dark' ? 'var(--text-light)' : 'var(--text-dark)',
              fontSize: { xs: '1.2rem', sm: '1.4rem' },
              fontWeight: 700,
              mb: 1,
            }}
          >
            2. Использование услуг
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'var(--text-medium)',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              mb: 1,
            }}
          >
            Вы обязуетесь использовать наши услуги только в законных целях. Запрещается:
          </Typography>
          <Box component="ul" sx={{ pl: 2, color: 'var(--text-medium)', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            <li>Нарушать применимое законодательство.</li>
            <li>Пытаться получить несанкционированный доступ к нашим системам.</li>
          </Box>
          <Typography
            variant="h3"
            component="h3"
            sx={{
              color: mode === 'dark' ? 'var(--text-light)' : 'var(--text-dark)',
              fontSize: { xs: '1.2rem', sm: '1.4rem' },
              fontWeight: 700,
              mb: 1,
              mt: 2,
            }}
          >
            3. Ответственность
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'var(--text-medium)',
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            Мы не несем ответственности за любой ущерб, возникший в результате использования нашего сайта или услуг, за исключением случаев, предусмотренных законом.
          </Typography>
        </Box>
      </Box>
    </Container>
  </motion.section>
);

export default TermsPage;