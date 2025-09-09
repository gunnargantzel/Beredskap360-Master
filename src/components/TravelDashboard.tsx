import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Avatar,
  LinearProgress
} from '@mui/material';
import {
  Person as PersonIcon,
  LocationOn as LocationIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Cloud as CloudIcon,
  Traffic as TrafficIcon,
  Flight as FlightIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import { digitalTwinService, DigitalTwin } from '../services/digitalTwinService';

const TravelDashboard: React.FC = () => {
  const [digitalTwins, setDigitalTwins] = useState<DigitalTwin[]>([]);
  const [stats, setStats] = useState({
    totalEmployees: 0,
    safeEmployees: 0,
    warningEmployees: 0,
    dangerEmployees: 0,
    totalEvents: 0,
    activeEvents: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      setLoading(true);
      const twins = digitalTwinService.getDigitalTwins();
      const statistics = digitalTwinService.getStats();
      
      setDigitalTwins(twins);
      setStats(statistics);
      setLoading(false);
    };

    loadData();

    // Oppdater data hver 10. sekund
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Safe':
        return 'success';
      case 'Warning':
        return 'warning';
      case 'Danger':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Safe':
        return <CheckCircleIcon color="success" />;
      case 'Warning':
        return <WarningIcon color="warning" />;
      case 'Danger':
        return <ErrorIcon color="error" />;
      default:
        return <ScheduleIcon color="disabled" />;
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low':
        return 'success';
      case 'Medium':
        return 'warning';
      case 'High':
        return 'error';
      case 'Critical':
        return 'error';
      default:
        return 'primary';
    }
  };

  const getTrafficColor = (status: string) => {
    switch (status) {
      case 'Clear':
        return 'success';
      case 'Moderate':
        return 'warning';
      case 'Heavy':
        return 'error';
      case 'Severe':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('no-NO', { 
      hour: '2-digit', 
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const formatLastSeen = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return 'Nå';
    if (minutes < 60) return `${minutes}m siden`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}t siden`;
    return date.toLocaleDateString('no-NO');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>

      {/* Welcome Message */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Reise-overvåking Asia
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Sanntids overvåking av ansatte på reise
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PersonIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">
                    {loading ? <CircularProgress size={24} /> : stats.totalEmployees}
                  </Typography>
                  <Typography color="text.secondary">Totalt ansatte</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircleIcon color="success" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">
                    {loading ? <CircularProgress size={24} /> : stats.safeEmployees}
                  </Typography>
                  <Typography color="text.secondary">Trygge</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WarningIcon color="warning" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">
                    {loading ? <CircularProgress size={24} /> : stats.warningEmployees}
                  </Typography>
                  <Typography color="text.secondary">Advarsel</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ErrorIcon color="error" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">
                    {loading ? <CircularProgress size={24} /> : stats.dangerEmployees}
                  </Typography>
                  <Typography color="text.secondary">Fare</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationIcon color="info" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">
                    {loading ? <CircularProgress size={24} /> : stats.activeEvents}
                  </Typography>
                  <Typography color="text.secondary">Aktive hendelser</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Employee Cards */}
      <Grid container spacing={3}>
        {digitalTwins.map((twin) => (
          <Grid key={twin.employee.id} size={{ xs: 12, md: 6, lg: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                {/* Employee Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                    {twin.employee.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{twin.employee.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {twin.employee.role} • {twin.employee.department}
                    </Typography>
                  </Box>
                  <Chip
                    label={twin.employee.status}
                    color={getStatusColor(twin.employee.status)}
                    size="small"
                    icon={getStatusIcon(twin.employee.status)}
                  />
                </Box>

                {/* Location Info */}
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationIcon color="primary" sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="subtitle2">
                      {twin.travelInfo.currentLocation.name}, {twin.travelInfo.currentLocation.country}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Lokaltid: {formatTime(twin.travelInfo.currentLocation.localTime)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sist sett: {formatLastSeen(twin.employee.lastSeen)}
                  </Typography>
                </Box>

                {/* Weather */}
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CloudIcon color="info" sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="subtitle2">Vær</Typography>
                  </Box>
                  <Typography variant="body2">
                    {twin.weather.temperature}°C • {twin.weather.condition}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Vind: {twin.weather.windSpeed} km/h • Luftfuktighet: {twin.weather.humidity}%
                  </Typography>
                </Box>

                {/* Traffic */}
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TrafficIcon color="warning" sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="subtitle2">Trafikk</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body2">
                      {twin.traffic.status} • {twin.traffic.delay} min forsinkelse
                    </Typography>
                    <Chip
                      label={twin.traffic.status}
                      color={getTrafficColor(twin.traffic.status)}
                      size="small"
                    />
                  </Box>
                </Box>

                {/* Risk Level */}
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle2">Risikonivå</Typography>
                    <Chip
                      label={twin.riskLevel}
                      color={getRiskColor(twin.riskLevel)}
                      size="small"
                    />
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={
                      twin.riskLevel === 'Low' ? 25 :
                      twin.riskLevel === 'Medium' ? 50 :
                      twin.riskLevel === 'High' ? 75 : 100
                    }
                    color={getRiskColor(twin.riskLevel)}
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </Box>

                {/* Nearby Events */}
                {twin.nearbyEvents.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Nærliggende hendelser ({twin.nearbyEvents.length})
                    </Typography>
                    {twin.nearbyEvents.slice(0, 2).map((event) => (
                      <Chip
                        key={event.id}
                        label={event.title}
                        color={event.severity === 'Critical' ? 'error' : 
                               event.severity === 'High' ? 'error' :
                               event.severity === 'Medium' ? 'warning' : 'default'}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                )}

                {/* Flight Info */}
                <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <FlightIcon color="primary" sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="subtitle2">Neste flygning</Typography>
                  </Box>
                  <Typography variant="body2">
                    {twin.travelInfo.flightInfo.flightNumber} • {twin.travelInfo.flightInfo.airline}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avgang: {formatTime(twin.travelInfo.flightInfo.departure)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TravelDashboard;
