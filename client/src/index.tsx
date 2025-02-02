import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChatProvider } from './context/ChatContext/ChatContext';
import { MessageProvider } from './context/MessageContext/MessageContext';

const root = createRoot(document.getElementById('root')!);
root.render(
  
    <ChatProvider>
      <MessageProvider>
        <App />
      </MessageProvider>
    </ChatProvider>

);
reportWebVitals();