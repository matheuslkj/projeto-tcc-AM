import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegFileImage } from 'react-icons/fa';

const Profile = () => {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [about, setAbout] = useState('');

  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para salvar o perfil
    alert('Perfil salvo com sucesso!');
  };

  const handleCancel = () => {
    // Lógica para cancelar as alterações
    setName('');
    setSpecialty('');
    setProfilePic(null);
    setAbout('');

    navigate('/');
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-100 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-1" htmlFor="name">
            Nome
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite o nome"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-1" htmlFor="specialty">
            Especialidade
          </label>
          <input
            type="text"
            id="specialty"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite a especialidade"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-1" htmlFor="profilePic">
            Perfil
          </label>
          <div className="flex items-center">
            <input
              type="file"
              id="profilePic"
              onChange={handleProfilePicChange}
              className="hidden"
            />
            <label htmlFor="profilePic" className="cursor-pointer">
              <FaRegFileImage className="text-2xl text-gray-600 hover:text-blue-500" />
              
            </label>
            {profilePic && (
              <span className="ml-2 text-gray-700">{profilePic.name}</span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-1" htmlFor="about">
            Sobre
          </label>
          <textarea
            id="about"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Escreva sobre..."
            rows="4"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
