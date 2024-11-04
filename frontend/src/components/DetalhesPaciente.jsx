import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

const DetalhesPaciente = () => {
    const { id } = useParams();
    const [paciente, setPaciente] = useState(null);
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPaciente = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/v1/pacientes/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPaciente(response.data);
            } catch (error) {
                console.error("Erro ao buscar o paciente:", error);
            }
        };
        fetchPaciente();
    }, [id, token]);

    if (!paciente) return <p>Carregando...</p>;

    return (
        <div className="min-h-screen p-10 flex flex-col items-center bg-gray-100">
            <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Detalhes do Paciente</h1>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-gray-700"><strong>Nome:</strong> {paciente.nome} {paciente.sobrenome}</p>
                        <p className="text-gray-700"><strong>Data de Nascimento:</strong> {format(new Date(paciente.nascimento), 'dd-MM-yyyy', { locale: ptBR })}</p>
                        <p className="text-gray-700"><strong>CPF:</strong> {paciente.cpf}</p>
                        <p className="text-gray-700"><strong>Gênero:</strong> {paciente.genero}</p>
                    </div>
                    <div>
                        <p className="text-gray-700"><strong>Email:</strong> {paciente.email}</p>
                        <p className="text-gray-700"><strong>Profissão:</strong> {paciente.profissao}</p>
                        <p className="text-gray-700"><strong>Telefone:</strong> {paciente.telefone}</p>
                        <p className="text-gray-700"><strong>Data de Cadastro:</strong> {format(new Date(paciente.created_at), 'dd-MM-yyyy', { locale: ptBR })}</p>
                    </div>
                </div>

                <h2 className="text-2xl font-semibold mt-6 mb-2 text-blue-600">Endereço</h2>
                <p className="text-gray-700"><strong>CEP:</strong> {paciente.cep}</p>
                <p className="text-gray-700"><strong>Logradouro:</strong> {paciente.logradouro}, {paciente.numero}</p>
                <p className="text-gray-700"><strong>Bairro:</strong> {paciente.bairro}</p>
                <p className="text-gray-700"><strong>Cidade/Estado:</strong> {paciente.cidade_estado}</p>
                {paciente.complemento && (
                    <p className="text-gray-700"><strong>Complemento:</strong> {paciente.complemento}</p>
                )}

                <h2 className="text-2xl font-semibold mt-6 mb-2 text-blue-600">Sintomas</h2>
                <p className="text-gray-700">{paciente.sintomas}</p>

                <h2 className="text-2xl font-semibold mt-6 mb-2 text-blue-600">Histórico de Atendimentos</h2>
                {paciente.agendamento && paciente.agendamento.length > 0 ? (
                    <ul className="space-y-4 mt-4">
                        {paciente.agendamento.map((atendimento) => (
                            <li key={atendimento.id} className="p-4 border rounded-lg shadow-md">
                                <p><strong>Data:</strong> {format(new Date(atendimento.data_atendimento), 'dd-MM-yyyy', { locale: ptBR })}</p>
                                <p><strong>Hora:</strong> {atendimento.hora_atendimento}</p>
                                <p><strong>Status:</strong> {atendimento.status}</p>
                                <p><strong>Observações:</strong> {atendimento.historico || 'Nenhuma observação'}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-700">Nenhum atendimento encontrado.</p>
                )}

                <div className="flex justify-end mt-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    >
                        Voltar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetalhesPaciente;
