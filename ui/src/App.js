import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage'; // Assuming LandingPage.js exists
import LoginPage from './pages/LoginPage'; // Assuming LoginPage.js exists
import RegisterPage from './pages/RegisterPage'; // Assuming RegisterPage.js exists
import ForgetPasswordPage from './pages/ForgetPasswordPage'; // Assuming ForgetPasswordPage.js exists
import HomePage from './pages/HomePage'; // Assuming HomePage.js exists
import Rented from './pages/Rented'; // Assuming HomePage.js exists
import Drones from './pages/Drones'; // Assuming HomePage.js exists

import './App.css'; // Assuming App.css exists (optional)

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/drones" element={<Drones />} />
          <Route path="/rented" element={<Rented />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

const Footer = () => {
  return (
    <p className="text-center" style={FooterStyle}>
      Designed & coded by{' '}
      <a href="https://izemspot.netlify.com" target="_blank" rel="noopener noreferrer">
        IZEMSPOT
      </a>
    </p>
  );
};

const FooterStyle = {
  background: "#222",
  fontSize: ".8rem",
  color: "#fff",
  position: "absolute",
  bottom: 0,
  padding: "1rem",
  margin: 0,
  width: "100%",
  opacity: ".5",
};
