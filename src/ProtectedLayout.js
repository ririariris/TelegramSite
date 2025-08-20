// ProtectedLayout.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import UserFooter from './components/UserFooter';

export default function ProtectedLayout({ children }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" />;

  return (
    <>
      {children}
      <UserFooter />
    </>
  );
}
