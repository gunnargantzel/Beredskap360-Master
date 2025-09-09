import { useState } from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest } from './config/authConfig';
import Dashboard from './components/Dashboard';
import TravelDashboard from './components/TravelDashboard';
import DashboardSwitcher from './components/DashboardSwitcher';
import { Button, Container, Typography, Box, Paper } from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';

function App() {
  const { instance } = useMsal();
  const [currentDashboard, setCurrentDashboard] = useState<'main' | 'travel'>('main');

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch((e) => {
      console.error(e);
    });
  };

  const handleDashboardChange = (dashboard: 'main' | 'travel') => {
    setCurrentDashboard(dashboard);
  };

  return (
    <Container maxWidth="xl">
      <UnauthenticatedTemplate>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3
          }}
        >
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h3" component="h1" gutterBottom>
              Beredskap360 Master
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Øvelsescockpit og reise-overvåking
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<LoginIcon />}
              onClick={handleLogin}
              sx={{ mt: 2 }}
            >
              Logg inn med Entra ID
            </Button>
          </Paper>
        </Box>
      </UnauthenticatedTemplate>

      <AuthenticatedTemplate>
        <DashboardSwitcher 
          currentDashboard={currentDashboard}
          onDashboardChange={handleDashboardChange}
        />
        {currentDashboard === 'main' ? <Dashboard /> : <TravelDashboard />}
      </AuthenticatedTemplate>
    </Container>
  );
}

export default App;
