import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const dummyStocks = [
  { id: 'RELIANCE', name: 'Reliance Industries', price: 2700 },
  { id: 'TCS', name: 'Tata Consultancy Services', price: 3600 },
  { id: 'HDFCBANK', name: 'HDFC Bank', price: 1600 },
  { id: 'ITC', name: 'ITC Limited', price: 420 },
];

function Stocks() {
  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>📈 Stocks</Typography>

      <Grid container spacing={3}>
        {dummyStocks.map((stock) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={stock.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6">{stock.name}</Typography>
                <Typography variant="body2">₹{stock.price}</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  component={Link}
                  to={`/stocks/${stock.id}`}
                  sx={{ marginTop: '1rem' }}
                >
                    
                  View
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Stocks;
