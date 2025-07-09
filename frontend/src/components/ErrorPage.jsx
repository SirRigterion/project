import { motion } from 'framer-motion';
import { Container, Typography, Box, Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNav } from '../NavContext';

const ErrorPage = ({ mode }) => {
  const { loading, error, fetchNavItems } = useNav();

  const handleRetry = async () => {
    const success = await fetchNavItems();
    if (success) {
      window.location.href = '/';
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      id="not-found"
      className="not-found-page"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: mode === 'dark' ? 'var(--bg-dark)' : 'var(--bg-light)',
      }}
    >
      <Container maxWidth="md" className="container">
        <Typography
          variant="h1"
          component="h1"
          className="not-found-title"
          sx={{
            color: mode === 'dark' ? 'var(--text-light)' : 'var(--text-dark)',
            textAlign: 'center',
            mb: { xs: 2, sm: 3 },
            fontSize: { xs: '4rem', sm: '5rem', md: '6rem' },
            fontWeight: 800,
            letterSpacing: '-0.02em',
            position: 'relative',
            '&::after': {
              content: '""',
              display: 'block',
              width: '80px',
              height: '4px',
              background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
              margin: '0.5rem auto 0',
              borderRadius: '2px',
            },
          }}
        >
          Ошибка
        </Typography>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            color: mode === 'dark' ? 'var(--text-light)' : 'var(--text-dark)',
            textAlign: 'center',
            mb: { xs: 2, sm: 3 },
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
            fontWeight: 600,
          }}
        >
          Данные не загрузились
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            mb: { xs: 4, sm: 6 },
            color: 'var(--text-medium)',
            fontSize: { xs: '1rem', sm: '1.125rem' },
          }}
        >
           {/* {error || 'К сожалению, запрашиваемая страница не загрузилась правильно, попробуйте позже.'} */}
          {'К сожалению, запрашиваемая страница не загрузилась правильно, попробуйте позже.'}
        </Typography>
        <Box sx={{ textAlign: 'center', display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Button
                onClick={handleRetry}
                variant="contained"
                sx={{
                  background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                  color: '#fff',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  borderRadius: '8px',
                  '&:hover': {
                    background: 'linear-gradient(90deg, var(--secondary), var(--primary))',
                  },
                }}
              >
                Попробовать снова
              </Button>
              <Button
                component={Link}
                to="/"
                variant="outlined"
                sx={{
                  color: mode === 'dark' ? 'var(--text-light)' : 'var(--text-dark)',
                  borderColor: 'var(--secondary)',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  borderRadius: '8px',
                  '&:hover': {
                    borderColor: 'var(--primary)',
                    background: 'var(--bg-hover)',
                  },
                }}
              >
                Вернуться на главную
              </Button>
            </>
          )}
        </Box>
      </Container>
    </motion.section>
  );
};

export default ErrorPage;