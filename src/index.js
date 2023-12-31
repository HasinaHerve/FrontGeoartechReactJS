import 'font-awesome/css/font-awesome.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHouse, faNewspaper, faBriefcase, faUsers, faUser } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/css/bootstrap.min.css"; 
import "@popperjs/core"; 
import "bootstrap";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


library.add(faHouse, faNewspaper, faBriefcase, faUsers, faUser);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
