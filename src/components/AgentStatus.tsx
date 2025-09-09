import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Refresh as RefreshIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import { simulatedDataService, SimulatedAgent } from '../services/simulatedDataService';

const AgentStatus: React.FC = () => {
  const [agents, setAgents] = useState<SimulatedAgent[]>([]);

  useEffect(() => {
    // Hent agenter ved oppstart
    setAgents(simulatedDataService.getAgents());

    // Oppdater agenter hver 3. sekund
    const interval = setInterval(() => {
      setAgents(simulatedDataService.getAgents());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getAgentIcon = (status: string) => {
    switch (status) {
      case 'Running':
        return <PlayIcon color="success" />;
      case 'Error':
        return <ErrorIcon color="error" />;
      default:
        return <ScheduleIcon color="disabled" />;
    }
  };

  const getAgentColor = (status: string) => {
    switch (status) {
      case 'Running':
        return 'success';
      case 'Error':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatLastActivity = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    
    if (seconds < 60) return `${seconds}s siden`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m siden`;
    const hours = Math.floor(minutes / 60);
    return `${hours}t siden`;
  };

  const runningAgents = agents.filter(a => a.status === 'Running').length;
  const totalAgents = agents.length;

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Agent Status</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip 
            label={`${runningAgents}/${totalAgents} aktive`} 
            color={runningAgents > 0 ? 'success' : 'default'}
            size="small"
          />
          <Tooltip title="Oppdater">
            <IconButton size="small">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Progress bar for total agent activity */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Total agent aktivitet
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={(runningAgents / totalAgents) * 100}
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Box>

      {/* Agent liste */}
      <List>
        {agents.map((agent) => (
          <ListItem key={agent.id} sx={{ px: 0 }}>
            <ListItemIcon>
              {getAgentIcon(agent.status)}
            </ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle2">
                    {agent.name}
                  </Typography>
                  <Chip 
                    label={agent.status} 
                    color={getAgentColor(agent.status)}
                    size="small"
                  />
                </Box>
              }
              secondary={
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {agent.currentTask || 'Venter på oppgaver'}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Sist aktiv: {formatLastActivity(agent.lastActivity)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Oppgaver: {agent.tasksCompleted}
                    </Typography>
                  </Box>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>

      {/* System status */}
      <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          System Status
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CheckCircleIcon color="success" fontSize="small" />
          <Typography variant="body2">
            Alle systemer operasjonelle
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default AgentStatus;
