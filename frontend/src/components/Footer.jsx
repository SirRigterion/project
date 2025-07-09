import { motion } from 'framer-motion';
import { Box, Container, Typography, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { GitHub, Telegram } from '@mui/icons-material';

function Footer() {
const socialLinks = [
  { name: 'GitHub', icon: <GitHub />, url: 'https://github.com/SirRigterion' },
  { name: 'Telegram', icon: <Telegram />, url: 'https://t.me/+YnOwmVvdKb0wZDUy' },
];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
      className="footer"
      aria-label="Футер"
    >
      <Container maxWidth="lg" className="container">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" className="footer-text">
            © {new Date().getFullYear()} IT Solutions. Все права защищены.
          </Typography>
          <Box className="links">
            <RouterLink
              to="/privacy"
              style={{ color: 'inherit', textDecoration: 'none', margin: '0 8px' }}
              onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
            >
              Политика конфиденциальности
            </RouterLink>
            <RouterLink
              to="/terms"
              style={{ color: 'inherit', textDecoration: 'none', margin: '0 8px' }}
              onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
            >
              Условия использования
            </RouterLink>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {socialLinks.map((link) => (
              <motion.div key={link.name} whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
                <IconButton
                  component="a"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  sx={{ color: 'var(--text-light)' }}
                >
                  {link.icon}
                </IconButton>
              </motion.div>
            ))}
          </Box>
        </Box>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body2" sx={{ color: 'var(--text-lighter)' }}>
            Свяжитесь с нами:{' '}
            <a
              href="mailto:itsolutionsworktech@gmail.com"
              style={{ color: 'inherit', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
            >
              itsolutionsworktech@gmail.com
            </a>
          </Typography>
        </Box>
      </Container>
    </motion.footer>
  );
}

export default Footer;