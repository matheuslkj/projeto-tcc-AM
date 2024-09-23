import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RegistrarPaciente from './pages/RegistroPaciente'; 

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register_patient" element={<RegistrarPaciente />} /> {/* Mudei para o novo nome */}
      </Routes>
    </div>
  );
};

export default App;
