import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DetalhesProcedimento = () => {
  const { id } = useParams(); // Pegamos o ID do procedimento a partir da URL
  const [procedimento, setProcedimento] = useState(null);
  const navigate = useNavigate(); // Para navegar de volta

  useEffect(() => {
    const buscarProcedimento = async () => {
      try {
        const resposta = await axios.get(`http://127.0.0.1:8000/api/v1/procedimentos/${id}`);
        setProcedimento(resposta.data);
      } catch (erro) {
        console.error('Erro ao buscar procedimento:', erro);
      }
    };

    buscarProcedimento();
  }, [id]);

  if (!procedimento) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-10 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">{procedimento.nome}</h1>
          <button onClick={() => navigate(-1)} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
            Voltar
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Descrição</h2>
          <p className="text-gray-700">{procedimento.descricao}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Objetivo</h2>
          <p className="text-gray-700">{procedimento.objetivo}</p>
        </div>

        {procedimento.video && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Vídeo Demonstrativo</h2>
            <video controls className="w-full">
              <source src={`http://127.0.0.1:8000/storage/${procedimento.video}`} type="video/mp4" />
              Seu navegador não suporta o elemento de vídeo.
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetalhesProcedimento;
