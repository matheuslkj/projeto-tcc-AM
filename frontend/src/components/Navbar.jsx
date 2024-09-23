import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">Logo</div>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-blue-300">Home</Link>
          <Link to="/register_patient" className="text-white hover:text-blue-300">Cadastro Paciente</Link>
          <div className="text-white hover:text-blue-300 cursor-pointer">Perfil</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
