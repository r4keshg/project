import { Box, Typography, Grid, Link, TextField, Button } from '@mui/material';
import { useTheme } from '@mui/material';
function FooterSection() {
  return (
    <Box sx={{ bgcolor: '#e0e7ff', color: '#1e293b', py: 10, px: 4 }}>
      <Grid container spacing={6} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            🪙 Vallet
          </Typography>
          <Typography variant="body2">
            Smart investing for Gen Z & Gen X. Learn. Simulate. Track.
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Subscribe to Updates
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Enter your email"
            fullWidth
            sx={{ bgcolor: 'white', borderRadius: 1, mb: 2 }}
          />
          <Button variant="contained" color="primary">
            Subscribe
          </Button>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <Link href="/" color="inherit" underline="hover" display="block">Home</Link>
          <Link href="/portfolio" color="inherit" underline="hover" display="block">Portfolio</Link>
          <Link href="/stocks" color="inherit" underline="hover" display="block">Stocks</Link>
        </Grid>
      </Grid>

      <Box textAlign="center" mt={8}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Vallet. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default FooterSection;