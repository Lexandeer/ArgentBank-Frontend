import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from '../pages/loginPage/loginSlice';

export const ProtectedRoute = ({ children }) => {
  const token = useSelector(selectToken);
  const isAuthenticated = !!token; // Vérifie la présence du token
  console.log('Présence du token :', token);
  // Render en fonction de la présence ou non du token
  return isAuthenticated ? children : <Navigate to="/login" />;
};
