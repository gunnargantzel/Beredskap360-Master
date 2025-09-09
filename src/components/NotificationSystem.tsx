import React, { useState, useEffect } from 'react';
import {
  Snackbar,
  Alert,
  AlertTitle,
  IconButton,
  Badge,
  Menu,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  Divider,
  Chip
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { simulatedDataService, SimulatedNotification } from '../services/simulatedDataService';

const NotificationSystem: React.FC = () => {
  const [notifications, setNotifications] = useState<SimulatedNotification[]>([]);
  const [currentNotification, setCurrentNotification] = useState<SimulatedNotification | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    // Hent notifikasjoner ved oppstart
    setNotifications(simulatedDataService.getNotifications());

    // Oppdater notifikasjoner hver 5. sekund
    const interval = setInterval(() => {
      const newNotifications = simulatedDataService.getNotifications();
      setNotifications(newNotifications);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Sjekk for nye notifikasjoner og vis popup
    const unreadNotifications = notifications.filter(n => !n.read);
    if (unreadNotifications.length > 0) {
      const latestUnread = unreadNotifications[0];
      setCurrentNotification(latestUnread);
      setShowSnackbar(true);
    }
  }, [notifications]);

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
    if (currentNotification) {
      simulatedDataService.markNotificationAsRead(currentNotification.id);
      setCurrentNotification(null);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <ErrorIcon color="error" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'success':
        return <CheckCircleIcon color="success" />;
      default:
        return <InfoIcon color="info" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'success':
        return 'success';
      default:
        return 'info';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return 'Nå';
    if (minutes < 60) return `${minutes}m siden`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}t siden`;
    return date.toLocaleDateString('no-NO');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      {/* Notifikasjonsknapp */}
      <IconButton
        color="inherit"
        onClick={handleMenuOpen}
        sx={{ position: 'relative' }}
      >
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      {/* Notifikasjonsmeny */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { width: 400, maxHeight: 500 }
        }}
      >
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6">Notifikasjoner</Typography>
          {unreadCount > 0 && (
            <Chip 
              label={`${unreadCount} nye`} 
              color="error" 
              size="small" 
              sx={{ ml: 1 }}
            />
          )}
        </Box>
        
        <List sx={{ maxHeight: 400, overflow: 'auto' }}>
          {notifications.length === 0 ? (
            <ListItem>
              <ListItemText primary="Ingen notifikasjoner" />
            </ListItem>
          ) : (
            notifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  sx={{
                    bgcolor: notification.read ? 'transparent' : 'action.hover',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    if (!notification.read) {
                      simulatedDataService.markNotificationAsRead(notification.id);
                    }
                  }}
                >
                  <ListItemIcon>
                    {getNotificationIcon(notification.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle2" fontWeight={notification.read ? 'normal' : 'bold'}>
                          {notification.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatTime(notification.timestamp)}
                        </Typography>
                      </Box>
                    }
                    secondary={notification.message}
                  />
                </ListItem>
                {index < notifications.length - 1 && <Divider />}
              </React.Fragment>
            ))
          )}
        </List>
      </Menu>

      {/* Popup notifikasjon */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={getNotificationColor(currentNotification?.type || 'info')}
          variant="filled"
          sx={{ width: '100%' }}
        >
          <AlertTitle>{currentNotification?.title}</AlertTitle>
          {currentNotification?.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default NotificationSystem;
