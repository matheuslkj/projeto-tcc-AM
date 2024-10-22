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
  const converterLinkYoutube = (url) => {
    let videoId = null;
  
    if (url.includes('youtube.com/watch')) {
      videoId = url.split('v=')[1]?.split('&')[0];  // Captura o ID do vídeo da URL padrão
    } else if (url.includes('youtu.be')) {
      videoId = url.split('youtu.be/')[1];  // Captura o ID do vídeo de um link curto
    }
  
    if (!videoId) return url; // Retorna o link original se não for um link do YouTube válido
  
    const embedLink = `https://www.youtube.com/embed/${videoId}`;
    return embedLink;
  };
  
  

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
    <iframe
      width="560"
      height="315"
      src={converterLinkYoutube(procedimento.video)}
      title="Vídeo do Procedimento"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full"
    ></iframe>
  </div>
)}

      </div>
    </div>
  );
};

export default DetalhesProcedimento;
