// src/components/layout/ProfilePopup.tsx
import React, { useState } from 'react';
import { Avatar, Button, Popover, Typography, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProfilePopup: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'profile-popover' : undefined;

    const handleEditProfile = () => {
        navigate('/profile');
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            {/* <IconButton onClick={handleClick}>
                <AccountCircle />
            </IconButton> */}
            <IconButton
                onClick={handleClick}
                sx={{
                    cursor: 'pointer', 
                    borderRadius: '10%', 
                    marginRight: '10px', 
                }}
            >
                <img
                    src="./user.png"
                    alt="user Icon"
                    style={{
                        width: '25px',
                        height: '25px',
                    }}
                />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    sx: { borderRadius: '20px', padding: '16px', marginTop: '15px' },
                }}
            >
                <IconButton onClick={handleClose} style={{ position: 'absolute', top: '5px', right: '5px' }}>
                    <Close />
                </IconButton>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Avatar style={{ marginBottom: '8px', marginTop: '16px'  }}>{user?.username.charAt(0).toUpperCase()}</Avatar>
                    <Typography style={{ marginBottom: '8px' }}>{user?.username}</Typography>
                    <Typography style={{ marginBottom: '8px' }}>{user?.user_email}</Typography>
                    <Typography style={{ marginBottom: '8px' }}>{user?.user_type}</Typography>
                    <Button onClick={handleEditProfile} variant="outlined" sx={{ marginTop: '8px', borderRadius: '20px',color: '#f26024',borderColor: '#f26024','&:hover': {borderColor: '#f26024',color: '#f26024',} }}>
                        Edit Account Details
                    </Button>
                    <Button onClick={handleLogout} variant="contained" color="primary" sx={{ marginTop: '16px', borderRadius: '20px',  backgroundColor: '#f26024', '&:hover': {backgroundColor: '#f26024'} }}>
                        Logout
                    </Button>
                </div>
            </Popover>
        </>
    );
};

export default ProfilePopup;
