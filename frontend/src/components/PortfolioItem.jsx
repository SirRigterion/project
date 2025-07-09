import { Box, Typography, Button } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const PortfolioItem = ({ project, reverse }) => {
  if (!project) {
    return null;
  }

  return (
    <Box
      className="portfolio-item"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: reverse ? 'row-reverse' : 'row' },
        alignItems: 'center',
        gap: 4,
        my: 4,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <LazyLoadImage
          src={project.img}
          alt={project.title}
          className="portfolio-item-img"
          style={{
            width: '100%',
            borderRadius: 'var(--radius)',
            transition: 'none',
          }}
        />
      </Box>
      <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
        <Typography variant="h4" component="h3" sx={{ color: 'var(--text-dark)' }}>
          {project.title}
        </Typography>
        <Typography variant="body1" sx={{ color: 'var(--text-medium)', my: 2 }}>
          {project.description}
        </Typography>
        {/* <Button
          variant="contained"
          href={project.link}
          className="portfolio-item-button"
          aria-label={`Подробнее о ${project.title}`}
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
          Подробнее
        </Button> */}
      </Box>
    </Box>
  );
};

export default PortfolioItem;