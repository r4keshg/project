// src/sections/FeaturesSection.jsx

import { Box, Grid, Card, CardContent, Typography,useTheme } from '@mui/material';
import { motion } from 'framer-motion';
const features = [
  {
    title: '📊 Track Your Portfolio',
    desc: 'Monitor all your holdings and investments in one sleek dashboard.'
  },
  {
    title: '🧪 Simulate Before You Trade',
    desc: 'Practice investing with virtual money. No risk, just learning.'
  },
  {
    title: '📚 Learn Financial Concepts',
    desc: 'Interactive guides and explainers tailored for Gen Z & Gen X.'
  },
];
function FeaturesSection() {
    const theme =useTheme();

function FeaturesSection() {
  return (
    <Box sx={{ minHeight: '100vh', py: 10, px: 4, bgcolor: '#f3e8ff', color: 'text.primary' }}>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <Typography variant="h3" align="center" gutterBottom fontWeight={600}>
          Track, Learn, Grow
        </Typography>
        <Typography variant="subtitle1" align="center" maxWidth={600} mx="auto" mb={6}>
          Everything you need to take control of your financial journey
        </Typography>
      </motion.div>

      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/*<Card elevation={4} sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{feature.title}</Typography>
                  <Typography variant="body2">{feature.desc}</Typography>
                </CardContent>
              </Card>*/}
              <Card
  elevation={4}
  sx={{
    height: '100%',
    transition: 'transform 0.3s ease, background-color 0.3s ease',
    '&:hover': {
      transform: 'translateY(-8px)',
      backgroundColor: theme.palette.mode === 'dark' ? '#1f2937' : '#f0f9ff',
    },
  }}
></Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
}

export default FeaturesSection;
