import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './global.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ToastContainer 
        position="top-right"
        reverseOrder={false}
      />
      <App />
    </React.StrictMode>
  );
}
root.render(
  <React.StrictMode>
      <ToastContainer 
        position="top-right"
        reverseOrder={false}
      />
      <App />
    </React.StrictMode>
);


