import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Message {
  message_id: number;
  chat_id: number;
  sender_id: number;
  content: string;
  timestamp: string;
}

interface ChatState {
  chats: any[];
  messages: Message[];
  loading: boolean;
}

const initialState: ChatState = {
  chats: [],
  messages: [],
  loading: false,
};

export const fetchChats = createAsyncThunk('chat/fetchChats', async (_, thunkAPI) => {
  const response = await axios.get('/api/chat/user-chats', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  console.log('Fetched chats:', response.data);
  return response.data;
});

export const fetchMessages = createAsyncThunk(
    'chat/fetchMessages',
    async (chatId: number, thunkAPI) => {
      try {
        const response = await axios.get(`/api/chat/${chatId}/messages`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log('Fetched messages:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
      }
    }
  );

export const sendMessage = createAsyncThunk('chat/sendMessage', async ({ chatId, content }: { chatId: number; content: string }, thunkAPI) => {
  await axios.post(`/api/chat/${chatId}/messages`, { content }, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  thunkAPI.dispatch(fetchMessages(chatId));
});

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChats.fulfilled, (state, action) => {
      state.chats = action.payload;
      console.log('Chats fetched:', state.chats);
    });
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
      console.log('Messages fetched:', state.messages);
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      console.log('Message sent');
    });
  },
});

export default chatSlice.reducer;
