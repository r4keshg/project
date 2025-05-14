import { Box, Typography, Grid, Card, CardContent, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
function SecuritySection() {
  const theme = useTheme();
  const items = [
    {
      title: '🔐 Insurance Safety',
      desc: 'Basic checklist and guides to help you understand insurance before you opt-in.'
    },
    {
      title: '🏆 Rewards & Badges',
      desc: 'Earn badges and simulated rewards as you learn and grow.'
    },
    {
      title: '🧠 AI Privacy First',
      desc: 'Everything you simulate or learn is yours — no spam, no sharing.'
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: theme.palette.mode === 'dark' ? '#1e293b' : '#fee2e2',
        color: theme.palette.mode === 'dark' ? '#f8fafc' : 'inherit',
        py: 10,
        px: 4
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <Typography variant="h3" align="center" fontWeight={600} gutterBottom>
          Built with Trust in Mind
        </Typography>
        <Typography variant="subtitle1" align="center" maxWidth={600} mx="auto" mb={6}>
          From guides to gamified learning — Vallet is private, fun, and informative
        </Typography>
      </motion.div>

      <Grid container spacing={4} justifyContent="center">
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/*<Card elevation={4} sx={{ bgcolor: theme.palette.mode === 'dark' ? '#0f172a' : 'white', color: theme.palette.mode === 'dark' ? '#e2e8f0' : 'inherit' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{item.title}</Typography>
                  <Typography variant="body2">{item.desc}</Typography>
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

export default SecuritySection;