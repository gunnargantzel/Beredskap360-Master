import React, { useState } from 'react';
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
  Divider
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

const Dashboard: React.FC = () => {
  const { instance, accounts } = useMsal();
  const [activeExercises] = useState(3);
  const [totalParticipants] = useState(156);
  const [pendingEvents] = useState(7);
  const [completedEvents] = useState(23);

  const handleLogout = () => {
    instance.logoutPopup().catch((e) => {
      console.error(e);
    });
  };

  const recentEvents = [
    { id: 1, title: 'Brannøvelse - Hovedkontor', status: 'Pågående', time: '14:30' },
    { id: 2, title: 'Evakuering - Avdeling B', status: 'Fullført', time: '12:15' },
    { id: 3, title: 'Sikkerhetstrening - Team 1', status: 'Planlagt', time: '16:00' },
  ];

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

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EventIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">{activeExercises}</Typography>
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
                  <Typography variant="h4">{totalParticipants}</Typography>
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
                  <Typography variant="h4">{pendingEvents}</Typography>
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
                  <Typography variant="h4">{completedEvents}</Typography>
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
              <Button variant="contained" startIcon={<AddIcon />}>
                Ny hendelse
              </Button>
            </Box>
            <List>
              {recentEvents.map((event, index) => (
                <React.Fragment key={event.id}>
                  <ListItem>
                    <ListItemIcon>
                      <EventIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={event.title}
                      secondary={`${event.time} - ${event.status}`}
                    />
                    <Chip
                      label={event.status}
                      color={
                        event.status === 'Pågående' ? 'warning' :
                        event.status === 'Fullført' ? 'success' : 'default'
                      }
                      size="small"
                    />
                  </ListItem>
                  {index < recentEvents.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
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
