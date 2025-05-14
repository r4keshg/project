import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { useState, useMemo } from 'react';
// ⬆️ Add import
import Portfolio from './pages/Portfolio';
import ProtectedRoute from './components/ProtectedRoute';
import StockDetail from './pages/StockDetail';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import Stocks from './pages/Stocks';

function App() {
  const [mode, setMode] = useState('light');

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
        ...(mode === 'dark'
          ? {
              background: {
                default: '#0f172a',
                paper: '#1e293b',
              },
              primary: {
                main: '#6366f1',
              },
              text: {
                primary: '#e2e8f0',
                secondary: '#94a3b8',
              },
            }
          : {
              background: {
                default: '#f8fafc',
                paper: '#ffffff',
              },
              primary: {
                main: '#4f46e5',
              },
              text: {
                primary: '#1e293b',
                secondary: '#64748b',
              },
            }),
      },
      typography: {
        fontFamily: 'Poppins, Roboto, sans-serif',
      },
    }), [mode]);
  

  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* ✅ This line is essential */}
      <AuthProvider>
        <Navbar toggleTheme={toggleTheme} mode={mode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/stocks/:id" element={<StockDetail />} />

          <Route
  path="/portfolio"
  element={
    
      <Portfolio />
    
  }
/>
<Route path="/stocks" element={<Stocks />} />


        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
