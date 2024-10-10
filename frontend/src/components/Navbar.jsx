import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Ícones para o hamburguer e o X

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-blue-600 p-4 flex justify-between items-center text-white">
        {/* Ícone de hamburguer */}
        <button onClick={toggleSidebar} className="text-white text-2xl focus:outline-none">
          <FaBars />
        </button>
        <div className="text-xl font-bold">Logo</div>
        {/* Opções normais */}
        <div className="space-x-4 hidden md:flex">
          <Link to="/" className="text-white hover:text-blue-300">Home</Link>
          <div className="text-white hover:text-blue-300 cursor-pointer">Perfil</div>
        </div>
      </nav>

      {/* Sidebar (menu hamburguer) */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center p-4">
          <span className="text-lg font-semibold"></span>
          {/* Ícone de "X" para fechar o sidebar */}
          <button onClick={toggleSidebar} className="text-white text-2xl focus:outline-none">
            <FaTimes />
          </button>
        </div>
        <ul className="p-6 space-y-4">
          <li>
            <Link to="/" className="text-lg font-semibold hover:underline" onClick={toggleSidebar}>
              LOGO
            </Link>
          </li>
          <li>
            <Link to="/home" className="text-lg hover:underline" onClick={toggleSidebar}>
              Início
            </Link>
          </li>
          <li>
            <Link to="/patients" className="text-lg hover:underline" onClick={toggleSidebar}>
              Lista de Pacientes
            </Link>
          </li>
          <li>
            <Link to="/procedures" className="text-lg hover:underline" onClick={toggleSidebar}>
              Procedimentos
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
