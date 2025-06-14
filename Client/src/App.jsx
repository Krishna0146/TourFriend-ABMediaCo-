import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { 
  CssBaseline, 
  Container, 
  Typography, 
  Box, 
  Card,
  CardMedia,
  CardContent,
  Grid,
  Chip,
  Skeleton,
  Alert,
  Badge,
  Fab,
  IconButton,
  Tooltip,
  Paper,
  Avatar,
  Divider,
  Button,
  useScrollTrigger,
  Slide,
  AppBar,
  Toolbar
} from '@mui/material';
import { 
  FaMapMarkerAlt, 
  FaStar, 
  FaClock, 
  FaTag, 
  FaFire, 
  FaHeart,
  FaShare,
  FaArrowUp,
  FaPhone,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaCalendarAlt,
  FaUsers,
  FaCertificate,
  FaGift,
  FaLocationArrow
} from 'react-icons/fa';

// Create a query client with enhanced configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
});

// Enhanced professional theme with more sophisticated colors
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb',
      light: '#60a5fa',
      dark: '#1d4ed8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
    },
  },
  typography: {
    fontFamily: '"Inter", "Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '4rem',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2.25rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      letterSpacing: '0.01em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 4px 32px rgba(0,0,0,0.06)',
          border: '1px solid rgba(255,255,255,0.2)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            transform: 'translateY(-12px) scale(1.02)',
            boxShadow: '0 32px 64px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 32px',
          fontSize: '1rem',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 500,
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
      },
    },
  },
});

// Scroll to top button component
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Slide direction="up" in={visible} mountOnEnter unmountOnExit>
      <Fab
        color="primary"
        size="medium"
        onClick={scrollToTop}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          boxShadow: '0 8px 24px rgba(37, 99, 235, 0.4)',
          '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: '0 12px 32px rgba(37, 99, 235, 0.6)',
          },
        }}
      >
        <FaArrowUp />
      </Fab>
    </Slide>
  );
};

// Animated particles background component
const ParticlesBackground = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {[...Array(50)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 10}s`,
            '@keyframes float': {
              '0%, 100%': { 
                transform: 'translateY(0px) translateX(0px) scale(1)',
                opacity: 0.3,
              },
              '50%': { 
                transform: `translateY(${Math.random() * 40 - 20}px) translateX(${Math.random() * 40 - 20}px) scale(1.2)`,
                opacity: 0.8,
              },
            },
          }}
        />
      ))}
    </Box>
  );
};

// Enhanced main hero section component
const MainSection = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ['Amazing', 'Incredible', 'Beautiful', 'Magical', 'Stunning'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        color: 'white',
        py: { xs: 8, md: 16 },
        mb: 8,
        overflow: 'hidden',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        },
      }}
    >
      <ParticlesBackground />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              {/* Animated title */}
              <Typography
                variant="h1"
                sx={{
                  mb: 3,
                  background: 'linear-gradient(45deg, #fff 30%, #f0f8ff 70%, #e6f3ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'fadeInUp 1s ease-out',
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  '@keyframes fadeInUp': {
                    from: { opacity: 0, transform: 'translateY(50px)' },
                    to: { opacity: 1, transform: 'translateY(0)' },
                  },
                }}
              >
                Discover{' '}
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(45deg, #fbbf24 30%, #f59e0b 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'colorChange 2s ease-in-out infinite',
                    '@keyframes colorChange': {
                      '0%, 100%': { opacity: 1 },
                      '50%': { opacity: 0.7 },
                    },
                  }}
                >
                  {words[currentWordIndex]}
                </Box>{' '}
                India
              </Typography>

              {/* Subtitle */}
              <Typography
                variant="h4"
                sx={{
                  opacity: 0.95,
                  mb: 4,
                  fontWeight: 400,
                  animation: 'fadeInUp 1s ease-out 0.3s both',
                  fontSize: { xs: '1.25rem', md: '1.75rem' },
                }}
              >
                Explore incredible destinations and create unforgettable memories
                with our handcrafted travel experiences
              </Typography>

              {/* Feature highlights */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                {[
                  { icon: FaCertificate, text: 'Certified Tours' },
                  { icon: FaUsers, text: '50k+ Happy Travelers' },
                  { icon: FaGift, text: 'Best Price Guarantee' },
                ].map((item, index) => (
                  <Chip
                    key={index}
                    icon={<item.icon style={{ fontSize: '16px' }} />}
                    label={item.text}
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontWeight: 600,
                      px: 2,
                      py: 1,
                      fontSize: '0.9rem',
                      animation: `fadeInUp 1s ease-out ${0.6 + index * 0.2}s both`,
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.3)',
                    }}
                  />
                ))}
              </Box>

              {/* CTA Buttons */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    background: 'linear-gradient(45deg, #f59e0b 30%, #fbbf24 100%)',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    animation: 'fadeInUp 1s ease-out 0.9s both',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #d97706 30%, #f59e0b 100%)',
                    },
                  }}
                  startIcon={<FaLocationArrow />}
                >
                  Explore Destinations
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'rgba(255,255,255,0.5)',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    animation: 'fadeInUp 1s ease-out 1.1s both',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                  startIcon={<FaWhatsapp />}
                >
                  Get Quote
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Hero Image/Stats Section */}
          <Grid item xs={12} md={5}>
            <Box sx={{ position: 'relative', textAlign: 'center' }}>
              {/* Floating stats cards */}
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                {[
                  { number: '500+', label: 'Destinations', icon: FaMapMarkerAlt, position: { top: '10%', left: '-20%' } },
                  { number: '4.8/5', label: 'Rating', icon: FaStar, position: { top: '60%', right: '-20%' } },
                  { number: '24/7', label: 'Support', icon: FaPhone, position: { bottom: '10%', left: '-10%' } },
                ].map((stat, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      position: 'absolute',
                      ...stat.position,
                      background: 'rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      borderRadius: 3,
                      p: 2,
                      textAlign: 'center',
                      animation: `float 6s ease-in-out infinite ${index * 0.5}s`,
                      '@keyframes float': {
                        '0%, 100%': { transform: 'translateY(0px)' },
                        '50%': { transform: 'translateY(-10px)' },
                      },
                    }}
                  >
                    <stat.icon style={{ fontSize: '24px', color: '#fbbf24', marginBottom: '8px' }} />
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                      {stat.number}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                      {stat.label}
                    </Typography>
                  </Paper>
                ))}
                
                {/* Central decorative element */}
                <Box
                  sx={{
                    width: 200,
                    height: 200,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid rgba(255,255,255,0.3)',
                    animation: 'pulse 4s ease-in-out infinite',
                    '@keyframes pulse': {
                      '0%, 100%': { transform: 'scale(1)', opacity: 0.8 },
                      '50%': { transform: 'scale(1.05)', opacity: 1 },
                    },
                  }}
                >
                  <FaLocationArrow style={{ fontSize: '48px', color: '#fbbf24' }} />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// Enhanced destinations section with better animations and interactions
const DestinationsSection = () => {
  const [favorites, setFavorites] = useState(new Set());

  // Fetch destinations data
  const { data: destinationsData, isLoading, error } = useQuery({
    queryKey: ['destinations'],
    queryFn: async () => {
      const response = await fetch('http://localhost:5000/api/destinations');
      if (!response.ok) {
        throw new Error('Failed to fetch destinations');
      }
      const data = await response.json();
      
      // Debug logs
      console.log('🏖️ Full API Response:', data);
      console.log('🏖️ Destinations array:', data.data || data);
      console.log('🖼️ First destination:', (data.data || data)?.[0]);
      console.log('🖼️ First destination images:', (data.data || data)?.[0]?.images);
      
      return data;
    },
  });

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  // Enhanced loading skeleton with shimmer effect
  const LoadingSkeleton = () => (
    <Grid container spacing={3}>
      {[...Array(8)].map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card
            sx={{
              height: 400,
              background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s infinite',
              '@keyframes shimmer': {
                '0%': { backgroundPosition: '-200% 0' },
                '100%': { backgroundPosition: '200% 0' },
              },
            }}
          >
            <Skeleton variant="rectangular" height={220} animation="wave" />
            <CardContent>
              <Skeleton variant="text" height={32} animation="wave" />
              <Skeleton variant="text" height={20} width="60%" animation="wave" />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Skeleton variant="text" width={80} animation="wave" />
                <Skeleton variant="text" width={60} animation="wave" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  if (error) {
    return (
      <Alert 
        severity="error" 
        sx={{ 
          mb: 4, 
          borderRadius: 3,
          '& .MuiAlert-icon': {
            fontSize: '24px',
          },
        }}
      >
        <Typography variant="h6">Oops! Something went wrong</Typography>
        <Typography variant="body2">Failed to load destinations. Please try again later.</Typography>
      </Alert>
    );
  }

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      {/* Section Header */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography
          variant="h2"
          sx={{
            mb: 2,
            background: 'linear-gradient(45deg, #2563eb 30%, #60a5fa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 60,
              height: 4,
              background: 'linear-gradient(45deg, #2563eb 30%, #60a5fa 100%)',
              borderRadius: 2,
            },
          }}
        >
          Explore Most Popular Destinations
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ 
            mt: 3,
            fontSize: '1.2rem',
            maxWidth: 600,
            mx: 'auto',
            lineHeight: 1.6,
          }}
        >
          Discover breathtaking locations across incredible India, from majestic mountains to pristine beaches
        </Typography>
      </Box>

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <Grid container spacing={3}>
          {destinationsData?.data?.map((destination, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={destination._id}
              sx={{
                animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
                '@keyframes slideInUp': {
                  from: { opacity: 0, transform: 'translateY(50px)' },
                  to: { opacity: 1, transform: 'translateY(0)' },
                },
              }}
            >
              <Card
                sx={{
                  height: 400, // Fixed height for all cards
                  width: '300px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover .card-media': {
                    transform: 'scale(1.15)',
                  },
                  '&:hover .card-overlay': {
                    opacity: 1,
                  },
                  '&:hover .action-buttons': {
                    transform: 'translateY(0)',
                    opacity: 1,
                  },
                }}
              >
                {/* Fixed Image Section */}
                <Box sx={{ 
                  position: 'relative', 
                  overflow: 'hidden', 
                  height: 220, // Fixed height for images
                  width: '100%',
                  flexShrink: 0 
                }}>
                 <CardMedia
                    component="img"
                    src={destination.image || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=220&fit=crop'}
                    alt={destination.name}
                    className="card-media"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=220&fit=crop';
                    }}
                    sx={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                      backgroundColor: '#f3f4f6', // Fallback background
                    }}
                  />
                  {/* Gradient overlay */}
                  <Box
                    className="card-overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, rgba(37, 99, 235, 0.8) 0%, rgba(245, 158, 11, 0.6) 100%)',
                      opacity: 0,
                      transition: 'opacity 0.4s ease',
                    }}
                  />
                  
                  {/* Action buttons */}
                  <Box
                    className="action-buttons"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      display: 'flex',
                      gap: 1,
                      transform: 'translateY(-20px)',
                      opacity: 0,
                      transition: 'all 0.4s ease',
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(destination._id);
                      }}
                      sx={{
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        backdropFilter: 'blur(10px)',
                        '&:hover': {
                          backgroundColor: 'white',
                          transform: 'scale(1.1)',
                        },
                      }}
                    >
                      <FaHeart 
                        style={{ 
                          color: favorites.has(destination._id) ? '#ef4444' : '#64748b',
                          fontSize: '14px'
                        }} 
                      />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        backdropFilter: 'blur(10px)',
                        '&:hover': {
                          backgroundColor: 'white',
                          transform: 'scale(1.1)',
                        },
                      }}
                    >
                      <FaShare style={{ color: '#64748b', fontSize: '14px' }} />
                    </IconButton>
                  </Box>
                  
                  {/* Hot badge */}
                  {destination.isPopular && (
                    <Chip
                      icon={<FaFire style={{ fontSize: '12px' }} />}
                      label="Hot"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        backgroundColor: '#ef4444',
                        color: 'white',
                        fontWeight: 600,
                        animation: 'pulse 2s ease-in-out infinite',
                        '@keyframes pulse': {
                          '0%, 100%': { transform: 'scale(1)' },
                          '50%': { transform: 'scale(1.05)' },
                        },
                      }}
                    />
                  )}
                </Box>
                
                {/* Fixed Content Section */}
                <CardContent sx={{ 
                  p: 2,
                  height: 180, // Fixed height for content
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 700, 
                        mb: 1, 
                        color: 'text.primary',
                        fontSize: '1rem',
                        lineHeight: 1.2,
                        height: '2.4em', // Fixed height for title
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {destination.name}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <FaMapMarkerAlt style={{ color: '#f59e0b', marginRight: '6px', fontSize: '12px' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, fontSize: '0.85rem' }}>
                        {destination.country}
                      </Typography>
                    </Box>
                    
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mb: 1.5, 
                        lineHeight: 1.4,
                        fontSize: '0.8rem',
                        height: '2.8em', // Fixed height for description
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {destination.description}
                    </Typography>
                  </Box>
                  
                  {/* Bottom section */}
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                  }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                        {destination.reviewCount} reviews
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            style={{
                              fontSize: '11px',
                              color: i < Math.floor(destination.rating) ? '#f59e0b' : '#e5e7eb',
                              marginRight: '1px',
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                        Starting from
                      </Typography>
                      <Typography variant="h6" color="primary" sx={{ fontWeight: 700, fontSize: '1rem' }}>
                        ₹{destination.price?.toLocaleString() || 'N/A'}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

// Enhanced packages section with premium styling and interactions
const PackagesSection = () => {
  const [favorites, setFavorites] = useState(new Set());

  // Fetch packages data
  const { data: packagesData, isLoading, error } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      const response = await fetch('http://localhost:5000/api/packages/top-selling');
      if (!response.ok) {
        throw new Error('Failed to fetch packages');
      }
      const data = await response.json();
      
      // Debug logs
      console.log('📦 Full API Response:', data);
      console.log('📦 Packages array:', data.data || data);
      console.log('🖼️ First package:', (data.data || data)?.[0]);
      console.log('🖼️ First package images:', (data.data || data)?.[0]?.images);
      
      return data;
    },
  });

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  // Enhanced loading skeleton
  const LoadingSkeleton = () => (
    <Grid container spacing={3}>
      {[...Array(8)].map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card
            sx={{
              height: 480,
              background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s infinite',
            }}
          >
            <Skeleton variant="rectangular" height={220} animation="wave" />
            <CardContent>
              <Skeleton variant="text" height={32} animation="wave" />
              <Skeleton variant="text" height={20} animation="wave" />
              <Skeleton variant="text" height={20} width="80%" animation="wave" />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Skeleton variant="text" width={100} animation="wave" />
                <Skeleton variant="text" width={80} animation="wave" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  if (error) {
    return (
      <Alert 
        severity="error" 
        sx={{ 
          mb: 4, 
          borderRadius: 3,
          '& .MuiAlert-icon': {
            fontSize: '24px',
          },
        }}
      >
        <Typography variant="h6">Unable to load packages</Typography>
        <Typography variant="body2">Failed to load tour packages. Please try again later.</Typography>
      </Alert>
    );
  }

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      {/* Section Header */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography
          variant="h2"
          sx={{
            mb: 2,
            background: 'linear-gradient(45deg, #f59e0b 30%, #fbbf24 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 60,
              height: 4,
              background: 'linear-gradient(45deg, #f59e0b 30%, #fbbf24 100%)',
              borderRadius: 2,
            },
          }}
        >
          Top Selling Tour Packages of India
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ 
            mt: 3,
            fontSize: '1.2rem',
            maxWidth: 600,
            mx: 'auto',
            lineHeight: 1.6,
          }}
        >
          Handpicked experiences for unforgettable journeys, curated by travel experts
        </Typography>
      </Box>

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <Grid container spacing={3}>
          {packagesData?.data?.map((pkg, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={pkg._id}
              sx={{
                animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
                '@keyframes slideInUp': {
                  from: { opacity: 0, transform: 'translateY(50px)' },
                  to: { opacity: 1, transform: 'translateY(0)' },
                },
              }}
            >
              <Card
                sx={{
                  height: 480, // Fixed height for all package cards
                  width: '100%',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover .card-media': {
                    transform: 'scale(1.15)',
                  },
                  '&:hover .price-overlay': {
                    transform: 'translateY(0)',
                  },
                  '&:hover .action-buttons': {
                    transform: 'translateY(0)',
                    opacity: 1,
                  },
                }}
              >
                {/* Fixed Image Section */}
                <Box sx={{ 
                  position: 'relative', 
                  overflow: 'hidden', 
                  height: 220, // Fixed height for images
                  width: '100%',
                  flexShrink: 0 
                }}>
                  <CardMedia
                  component="img"
                  src={pkg.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=220&fit=crop'}
                  alt={pkg.title}
                  className="card-media"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=220&fit=crop';
                  }}
                  sx={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    backgroundColor: '#f3f4f6', // Fallback background
                  }}
                />
                  {/* Price overlay */}
                  <Box
                    className="price-overlay"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                      color: 'white',
                      p: 2,
                      transform: 'translateY(100%)',
                      transition: 'transform 0.4s ease',
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      ₹{pkg.price?.toLocaleString() || 'N/A'}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      per person
                    </Typography>
                  </Box>
                  
                  {/* Action buttons */}
                  <Box
                    className="action-buttons"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      display: 'flex',
                      gap: 1,
                      transform: 'translateY(-20px)',
                      opacity: 0,
                      transition: 'all 0.4s ease',
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(pkg._id);
                      }}
                      sx={{
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        backdropFilter: 'blur(10px)',
                        '&:hover': {
                          backgroundColor: 'white',
                          transform: 'scale(1.1)',
                        },
                      }}
                    >
                      <FaHeart 
                        style={{ 
                          color: favorites.has(pkg._id) ? '#ef4444' : '#64748b',
                          fontSize: '14px'
                        }} 
                      />
                    </IconButton>
                  </Box>
                  
                  {/* Category badge */}
                  <Chip
                    label={pkg.category}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                    }}
                  />
                </Box>
                
                {/* Fixed Content Section */}
                <CardContent sx={{ 
                  p: 2,
                  height: 260, // Fixed height for content
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 700, 
                        mb: 1, 
                        color: 'text.primary',
                        fontSize: '1rem',
                        lineHeight: 1.2,
                        height: '2.4em', // Fixed height for title
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {pkg.title}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FaClock style={{ color: '#2563eb', marginRight: '4px', fontSize: '11px' }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, fontSize: '0.75rem' }}>
                          {pkg.duration}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FaMapMarkerAlt style={{ color: '#f59e0b', marginRight: '4px', fontSize: '11px' }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, fontSize: '0.75rem' }}>
                          {pkg.destination}
                        </Typography>
                      </Box>
                    </Box>
                    
                    {/* Highlights with fixed height */}
                    <Box sx={{ 
                      mb: 1.5, 
                      height: '60px', // Fixed height for highlights
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      alignContent: 'flex-start',
                      overflow: 'hidden' 
                    }}>
                      {pkg.highlights?.slice(0, 3).map((highlight, idx) => (
                        <Chip
                          key={idx}
                          label={highlight}
                          size="small"
                          variant="outlined"
                          sx={{ 
                            mr: 0.5, 
                            mb: 0.5, 
                            fontSize: '0.65rem',
                            height: 20,
                            borderColor: 'primary.light',
                            color: 'primary.main',
                            '&:hover': {
                              backgroundColor: 'primary.light',
                              color: 'white',
                            },
                          }}
                        />
                      ))}
                      {pkg.highlights?.length > 3 && (
                        <Chip
                          label={`+${pkg.highlights.length - 3}`}
                          size="small"
                          variant="filled"
                          sx={{ 
                            mb: 0.5,
                            fontSize: '0.65rem',
                            height: 20,
                            backgroundColor: 'secondary.light',
                            color: 'white',
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                  
                  <Divider sx={{ my: 1 }} />
                  
                  {/* Bottom section */}
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                  }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                        {pkg.reviewCount} reviews • {pkg.salesCount} sold
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            style={{
                              fontSize: '11px',
                              color: i < Math.floor(pkg.rating) ? '#f59e0b' : '#e5e7eb',
                              marginRight: '1px',
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                        Starting from
                      </Typography>
                      <Typography variant="h6" color="primary" sx={{ fontWeight: 700, fontSize: '1rem' }}>
                        ₹{pkg.price?.toLocaleString() || 'N/A'}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

// Enhanced footer component
const Footer = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        color: 'white',
        pt: 6,
        pb: 4,
        mt: 8,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="1.5"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#fbbf24' }}>
              TravelIndia
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.7, opacity: 0.9 }}>
              Discover the beauty of India with our expertly crafted travel experiences. 
              From the majestic Himalayas to the serene backwaters of Kerala, we make your journey unforgettable.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {[
                { icon: FaFacebook, color: '#1877f2' },
                { icon: FaTwitter, color: '#1da1f2' },
                { icon: FaInstagram, color: '#e4405f' },
                { icon: FaWhatsapp, color: '#25d366' },
              ].map((social, index) => (
                <IconButton
                  key={index}
                  sx={{
                    backgroundColor: social.color,
                    color: 'white',
                    width: 40,
                    height: 40,
                    '&:hover': {
                      backgroundColor: social.color,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 8px 24px ${social.color}40`,
                    },
                  }}
                >
                  <social.icon />
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Quick Links
            </Typography>
            {['Destinations', 'Packages', 'About Us', 'Contact', 'Blog', 'Reviews'].map((link) => (
              <Typography
                key={link}
                variant="body2"
                sx={{
                  mb: 1,
                  opacity: 0.8,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    opacity: 1,
                    color: '#fbbf24',
                    paddingLeft: 1,
                  },
                }}
              >
                {link}
              </Typography>
            ))}
          </Grid>

          {/* Services */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Our Services
            </Typography>
            {['Honeymoon Packages', 'Adventure Tours', 'Cultural Tours', 'Wildlife Safari', 'Pilgrimage Tours', 'Corporate Tours'].map((service) => (
              <Typography
                key={service}
                variant="body2"
                sx={{
                  mb: 1,
                  opacity: 0.8,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    opacity: 1,
                    color: '#fbbf24',
                    paddingLeft: 1,
                  },
                }}
              >
                {service}
              </Typography>
            ))}
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FaPhone style={{ marginRight: '12px', color: '#fbbf24' }} />
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                +91 9876543210
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FaEnvelope style={{ marginRight: '12px', color: '#fbbf24' }} />
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                info@travelindia.com
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              <FaMapMarkerAlt style={{ marginRight: '12px', color: '#fbbf24', marginTop: '4px' }} />
              <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
                123 Travel Street, Tourism District, New Delhi, India
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.2)' }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © 2024 TravelIndia. All rights reserved. | Privacy Policy | Terms of Service
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FaCertificate style={{ color: '#fbbf24' }} />
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Certified by Ministry of Tourism, Govt. of India
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

// Main App Component with all enhancements
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ 
          minHeight: '100vh', 
          backgroundColor: 'background.default',
          width: '100%',
          margin: 0,
          padding: 0,
          position: 'relative',
        }}>
          {/* Main Hero Section */}
          <MainSection />
          
          {/* Content Sections */}
          <Container maxWidth="xl" sx={{ px: { xs: 2, md: 3 }, pb: 0 }}>
          {/* Destinations Section */}
          <Box sx={{ mb: 8, width: '100%' }}>
            <DestinationsSection />
          </Box>
          {/* Packages Section */}
          <Box sx={{ mb: 8, width: '100%' }}>
            <PackagesSection />
          </Box>
        </Container>
          {/* Footer */}
          <Footer />
          
          {/* Scroll to Top Button */}
          <ScrollToTop />
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

// Add this helper function after your constants
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  return `${API_BASE_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};