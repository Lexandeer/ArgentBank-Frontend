import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/homePage/HomePage';
import LoginPage from '../pages/loginPage/LoginPage';
import UserProfilePage from '../pages/userProfilePage/UseProfilePage';
import '../app/App.css';
import { Footer } from '../components/Footer';
import { NotFound } from '../pages/notfound/NotFound';
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/user" element={<UserProfilePage />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
