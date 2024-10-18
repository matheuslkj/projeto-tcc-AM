import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import ForgotPassword from './components/SolicitarSenha';
import ResetPassword from './components/RedefinirSenha';
import RegistrarPaciente from './pages/RegistroPaciente';
import ProtectedRoute from './components/ProtectedRoute'; // Importa o ProtectedRoute

const App = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== '/login' && <Navbar />}
      <Routes>
        {/* Rota de login, que fica pública */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protegendo a rota da Home */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Protegendo a rota de registro de pacientes */}
        <Route
          path="/register_patient"
          element={
            <ProtectedRoute>
              <RegistrarPaciente />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
