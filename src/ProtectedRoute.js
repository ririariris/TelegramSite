// src/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />; // 로그인 안 됐으면 로그인 페이지로 이동
  }

  return children;
};

export default ProtectedRoute;