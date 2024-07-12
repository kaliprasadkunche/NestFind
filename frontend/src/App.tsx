// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Listings from './components/dashboard/Listings';
import Home from './components/home/Home';
import ChatList from './components/chat/chatList';
import Profile from './components/dashboard/Profile';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route element={<PrivateRoutes />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/chat" element={<ChatList />} />
                        <Route path="/listings" element={<Listings />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/" element={<Navigate to="/home" />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

const PrivateRoutes: React.FC = () => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace/>;
    }

    return <Outlet />;
};

export default App;
