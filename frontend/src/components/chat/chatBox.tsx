

import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchMessages, sendMessage } from '../../store/chatSlice';

interface ChatBoxProps {
  chatId: number;
  onClose: () => void; // Function to close the dialog
}

const ChatBox: React.FC<ChatBoxProps> = ({ chatId, onClose }) => {
  const dispatch: AppDispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chat.messages);
  const [content, setContent] = useState('');

  useEffect(() => {
    dispatch(fetchMessages(chatId));
  }, [dispatch, chatId]);

  const handleMessageSend = () => {
    if (content.trim() !== '') {
      dispatch(sendMessage({ chatId, content }));
      setContent('');
    }
  };
  console.log("Chatbox");

  return (
    <Dialog open={!!chatId} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Chat</DialogTitle>
      <DialogContent>
        <div className="messages-container">
          {messages.map((message) => (
            <div key={message.message_id} className={`message ${message.sender_id.toString() === localStorage.getItem('user_id') ? 'sent' : 'received'}`}>
              {message.content}
            </div>
          ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={handleMessageSend}>Send</button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatBox;

