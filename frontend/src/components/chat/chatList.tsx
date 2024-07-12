import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchChats } from '../../store/chatSlice';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import MyAppBar from '../layout/AppBar';

const ChatList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const chats = useSelector((state: RootState) => state.chat.chats);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  const handleChatSelect = (chatId: number) => {
    navigate(`/chat/${chatId}`); // Navigate to chat room with specific chatId
  };

  return (
    <div className="chat-list">
        <MyAppBar />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2>Chats</h2>
        <div className="chat-list-items">
          {chats.map((chat) => (
            <div key={chat.chat_id} onClick={() => handleChatSelect(chat.chat_id)}>
              Chat with {chat.owner_id === localStorage.getItem('user_id') ? chat.tenant_id : chat.owner_id}
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
};

export default ChatList;
