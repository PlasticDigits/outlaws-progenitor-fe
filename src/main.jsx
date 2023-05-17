import '@fortawesome/fontawesome-free/css/brands.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/regular.css';
import '@fortawesome/fontawesome-free/css/solid.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './fonts/fonts.css';
import './index.css';
import Home from './pages/Home';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App>
      <Home />
    </App>
  </React.StrictMode>
);
