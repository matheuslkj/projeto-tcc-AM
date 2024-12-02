import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Profile = () => {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [about, setAbout] = useState('');
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const data = {
        name,
        specialty,
        about,
      };

      await axios.put('http://127.0.0.1:8000/api/v1/user/profile', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.setItem('userName', name);
      sessionStorage.setItem('userName', name);

      Swal.fire({
        title: 'Sucesso!',
        text: 'Seu perfil foi atualizado com sucesso.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        navigate('/');
        window.location.reload();
      });
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);

      Swal.fire({
        title: 'Erro!',
        text: 'Ocorreu um erro ao salvar o perfil. Verifique os campos e tente novamente.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d33',
      });
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
