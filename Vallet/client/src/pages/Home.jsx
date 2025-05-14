import { Typography, Button, Box, Container, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import HeroSection from '../sections/HeroSection';
import FeaturesSection from '../sections/FeaturesSection';
import SimulationSection from '../sections/SimulationSection';
import SecuritySection from '../sections/SecuritySection';


function Home() {
  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        {/* Hero Section 
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" gutterBottom>
            Welcome to <strong>Vallet 🪙</strong>
          </Typography>
          <Typography variant="h5" gutterBottom>
            Invest. Simulate. Learn. Repeat.
          </Typography>
          <Box sx={{ mt: 4 }}>
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
            >
              Explore Stocks
            </Button>
          </Box>
        </Box> */}
        <>
      <HeroSection />
      <FeaturesSection />
      <SimulationSection />
      <SecuritySection />
    </>

        {/* Feature Highlights */}
        <Grid container spacing={4}>
          {[
            { title: 'Track Portfolio', desc: 'See all your investments in one place.' },
            { title: 'Simulated Trading', desc: 'Buy/Sell without real money.' },
            { title: 'Real-Time Insights', desc: 'Live price tracking. AI coming soon!' }
          ].map((feature, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Card elevation={4} sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{feature.title}</Typography>
                  <Typography variant="body2">{feature.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
    
  );
}

export default Home;
