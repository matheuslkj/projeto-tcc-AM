import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/v1/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Um link de redefinição de senha foi enviado para o seu e-mail.');
      } else {
        setMessage( data.message ||'Erro ao enviar o link de redefinição de senha.');
      }
    } catch (error) {
      console.error('Erro ao enviar o link de redefinição:', error);
      setMessage('Erro de conexão com o servidor.');
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full flex flex-col justify-center items-center bg-white p-8">
        <h1 className="text-3xl font-bold mb-6">Esqueceu sua senha?</h1>
        <form onSubmit={handleForgotPassword} className="w-full max-w-md">
          <div className="mb-4">
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Enviar link de redefinição
          </button>
        </form>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
