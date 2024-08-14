import React, { useState, useEffect } from 'react';
import { Popover, Typography, IconButton, Paper, List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, ListItemSecondaryAction, Badge, TextField, Button, Grid, Box } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NotificationDropdown = ({ onNotificationClick, onNotificationDelete, onSave }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [editingNotification, setEditingNotification] = useState(null);
    const [formData, setFormData] = useState({ title: '', ownerName: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/turfs/notifications');
                if (Array.isArray(response.data)) {
                    setNotifications(response.data);
                }
            } catch (error) {
                console.error('Error fetching notifications', error);
            }
        };
        fetchNotifications();
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setEditingNotification(null);
    };

    const handleNotificationClick = (notification) => {
        onNotificationClick(notification);
        handleClose();
    };

    const handleDelete = async (event, id) => {
        event.stopPropagation(); // Ensure event is a proper event object
        try {
            await axios.delete(`http://localhost:8080/api/turfs/${id}`);
            setNotifications(notifications.filter(notification => notification.id !== id));
            if (onNotificationDelete) {
                onNotificationDelete(id);
            }
        } catch (error) {
            console.error('Failed to delete notification:', error);
        }
    };

    const handleEditClick = (notification) => {
        setEditingNotification(notification.id);
        setFormData({ title: notification.title, ownerName: notification.ownerName });
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSaveClick = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/turfs/${editingNotification}`, formData);
            setNotifications(notifications.map(notification =>
                notification.id === editingNotification ? { ...notification, ...formData } : notification
            ));
            onSave(response.data); // Use response.data instead of response
            setEditingNotification(null);
            handleClose();
        } catch (error) {
            console.error('Failed to save notification:', error);
        }
    };
    

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <IconButton aria-describedby={id} color="inherit" onClick={handleClick}>
                <Badge
                    badgeContent={notifications.length}
                    color="primary"
                    sx={{
                        '& .MuiBadge-badge': {
                            fontSize: '0.65rem',
                            minWidth: '15px',
                            height: '15px',
                            padding: '0 2px'
                        }
                    }}
                >
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    style: { maxHeight: 300, width: '350px', borderRadius: '10px' },
                }}
            >
                <Paper sx={{ padding: 1 }}>
                    {notifications.length > 0 ? (
                        <List>
                            {notifications.map((notification, index) => (
                                <React.Fragment key={notification.id}>
                                    <ListItem
                                        alignItems="flex-start"
                                        sx={{ paddingY: 1 }}
                                        button
                                        onClick={() => handleNotificationClick(notification)}
                                    >
                                        <ListItemAvatar>
                                            <Avatar>
                                                {/* Use a generic icon or remove if not needed */}
                                            </Avatar>
                                        </ListItemAvatar>
                                        {editingNotification === notification.id ? (
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        label="Title"
                                                        name="title"
                                                        value={formData.title}
                                                        onChange={handleFormChange}
                                                        fullWidth
                                                        size="small"
                                                        InputLabelProps={{ shrink: true }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        label="Owner Name"
                                                        name="ownerName"
                                                        value={formData.ownerName}
                                                        onChange={handleFormChange}
                                                        fullWidth
                                                        size="small"
                                                        InputLabelProps={{ shrink: true }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 1 }}>
                                                        <Button variant="contained" color="primary" onClick={handleSaveClick}>
                                                            Save
                                                        </Button>
                                                        <Button variant="contained" color="secondary" sx={{ marginLeft: 1 }} onClick={() => setEditingNotification(null)}>
                                                            Cancel
                                                        </Button>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        ) : (
                                            <>
                                                <ListItemText
                                                    primary={<Typography variant="subtitle1" sx={{ fontFamily: 'League Spartan, sans-serif' }}>{notification.title || 'No Title'}</Typography>}
                                                    secondary={<Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'League Spartan, sans-serif' }}>{notification.ownerName || 'No Owner Details'}</Typography>}
                                                />
                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(notification)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton onClick={(event) => handleDelete(event, notification.id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </>
                                        )}
                                    </ListItem>
                                    {index < notifications.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>
                    ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'League Spartan, sans-serif', padding: 2 }}>
                            No notifications.
                        </Typography>
                    )}
                </Paper>
            </Popover>
        </div>
    );
};

export default NotificationDropdown;
