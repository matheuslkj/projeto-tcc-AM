import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import InputMask from 'react-input-mask';
import Swal from 'sweetalert2';

const Login = () => {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [manterConectado, setManterConectado] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    

    try {
      const response = await fetch("http://localhost:8000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cpf: cpf,
          password: senha,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        const userName = data.user.name;

        if (manterConectado) {
          localStorage.setItem("token", token);
          localStorage.setItem("userName", userName);
        } else {
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("userName", userName);
        }

        setLoading(true);

        navigate("/");
      } else if (response.status === 429) {
        Swal.fire({
          icon: "error",
          title: "Tentativas excedidas",
          text: "Por favor, tente novamente após 5 minuto.",
        });
      } else {
        Swal.fire({
          title: "Erro ao fazer login",
          text: "Verifique suas credenciais e tente novamente.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro no servidor",
        text: "Não foi possível conectar ao servidor. Tente novamente mais tarde.",
      });
    } finally {
      setLoading(false); 
    }
  };

  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="bg-gray-800 animate-pulse rounded-lg p-6 w-80">
          <div className="h-12 bg-gray-700 rounded mb-4"></div>
          <div className="h-10 bg-gray-700 rounded mb-4"></div>
          <div className="h-10 bg-gray-700 rounded mb-4"></div>
          <div className="h-12 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-8">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <form onSubmit={handleLogin} className="w-full max-w-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cpf">
              CPF
            </label>
            <InputMask
              mask="999.999.999-99"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            >
              {() => (
                <input
                  type="text"
                  id="cpf"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Digite seu CPF"
                  required
                />
              )}
            </InputMask>
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
