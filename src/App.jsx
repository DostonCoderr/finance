import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FinanceProvider } from './context/FinanceContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Transaction from './pages/TransactionList';
import Convert from './pages/CurrencyConverter';
import TransactionForm from './pages/Transaction';
import './App.css';

const App = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true); 
  const [isMobile, setIsMobile] = useState(false); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); //Qachonki Mobilka Boganda Tekshiradi
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle); 
  };

  return (
    <FinanceProvider>
      <div className={`grid-container ${isMobile ? 'mobile' : ''}`}>
        <Header toggleSidebar={toggleSidebar} openSidebarToggle={openSidebarToggle} />
        <Sidebar openSidebarToggle={openSidebarToggle} toggleSidebar={toggleSidebar} />
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/convert" element={<Convert />} />
            <Route path="/transactionform" element={<TransactionForm />} />
          </Routes>
        </div>
      </div>
    </FinanceProvider>
  );
};

export default App;
