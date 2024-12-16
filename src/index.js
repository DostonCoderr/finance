import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import { FinanceProvider } from './context/FinanceContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { BrowserRouter as Router } from 'react-router-dom'; 
import 'font-awesome/css/font-awesome.min.css';


ReactDOM.render(
  <Router> 
      <FinanceProvider>
        <App />
        <ToastContainer />  
      </FinanceProvider>
  </Router>,
  document.getElementById("root")
);
