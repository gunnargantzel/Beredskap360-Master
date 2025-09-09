import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  TravelExplore as TravelIcon,
  Logout as LogoutIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { useMsal } from '@azure/msal-react';

interface DashboardSwitcherProps {
  currentDashboard: 'main' | 'travel';
  onDashboardChange: (dashboard: 'main' | 'travel') => void;
}

const DashboardSwitcher: React.FC<DashboardSwitcherProps> = ({
  currentDashboard,
  onDashboardChange
}) => {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutPopup().catch((e) => {
      console.error(e);
    });
  };

  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>
        <DashboardIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Beredskap360 Master
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
          <Button
            color="inherit"
            variant={currentDashboard === 'main' ? 'outlined' : 'text'}
            startIcon={<DashboardIcon />}
            onClick={() => onDashboardChange('main')}
            sx={{
              borderColor: currentDashboard === 'main' ? 'white' : 'transparent',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Øvelses Dashboard
          </Button>
          
          <Button
            color="inherit"
            variant={currentDashboard === 'travel' ? 'outlined' : 'text'}
            startIcon={<TravelIcon />}
            onClick={() => onDashboardChange('travel')}
            sx={{
              borderColor: currentDashboard === 'travel' ? 'white' : 'transparent',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Reise Overvåking
          </Button>
        </Box>

        <IconButton color="inherit" title="Oppdater">
          <RefreshIcon />
        </IconButton>
        
        <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
          Logg ut
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardSwitcher;
