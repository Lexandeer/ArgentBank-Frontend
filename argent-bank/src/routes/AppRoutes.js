import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/homePage/HomePage';
import LoginPage from '../pages/loginPage/LoginPage';
import UserProfilePage from '../pages/userProfilePage/UseProfilePage';
import '../app/App.css';
import { Footer } from '../components/Footer';
import { NotFound } from '../pages/notfound/NotFound';
import { ProtectedRoute } from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route
          path="/user/profile"
          element={
            //On protège la route UserProfilePage par une vérification de la présence du token
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
