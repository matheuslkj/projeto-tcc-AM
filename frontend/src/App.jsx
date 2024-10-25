import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Agendamentos from "./components/Agendamentos"
import Login from './components/Login';
import ForgotPassword from './components/SolicitarSenha';
import ResetPassword from './components/RedefinirSenha';
import RegistrarPaciente from './pages/RegistroPaciente';
import ProtectedRoute from './components/ProtectedRoute'; // Importa o ProtectedRoute
import Procedimentos from './components/Procedimetnos';
import DetalhesProcedimento from './components/DetalhesProcedimento';
import Profile from './components/Profile';

const App = () => {
  const location = useLocation();

  const hideNavbarRoutes = ['/login', '/forgot-password', '/reset-password'];


  return (
    <div>
      {/* Exibir Navbar apenas se a rota atual não estiver em hideNavbarRoutes */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agendamentos"
          element={
            <ProtectedRoute>
              <Agendamentos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/procedimentos"
          element={
            <ProtectedRoute>
              <Procedimentos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register_patient"
          element={
            <ProtectedRoute>
              <RegistrarPaciente />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/procedimentos/:id"
          element={
            <ProtectedRoute>
              <DetalhesProcedimento />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
