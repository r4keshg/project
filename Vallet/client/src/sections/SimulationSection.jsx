import { useEffect, useRef } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function SimulationSection() {
  const sectionRef = useRef();
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRefs.current, {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <Box
      ref={sectionRef}
      sx={{
        minHeight: '100vh',
        bgcolor: '#0f172a',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        px: 4,
        py: 10,
      }}
    >
      <Typography variant="h3" gutterBottom textAlign="center" fontWeight={600}>
        🧪 Try Before You Trade
      </Typography>
      <Typography variant="subtitle1" textAlign="center" maxWidth={600} mb={6}>
        Experience simulation trading — buy, sell, and manage stocks without any risk.
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 4,
          mt: 4,
        }}
      >
        {[1, 2, 3].map((_, i) => (
          <Card
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
            sx={{
              width: 280,
              bgcolor: '#1e293b',
              color: 'white',
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Simulated Stock {i + 1}
              </Typography>
              <Typography variant="body2">
                Buy/Sell functionality, mock balances, and virtual profits.
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default SimulationSection;
