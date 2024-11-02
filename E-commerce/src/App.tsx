import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ProductPage from './pages/ProductPage/ProductPage';
import Header from './components/Header/Header';
import './styles/null.scss'
import './styles/styles.css'
import './styles/variables.css'


function App() {
  return (
    <div className="wrapper">
      <div className="wide-container">
      <Header />
  
  <Routes>
    <Route path="/" element={<HomePage/>} />
    <Route path="/product/:id" element={<ProductPage/>} />
  </Routes>

      </div>
    </div>
  );
}

export default App;
