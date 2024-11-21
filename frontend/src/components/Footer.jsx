import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-4 shadow-md w-full">
      <div className="text-center">
        <p className="text-sm sm:text-base font-medium">
          Desenvolvido por <span className="font-bold">Allan Sousa</span> e <span className="font-bold">Matheus Freitas</span>
        </p>
        <p className="text-xs sm:text-sm mt-2">
          © {new Date().getFullYear()} Faculdade UniAlfa Umuarama
        </p>
      </div>
    </footer>
  );
};

export default Footer;
