import React from 'react';
import { Navigate } from 'react-router-dom';

// Componente para proteger as rotas
const ProtectedRoute = ({ children }) => {
  // Verifica se o token está armazenado no localStorage ou sessionStorage
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  console.log('Token:', token); 

  // Se não houver token, redireciona para a página de login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Se o token existir, renderiza a rota protegida
  return children;
};

export default ProtectedRoute;
