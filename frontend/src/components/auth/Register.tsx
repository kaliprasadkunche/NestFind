import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, MenuItem, Card, CardContent, CardActions } from '@mui/material';
import { registerUser } from '../../services/api';

const Register: React.FC = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('Tenant');
    // const [gender, setGender] = useState('male');
    const navigate = useNavigate();

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     // Check if passwords match
    //     if (password !== confirmPassword) {
    //         alert('Passwords do not match');
    //         return;
    //     }
    //     await registerUser({ username, password, email, user_type: userType });
    //     navigate('/login');
    // };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await registerUser({ email, password, username, user_type: userType });

            if (response.status === 201) {
                alert('User registration successful'); // Show success alert
                navigate('/login');
            } else {
                // Handle registration error
                console.error('Registration error:', response.data.message);
            }
        } catch (error) {
            console.error('Registration failed:', error);
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
                    <Typography variant="h5">Register</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            fullWidth
                            required
                            size="small"
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            required
                            size="small"
                            margin="normal"
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            required
                            size="small"
                            margin="normal"
                        />
                        <TextField
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            fullWidth
                            required
                            size="small"
                            margin="normal"
                        />
                        <TextField
                            select
                            label="User Type"
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            fullWidth
                            required
                            size="small"
                            margin="normal"
                        >
                            <MenuItem value="Tenant">Tenant</MenuItem>
                            <MenuItem value="Owner">Owner</MenuItem>
                        </TextField>
                        {/* <RadioGroup
                            aria-label="gender"
                            name="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            sx={{ marginTop: '10px' }}
                        >
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                        </RadioGroup> */}
                        <CardActions>
                            <Button type="submit" variant="contained" fullWidth size="small" sx={{ backgroundColor: '#f26024', '&:hover': {backgroundColor: '#f26024'} }}>
                                Register
                            </Button>
                        </CardActions>
                    </form>
                </CardContent>
                <CardActions>
                    <Typography variant="body2">
                        Already have an account?{' '}
                        <Button onClick={() => navigate('/login')} color="primary">
                            Login
                        </Button>
                    </Typography>
                </CardActions>
            </Card>
        </Container>
    );
};

export default Register;
