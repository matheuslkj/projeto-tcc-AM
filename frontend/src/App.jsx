import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Agendamentos from "./components/Agendamentos"
import Login from './components/Login';
import ForgotPassword from './components/SolicitarSenha';
import ResetPassword from './components/RedefinirSenha';
import ProtectedRoute from './components/ProtectedRoute'; 
import Procedimentos from './components/Procedimentos';
import DetalhesProcedimento from './components/DetalhesProcedimento';
import Profile from './components/Profile';
import Pacientes from './components/Pacientes';
import DetalhesPaciente from './components/DetalhesPaciente';

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
        <Route path="/editar-agendamento/:id" element={<Agendamentos />} />

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
          path="/pacientes"
          element={
            <ProtectedRoute>
              <Pacientes/>
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
        <Route
          path="/paciente/:id"
          element={
            <ProtectedRoute>
              <DetalhesPaciente/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
