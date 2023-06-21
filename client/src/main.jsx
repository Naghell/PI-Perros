import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import store from './redux/store.js'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client';
import './main.css';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001'
// axios.defaults.baseURL = 'https://pi-perros-back-production.up.railway.app'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>
);