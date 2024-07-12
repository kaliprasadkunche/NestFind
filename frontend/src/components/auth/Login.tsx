// src/components/auth/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { TextField, Button, Container, Typography, Card, CardContent, CardActions } from '@mui/material';
import { loginUser } from '../../services/api';


const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await loginUser({ email, password });

            if (response.status === 200) {
                const { access_token, username, user_type, user_id, user_email } = response.data;
                console.log('Login response data:', response.data); // Log the response data for debugging
                // Store the access token in local storage or session storage
                localStorage.setItem('access_token', access_token);

                // Create the user object with the necessary properties
                const user = {
                    id: user_id,
                    email,
                    username,
                    user_type,
                    user_email,
    
                };

                console.log('User:', user); // Log the user object for debugging

                // Login the user
                login(user);
                navigate('/home');
            } else {
                // Handle login error
                console.error('Login error:', response.data.message);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <Container sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100vh', width: '100vw',
            backgroundImage: 'url(./AppBarLogo1.png)', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
       
        }}>
            <Card sx={{ width: 400, padding: 3, borderRadius: 6, border: "0.1px solid black" }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Welcome!
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Sign in to continue.
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Typography>Email</Typography>
                        <TextField
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                            variant="outlined"
                            sx={{ borderRadius: 10 }}
                        />
                        <Typography>Password</Typography>
                        <TextField
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                            variant="outlined"
                            sx={{ borderRadius: 2 }}
                        />
                        <CardActions>
                            <Button type="submit" variant="contained" fullWidth sx={{ borderRadius: 2,  backgroundColor: '#f26024', '&:hover': {backgroundColor: '#f26024'} }}>
                                Login
                            </Button>
                        </CardActions>
                    </form>
                </CardContent>
                <CardActions>
                    <Typography variant="body2" sx={{ marginTop: 0 }}>
                        Don't have an account? 
                        <Button onClick={() => navigate('/register')} color="primary">
                            Sign up
                        </Button>
                    </Typography>
                </CardActions>
            </Card>
        </Container>
    );
};

export default Login;
