import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    try {
      const response = await fetch('http://localhost:8000/api/v1/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, email, password, password_confirmation: passwordConfirmation }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Erro ao redefinir a senha:', error);
      setMessage('Erro ao redefinir a senha.');
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full flex flex-col justify-center items-center bg-white p-8">
        <h1 className="text-3xl font-bold mb-6">Redefinir Senha</h1>
        <form onSubmit={handleResetPassword} className="w-full max-w-md">
          <div className="mb-4">
            <input
              type="password"
              placeholder="Nova senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Confirme a nova senha"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Redefinir Senha
          </button>
        </form>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
