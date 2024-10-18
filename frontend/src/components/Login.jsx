import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Ícones para mostrar/esconder senha

const Login = () => {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [manterConectado, setManterConectado] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Enviando CPF e senha para o backend
      const response = await fetch('http://localhost:8000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cpf: cpf,
          password: senha,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        // Armazenar o token no localStorage (ou sessionStorage)
        if (manterConectado) {
          localStorage.setItem('token', token);
        } else {
          sessionStorage.setItem('token', token);
        }

        // Redireciona para a página de listagem de pacientes após o login
        navigate('/');
      } else {
        // Tratar erro de login
        alert('Erro ao fazer login. Verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro durante o login:', error);
      alert('Erro de conexão com o servidor.');
    }
  };

  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  return (
    <div className="min-h-screen flex">
      {/* Esquerda: Formulário de Login */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-8">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <form onSubmit={handleLogin} className="w-full max-w-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cpf">
              CPF
            </label>
            <input
              type="text"
              id="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Digite seu CPF"
              required
            />
          </div>
          <div className="mb-6 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="senha">
              Senha
            </label>
            <input
              type={mostrarSenha ? 'text' : 'password'}
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Digite sua senha"
              required
            />
            <span 
              className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer mt-6"
              onClick={toggleMostrarSenha}
            >
              {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input 
                type="checkbox" 
                className="form-checkbox" 
                checked={manterConectado}
                onChange={(e) => setManterConectado(e.target.checked)}
              />
              <span className="ml-2 text-gray-700">Manter conectado</span>
            </label>
          </div>
          <div className="flex flex-col items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
            >
              Entrar
            </button>
            <button
              type="button"
              className="text-blue-500 hover:text-blue-700 font-semibold"
              onClick={() => navigate('/forgot-password')}
            >
              Esqueci minha senha
            </button>
          </div>
        </form>
      </div>

      {/* Direita: Imagem de saúde usando URL externa */}
      <div className="w-1/2">
        <img
          src="https://blog.allcare.com.br/wp-content/uploads/2023/09/fisio.jpg"
          alt="Imagem relacionada à saúde"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
