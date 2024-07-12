import React from 'react';
// import { useAuth } from '../../contexts/AuthContext';
import MyAppBar from '../layout/AppBar';
import { Typography, Box } from '@mui/material';
import Globe from '../magicui/Globe'; // Import the Globe component

const Home: React.FC = () => {
    // const { user } = useAuth();

    return (
        <div>
            <MyAppBar />
            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center', 
                    height: 'calc(90vh - 1vh)', 
                    backgroundImage: 'url(./NestFind.png)', 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    position: 'relative',
                    top: '1vh', 
                }}
            >
                <Box sx={{width: '90%'}}>
                    <Globe className="top-28" /> {/* Add the Globe component */}
                </Box>
                <Box>
                <Typography sx={{ color: '#f26024', fontSize: '50px',width: '50%' }}>
                </Typography>
                </Box>
               

            </Box>
        </div>
    );
};

export default Home;
