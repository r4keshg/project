import { useAuth } from '../context/AuthContext';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login('demoUser');
    navigate('/'); // ✅ navigate to home or any other safe route
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h5">Login Page</Typography>
      <Button variant="contained" onClick={handleLogin}>
        Click to Login
      </Button>
    </div>
  );
}

export default Login;
