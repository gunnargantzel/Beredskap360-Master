import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest } from './config/authConfig';
import Dashboard from './components/Dashboard';
import { Button, Container, Typography, Box, Paper } from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';

function App() {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch((e) => {
      console.error(e);
    });
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
              Øvelsescockpit for ansvarlige
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
        <Dashboard />
      </AuthenticatedTemplate>
    </Container>
  );
}

export default App;
