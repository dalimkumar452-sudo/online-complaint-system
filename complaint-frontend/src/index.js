import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // টেলউইন্ডের স্টাইল এখানে লোড হবে
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);