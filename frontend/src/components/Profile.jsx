import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [about, setAbout] = useState('');
  const navigate = useNavigate();

  // Função para buscar os dados do perfil do usuário
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/api/v1/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { name = '', specialty = '', about = '' } = response.data;
      setName(name);
      setSpecialty(specialty);
      setAbout(about);
    } catch (error) {
      console.error('Erro ao carregar o perfil:', error);
    }
  };

  // Chama a função de buscar perfil ao carregar o componente
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Função para enviar o formulário de atualização de perfil
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const data = {
        name,
        specialty,
        about,
      };

      const response = await axios.put('http://127.0.0.1:8000/api/v1/user/profile', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Resposta do backend:', response.data);
      alert('Perfil salvo com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      alert('Erro ao salvar o perfil. Verifique os campos e tente novamente.');
    }
  };

  const handleCancel = () => {
    setName('');
    setSpecialty('');
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
            value={name || ''}
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
            value={specialty || ''}
            onChange={(e) => setSpecialty(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite a especialidade"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-1" htmlFor="about">
            Sobre
          </label>
          <textarea
            id="about"
            value={about || ''}
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
