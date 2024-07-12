// src/components/dashboard/Profile.tsx
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Card, CardContent, Avatar, Box } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import MyAppBar from '../layout/AppBar';
import { updateUserProfile } from '../../services/api';

const Profile: React.FC = () => {
    const { user, login } = useAuth();
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.user_email || '',
        user_type: user?.user_type || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const updatedUser = await updateUserProfile(formData);
            login(updatedUser.data); // Update user context with new data
            alert('Details updated successfully'); // Show success alert
        } catch (error) {
            console.error('Failed to update profile', error);
        }
    };

    return (
        <div>
            <MyAppBar />
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Card sx={{ width: '100%', maxWidth: 600, borderRadius: 3, p: 3 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                            <Avatar sx={{ width: 100, height: 100, fontSize: 50 }}>
                                {user?.username.charAt(0).toUpperCase()}
                            </Avatar>
                        </Box>
                        <Typography variant="h5" align="center" gutterBottom>
                            Edit Profile
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                name="username"
                                label="Username"
                                value={formData.username}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                name="email"
                                label="Email"
                                value={formData.email}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                name="user_type"
                                label="User Type"
                                value={formData.user_type}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                disabled
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                                <Button variant="outlined" sx={{borderRadius: 3,color: '#f26024',borderColor: '#f26024','&:hover': {borderColor: '#f26024',color: '#f26024',}}} onClick={() => window.history.back()}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="contained" sx={{borderRadius: 3, backgroundColor: '#f26024', '&:hover': {backgroundColor: '#f26024'}}}>
                                    Update
                                </Button>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
};

export default Profile;
