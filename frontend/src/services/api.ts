import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', // your backend URL
});

export const fetchListings = () => api.get('/listings/');
export const deleteListing = async (id: number) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
        throw new Error('Access token not found');
    }
    return await api.delete(`/listings/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const createListing = async (data: any) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
        throw new Error('Access token not found');
    }
    return await api.post('/listings/', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const updateListing = async (id: number, data: any) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
        throw new Error('Access token not found');
    }
    return await api.put(`/listings/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const registerUser = (data: any) => api.post('/auth/register', data);
export const loginUser = (data: any) => api.post('/auth/login', data);
export const updateUserProfile = async (data: any) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
        throw new Error('Access token not found');
    }
    return await api.put('/auth/update-profile', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const startChat = async (listingId: number) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
        throw new Error('Access token not found');
    }
    return await api.post('/chat/start', { listing_id: listingId }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const sendMessage = async (chatId: number, content: string) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
        throw new Error('Access token not found');
    }
    return await api.post(`/chat/${chatId}/messages`, { content }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getMessages = async (chatId: number) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
        throw new Error('Access token not found');
    }
    return await api.get(`/chat/${chatId}/messages`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getUserChats = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
        throw new Error('Access token not found');
    }
    return await api.get('/chat/user-chats', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};