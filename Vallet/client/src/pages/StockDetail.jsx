import { useParams } from 'react-router-dom';
import { Typography, Button } from '@mui/material';

// You can later replace this with real API data
const dummyStocks = {
  RELIANCE: { name: 'Reliance Industries', price: 2700 },
  TCS: { name: 'Tata Consultancy Services', price: 3600 },
  HDFCBANK: { name: 'HDFC Bank', price: 1600 },
  ITC: { name: 'ITC Limited', price: 420 },
};

function StockDetail() {
  const { id } = useParams();
  const stock = dummyStocks[id];

  if (!stock) {
    return (
      <div style={{ padding: '2rem' }}>
        <Typography variant="h5">Stock Not Found</Typography>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>{stock.name}</Typography>
      <Typography variant="body1">Symbol: {id}</Typography>
      <Typography variant="body1">Price: ₹{stock.price}</Typography>
      <Button variant="contained" sx={{ marginTop: '1rem' }}>
        Buy Stock (Demo)
      </Button>
    </div>
  );
}

export default StockDetail;
