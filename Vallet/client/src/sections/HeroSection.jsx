// src/sections/HeroSection.jsx

import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" gutterBottom>
            Welcome to <strong>Vallet 🪙</strong>
          </Typography>
          </Box>
      <Box
      
        sx={{
          minHeight: '100vh',
          bgcolor: 'linear-gradient(135deg, #000428 0%, #004e92 100%, #fdeadc 30%)',
          color: ' #fdeadc',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          pt: 12,
          px: 4,
          background: 'linear-gradient(135deg, #000428 0%, #004e92 100%, #fdeadc 30% )'
        }}
      >
        <Typography variant="h2" fontWeight={700} gutterBottom>
          Your Financial Playground 🎢
        </Typography>

        <Typography variant="h6" maxWidth="600px">
          Learn. Simulate. Grow. Vallet is your all-in-one personal finance companion made for Gen Z and Gen X.
        </Typography>

        <Box mt={4}>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/signup"
            sx={{ mr: 2 }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            to="/stocks"
            sx={{ borderColor: 'white', color: 'white' }}
          >
            Explore Stocks
          </Button>
        </Box>
      </Box>
    </motion.div>
  );
}

export default HeroSection;