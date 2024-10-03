import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Ícones para mostrar/esconder senha

const Login = () => {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false); // Estado para alternar visibilidade da senha
  const [manterConectado, setManterConectado] = useState(false); // Estado para o checkbox "manter conectado"
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Redireciona para a URL completa da listagem de pacientes
    window.location.href = 'http://localhost:5173/';
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
              type={mostrarSenha ? 'text' : 'password'} // Muda o tipo de input com base no estado
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Digite sua senha"
              required
            />
            {/* Ícone de olho para mostrar/esconder senha */}
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
              onClick={() => alert('Função de recuperação de senha ainda não implementada.')}
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
