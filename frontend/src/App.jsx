import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import RegistrarPaciente from './pages/RegistroPaciente'; 

const App = () => {
  const location = useLocation();

  return (
    <div>
      {/* O Navbar será exibido apenas se a rota não for a de login */}
      {location.pathname !== '/login' && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/register_patient" element={<RegistrarPaciente />} />
      </Routes>
    </div>
  );
};

export default App;
