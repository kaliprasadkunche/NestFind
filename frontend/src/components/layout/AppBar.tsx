// src/components/layout/AppBar.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import ProfilePopup from './ProfilePopup';
import { useLocation, useNavigate } from 'react-router-dom';

const MyAppBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const showAppBar = location.pathname !== '/login' && location.pathname !== '/register';

    return showAppBar ? (
        <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
            <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <img src="/AppBarLogo.png" alt="NestFind Logo" style={{ height: '40px', marginRight: '10px' }} />
                    <Typography variant="h6" component="div" sx={{color:'#f26024' }}>
                        NestFind
                    </Typography>
                </Box>
                <Box
                    component="img"
                    src="./home.png"
                    alt="Home Icon"
                    onClick={() => navigate('/home')}
                    sx={{
                        cursor: 'pointer', 
                        width: '25px',  
                        height: '25px',  
                        borderRadius: '10%', 
                        marginRight: '10px', 
                    }}
                />
                <Box
                    component="img"
                    src="./list.png"
                    alt="List Icon"
                    onClick={() => navigate('/listings')}
                    sx={{
                        cursor: 'pointer', 
                        width: '25px',  
                        height: '25px',  
                        borderRadius: '10%', 
                        marginRight: '10px', 
                    }}
                />
                <Box
                    component="img"
                    src="./chatBar.png"
                    alt="Chat Icon"
                    onClick={() => navigate('/chat')}
                    sx={{
                        cursor: 'pointer', 
                        width: '25px',  
                        height: '25px',  
                        borderRadius: '10%', 
                        marginRight: '10px', 
                    }}
                />
                <ProfilePopup />
            </Toolbar>
        </AppBar>
    ) : null;
};

export default MyAppBar;
