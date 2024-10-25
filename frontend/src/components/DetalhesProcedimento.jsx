import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player'; // Importando a biblioteca ReactPlayer

const DetalhesProcedimento = () => {
  const { id } = useParams(); // Pegamos o ID do procedimento a partir da URL
  const [procedimento, setProcedimento] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false); // Controle para abrir o vídeo em tela cheia
  const navigate = useNavigate(); // Para navegar de volta

  useEffect(() => {
    const buscarProcedimento = async () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
        const resposta = await axios.get(`http://127.0.0.1:8000/api/v1/procedimentos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
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
    <div className="min-h-screen flex justify-center items-center p-10 bg-gradient-to-r from-blue-100 via-white to-blue-100">
      <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-4xl relative">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">{procedimento.nome}</h1>
          <button 
            onClick={() => navigate(-1)} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300"
          >
            Voltar
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Descrição</h2>
          <p className="text-gray-600 text-lg leading-relaxed">{procedimento.descricao}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Objetivo</h2>
          <p className="text-gray-600 text-lg leading-relaxed">{procedimento.objetivo}</p>
        </div>

        {procedimento.video && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Vídeo Demonstrativo</h2>

            {/* Vídeo em miniatura */}
            <div 
              className={`relative overflow-hidden rounded-lg shadow-lg transition duration-300 ease-in-out ${isVideoOpen ? 'w-full h-96' : 'w-full h-48 cursor-pointer'}`}
              onClick={() => setIsVideoOpen(!isVideoOpen)} // Expande o vídeo ao clicar
            >
              <ReactPlayer
                url={converterLinkYoutube(procedimento.video)}
                width="100%"
                height="100%"
                controls={true}
                light={!isVideoOpen} // Mostra uma imagem de miniatura até clicar
              />
              {!isVideoOpen && (
                <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                  <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold shadow-lg">
                    Assistir Vídeo
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetalhesProcedimento;
