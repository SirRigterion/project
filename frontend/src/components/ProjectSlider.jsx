import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ProjectSlider = ({ projects, mode }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Fixed: Start at 0
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [touchStartX, setTouchStartX] = useState(null);
  const carouselRef = useRef(null);
  const isXs = useMediaQuery('(max-width:600px)');
  const isSm = useMediaQuery('(min-width:600px) and (max-width:960px)');

  const itemsPerView = isXs ? 1 : isSm ? 2 : 3;
  const itemWidth = 100 / itemsPerView;

  // Create extended projects array for infinite loop
  const extendedProjects = projects && projects.length > 0
    ? [
        ...projects.slice(-itemsPerView),
        ...projects,
        ...projects.slice(0, itemsPerView),
      ]
    : [];

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  useEffect(() => {
    if (!projects || projects.length === 0) {
      return; // Skip effect if no projects
    }

    const handleTransitionEnd = () => {
      if (currentIndex <= itemsPerView - 1) {
        setIsTransitioning(false);
        setCurrentIndex(currentIndex + projects.length);
      } else if (currentIndex >= projects.length + itemsPerView) {
        setIsTransitioning(false);
        setCurrentIndex(currentIndex - projects.length);
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('transitionend', handleTransitionEnd);
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener('transitionend', handleTransitionEnd);
      }
    };
  }, [currentIndex, projects, itemsPerView]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.touches[0].clientX;
    const deltaX = touchStartX - touchEndX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) handleNext();
      else handlePrev();
      setTouchStartX(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStartX(null);
  };

  const arrowColor = '#f8fafc';
  const buttonBackground = 'rgba(30, 41, 59, 0.7)';


  // Early return after all hooks
  if (!projects || projects.length === 0) {
    return (
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
      </Box>
    );
  }

  return (
    <Box
      className="carousel-container"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      sx={{
        position: 'relative',
        outline: 'none',
        overflowX: 'hidden',
      }}
      role="region"
      aria-label="Карусель проектов"
      aria-describedby="carousel-description"
    >
      <p id="carousel-description" className="visually-hidden">
        Карусель с проектами, используйте стрелки или свайпы для навигации
      </p>
      <Button
        className="arrow-btn left"
        onClick={handlePrev}
        aria-label="Предыдущий слайд"
        aria-controls="carousel"
        sx={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          right: { xs: '0.25rem', sm: '0.5rem' },
          background: buttonBackground,
          color: arrowColor,
          borderRadius: '15%',
          padding: { xs: '0.25rem', sm: '0.5rem', md: '0.75rem' },
          minWidth: 'auto',
          opacity: { xs: 0.7, sm: 1 },
          zIndex: 10,
          '&:hover': {
            outline: '2px solid var(--secondary)',
            background: mode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
            color: arrowColor,
          },
          '&:disabled': {
            opacity: 0.3,
            cursor: 'not-allowed',
          },
        }}
      >
        <ArrowBackIosIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.75rem' }, color: arrowColor }} />
      </ Button>
      <Box
        id="carousel"
        ref={carouselRef}
        className="carousel"
        sx={{
          display: 'flex',
          transform: `translateX(-${currentIndex * itemWidth}%)`,
          transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
          width: '100%',
        }}
      >
        {extendedProjects.map((project, index) => (
          <Box
            key={`${project.id}-${index}`}
            className="carousel-item"
            sx={{
              flex: `0 0 ${itemWidth}%`,
              boxSizing: 'border-box',
              padding: { xs: '0 0.25rem', sm: '0 0.5rem' },
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="carousel-card"
              sx={{
                background: 'var(--card-bg)',
                borderRadius: 'var(--radius)',
              }}
            >
              <LazyLoadImage
                src={project.img}
                alt={project.title}
                className="carousel-card-img"
                style={{
                  borderRadius: 'var(--radius)',
                  width: '100%',
                  height: 'auto',
                  maxHeight: { xs: '150px', sm: '200px', md: '250px' },
                  objectFit: 'cover',
                }}
              />
              <Box
                className="carousel-card-content"
                sx={{
                  padding: { xs: '0.5rem', sm: '0.75rem', md: '1rem' },
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    color: mode === 'dark' ? 'var(--text-light)' : 'var(--text-dark)',
                    fontWeight: 700,
                    fontSize: { xs: '1rem', sm: '1.25rem' },
                  }}
                >
                  {project.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'var(--text-medium)',
                    mb: 1,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  }}
                >
                  {project.description}
                </Typography>
              </Box>
            </motion.div>
          </Box>
        ))}
      </Box>
      <Button
        className="arrow-btn right"
        onClick={handleNext}
        aria-label="Следующий слайд"
        aria-controls="carousel"
        sx={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          right: { xs: '0.25rem', sm: '0.5rem' },
          background: buttonBackground,
          color: arrowColor,
          borderRadius: '15%',
          padding: { xs: '0.25rem', sm: '0.5rem', md: '0.75rem' },
          minWidth: 'auto',
          opacity: { xs: 0.7, sm: 1 },
          zIndex: 10,
          '&:hover': {
            outline: '2px solid var(--secondary)',
            background: mode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
            color: arrowColor,
          },
          '&:disabled': {
            opacity: 0.3,
            cursor: 'not-allowed',
          },
        }}
      >
        <ArrowForwardIosIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.75rem' }, color: arrowColor }} />
      </Button>
    </Box>
  );
};

export default ProjectSlider;