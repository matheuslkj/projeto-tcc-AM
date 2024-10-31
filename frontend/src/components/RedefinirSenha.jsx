import React, { useState } from 'react'; 
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isValidPassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    return regex.test(password);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!isValidPassword(password)) {
      Swal.fire('Erro', 'A senha deve ter pelo menos 8 caracteres, uma letra maiúscula e um caractere especial.', 'error');
      return;
    }

    if (password !== passwordConfirmation) {
      Swal.fire('Erro', 'As senhas não coincidem.', 'error');
      return;
    }

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
        Swal.fire('Sucesso', 'Senha redefinida com sucesso!', 'success');
        navigate('/login');
      }
    } catch (error) {
      console.error('Erro ao redefinir a senha:', error);
      Swal.fire('Erro', 'Erro ao redefinir a senha.', 'error');
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-8">
        <h1 className="text-3xl font-bold mb-6">Redefinir Senha</h1>
        <form onSubmit={handleResetPassword} className="w-full max-w-md">
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Nova senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-2 text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="mb-6 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirme a nova senha"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-2 text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Redefinir Senha
          </button>
        </form>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
      <div className="w-1/2 hidden md:block">
        <img
          src="https://blog.allcare.com.br/wp-content/uploads/2023/09/fisio.jpg"
          alt="Imagem relacionada à saúde"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ResetPassword;
