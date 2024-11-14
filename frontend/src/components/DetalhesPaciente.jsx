import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format, parse } from 'date-fns';
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

    const formatarCPF = (cpf) => {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    };

    const formatarTelefone = (telefone) => {
        return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    };

    if (!paciente) return <p>Carregando...</p>;

    return (
        <div className="min-h-screen p-10 flex flex-col items-center bg-gray-100">
            <div className="w-full max-w-4xl bg-white p-10 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Detalhes do Paciente</h1>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <p className="text-lg text-gray-700"><strong>Nome:</strong> {paciente.nome} {paciente.sobrenome}</p>
                        <p className="text-lg text-gray-700"><strong>Data de Nascimento:</strong> {format(new Date(paciente.nascimento), 'dd-MM-yyyy', { locale: ptBR })}</p>
                        <p className="text-lg text-gray-700"><strong>CPF:</strong> {formatarCPF(paciente.cpf)}</p>
                        <p className="text-lg text-gray-700"><strong>Gênero:</strong> {paciente.genero}</p>
                    </div>
                    <div>
                        <p className="text-lg text-gray-700"><strong>Email:</strong> {paciente.email}</p>
                        <p className="text-lg text-gray-700"><strong>Profissão:</strong> {paciente.profissao}</p>
                        <p className="text-lg text-gray-700"><strong>Telefone:</strong> {formatarTelefone(paciente.telefone)}</p>
                        <p className="text-lg text-gray-700"><strong>Data de Cadastro:</strong> {format(new Date(paciente.created_at), 'dd-MM-yyyy', { locale: ptBR })}</p>
                    </div>
                </div>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-600">Endereço</h2>
                <div className="pl-4 space-y-2">
                    <p className="text-lg text-gray-700"><strong>CEP:</strong> {paciente.cep}</p>
                    <p className="text-lg text-gray-700"><strong>Logradouro:</strong> {paciente.logradouro}, {paciente.numero}</p>
                    <p className="text-lg text-gray-700"><strong>Bairro:</strong> {paciente.bairro}</p>
                    <p className="text-lg text-gray-700"><strong>Cidade:</strong> {paciente.cidade}</p>
                    <p className="text-lg text-gray-700"><strong>Estado:</strong> {paciente.estado}</p>
                    {paciente.complemento && (
                        <p className="text-lg text-gray-700"><strong>Complemento:</strong> {paciente.complemento}</p>
                    )}
                </div>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-600">Sintomas</h2>
                <p className="text-lg text-gray-700 pl-4">{paciente.sintomas}</p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-600">Histórico de Atendimentos</h2>
                {paciente.agendamento && paciente.agendamento.length > 0 ? (
                    <ul className="space-y-4 mt-4">
                        {paciente.agendamento.map((atendimento) => (
                            <li key={atendimento.id} className="p-4 border rounded-lg shadow-md bg-gray-50">
                                <p className="text-lg"><strong>Data:</strong> {format(new Date(new Date(atendimento.data_atendimento).setHours(new Date(atendimento.data_atendimento).getHours() + 3)), 'dd-MM-yyyy', { locale: ptBR })}</p>

                                <p className="text-lg"><strong>Hora:</strong> {format(parse(atendimento.hora_atendimento, 'HH:mm:ss', new Date()), 'HH:mm')}</p>
                                <p className="text-lg"><strong>Status:</strong> {atendimento.status}</p>
                                <p className="text-lg"><strong>Observações:</strong> {atendimento.historico || 'Nenhuma observação'}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-lg text-gray-700">Nenhum atendimento encontrado.</p>
                )}

                <div className="flex justify-end mt-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-blue-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-blue-600"
                    >
                        Voltar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetalhesPaciente;
