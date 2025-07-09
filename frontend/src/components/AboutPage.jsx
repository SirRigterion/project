import { motion } from 'framer-motion';
import { Container, Typography, Box } from '@mui/material';

const AboutPage = ({ mode }) => (
  <motion.section
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    id="about"
    className="about-page"
  >
    <Container maxWidth="lg" className="container">
      <Typography
        variant="h2"
        component="h2"
        className="about-page-title"
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
        О проекте
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', mb: 3, color: 'var(--text-medium)' }}>
        Я — специалист, помогающий бизнесу расти с помощью IT-решений.
      </Typography>
      <Box className="about-container">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="about-mission"
        >
          <Typography variant="h6" component="h3">
            Миссия
          </Typography>
          <Typography variant="body2" sx={{ color: 'var(--text-medium)' }}>
            Создавать качественные и доступные IT-решения, которые помогают нашим клиентам достигать их целей.
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="about-policy"
        >
          <Typography variant="h6" component="h3">
            Политика
          </Typography>
          <Typography variant="body2" sx={{ color: 'var(--text-medium)' }}>
            Открытость, профессионализм и индивидуальный подход к каждому проекту.
          </Typography>
        </motion.div>
      </Box>
    </Container>
  </motion.section>
);

export default AboutPage;