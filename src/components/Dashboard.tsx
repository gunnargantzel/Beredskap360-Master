import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Event as EventIcon,
  People as PeopleIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Add as AddIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../config/authConfig';
import { dataverseService } from '../services/dataverseService';

const Dashboard: React.FC = () => {
  const { instance, accounts } = useMsal();
  const [stats, setStats] = useState({
    activeExercises: 0,
    totalParticipants: 0,
    pendingEvents: 0,
    completedEvents: 0
  });
  const [recentEvents, setRecentEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Set access token for Dataverse service
        const tokenRequest = {
          scopes: ['https://beredskap360utv.api.crm4.dynamics.com/user_impersonation'],
          account: accounts[0]
        };
        
        const response = await instance.acquireTokenSilent(tokenRequest);
        dataverseService.setAccessToken(response.accessToken);
        
        // Load statistics
        const exerciseStats = await dataverseService.getExerciseStats();
        setStats(exerciseStats);
        
        // Load recent events
        const events = await dataverseService.getEvents();
        setRecentEvents(events.slice(0, 5)); // Show only 5 most recent
        
      } catch (err: any) {
        console.error('Error loading dashboard data:', err);
        setError('Kunne ikke laste dashboard data. Sjekk tilkobling til Dataverse.');
      } finally {
        setLoading(false);
      }
    };

    if (accounts.length > 0) {
      loadData();
    }
  }, [accounts, instance]);

  const handleLogout = () => {
    instance.logoutPopup().catch((e) => {
      console.error(e);
    });
  };

  const handleCreateEvent = async () => {
    // TODO: Implement create event dialog
    console.log('Create event clicked');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header */}
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar>
          <DashboardIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Beredskap360 Master Dashboard
          </Typography>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
            Logg ut
          </Button>
        </Toolbar>
      </AppBar>

      {/* Welcome Message */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Velkommen, {accounts[0]?.name || 'Bruker'}!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Oversikt over øvelser og hendelser
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EventIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">
                    {loading ? <CircularProgress size={24} /> : stats.activeExercises}
                  </Typography>
                  <Typography color="text.secondary">Aktive øvelser</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PeopleIcon color="success" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">
                    {loading ? <CircularProgress size={24} /> : stats.totalParticipants}
                  </Typography>
                  <Typography color="text.secondary">Deltakere</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WarningIcon color="warning" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">
                    {loading ? <CircularProgress size={24} /> : stats.pendingEvents}
                  </Typography>
                  <Typography color="text.secondary">Ventende hendelser</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircleIcon color="success" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">
                    {loading ? <CircularProgress size={24} /> : stats.completedEvents}
                  </Typography>
                  <Typography color="text.secondary">Fullførte hendelser</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Recent Events */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Nylige hendelser</Typography>
              <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateEvent}>
                Ny hendelse
              </Button>
            </Box>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : (
              <List>
                {recentEvents.length > 0 ? (
                  recentEvents.map((event, index) => (
                    <React.Fragment key={event.new_eventid}>
                      <ListItem>
                        <ListItemIcon>
                          <EventIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={event.new_name}
                          secondary={`${new Date(event.new_eventdate).toLocaleString('no-NO')} - ${event.new_status}`}
                        />
                        <Chip
                          label={event.new_status}
                          color={
                            event.new_status === 'Active' ? 'warning' :
                            event.new_status === 'Completed' ? 'success' : 'default'
                          }
                          size="small"
                        />
                      </ListItem>
                      {index < recentEvents.length - 1 && <Divider />}
                    </React.Fragment>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="Ingen hendelser funnet" />
                  </ListItem>
                )}
              </List>
            )}
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Hurtighandlinger
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button variant="outlined" fullWidth startIcon={<AddIcon />}>
                Start ny øvelse
              </Button>
              <Button variant="outlined" fullWidth startIcon={<EventIcon />}>
                Planlegg hendelse
              </Button>
              <Button variant="outlined" fullWidth startIcon={<PeopleIcon />}>
                Administrer deltakere
              </Button>
              <Button variant="outlined" fullWidth startIcon={<NotificationsIcon />}>
                Send varsel
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
