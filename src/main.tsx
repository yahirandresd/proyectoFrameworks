import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import './satoshi.css';
import { GoogleOAuthProvider } from '@react-oauth/google'
const CLIENT_ID = '397391716664-e1hot3hhu14fr1fberotqisdg9ctb1uc.apps.googleusercontent.com'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
       <App />
      </GoogleOAuthProvider>
    </Router>
  </React.StrictMode>
);
