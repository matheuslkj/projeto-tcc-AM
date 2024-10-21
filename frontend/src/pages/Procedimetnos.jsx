import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import para navegação

const ListaProcedimentos = () => {
    const [procedimentos, setProcedimentos] = useState([]);
    const [busca, setBusca] = useState('');
    const navigate = useNavigate(); // Hook de navegação

    useEffect(() => {
        const buscarProcedimentos = async () => {
            try {
              const resposta = await axios.get('http://127.0.0.1:8000/api/v1/procedimentos');
              setProcedimentos(resposta.data);
            } catch (erro) {
              console.error('Erro ao buscar procedimentos:', erro);
            }
          };
          
        buscarProcedimentos();
    }, []);

    const procedimentosFiltrados = procedimentos.filter(procedimento =>
        procedimento.nome.toLowerCase().includes(busca.toLowerCase())
    );

    const handleClickProcedimento = (id) => {
        navigate(`/procedimentos/${id}`); // Navegar para a página de detalhes
    };

    return (
        <div className="min-h-screen flex justify-center p-10">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg">
                <div className="bg-blue-500 text-white p-4 flex justify-between items-center rounded-t-lg">
                    <div className="flex items-center space-x-2 bg-white rounded-lg p-1">
                        <input
                            type="text"
                            placeholder="Buscar"
                            className="border-none outline-none px-2 py-1 text-gray-700"
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>
                </div>

                {/* Tabela de Procedimentos */}
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto bg-white">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-4 py-2 text-left">Nome</th>
                                <th className="border px-4 py-2 text-left">Descrição</th>
                                <th className="border px-4 py-2 text-left">Objetivo</th>
                                <th className="border px-4 py-2 text-center">Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {procedimentosFiltrados.length > 0 ? (
                                procedimentosFiltrados.map((procedimento) => (
                                    <tr
                                        key={procedimento.id}
                                        className="border-t cursor-pointer hover:bg-gray-200" 
                                    >
                                        {/* Clicar nessas colunas leva aos detalhes */}
                                        <td className="border px-4 py-2" onClick={() => handleClickProcedimento(procedimento.id)}>{procedimento.nome}</td>
                                        <td className="border px-4 py-2" onClick={() => handleClickProcedimento(procedimento.id)}>{procedimento.descricao}</td>
                                        <td className="border px-4 py-2" onClick={() => handleClickProcedimento(procedimento.id)}>{procedimento.objetivo}</td>

                                       
                                        <td className="border px-4 py-2 text-center">
                                            <button className="text-yellow-500 hover:text-yellow-700 mr-4">
                                                <FaEdit />
                                            </button>
                                            <button className="text-red-500 hover:text-red-700">
                                                <FaTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="border px-4 py-2 text-center">
                                        Nenhum procedimento encontrado
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ListaProcedimentos;
