import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import FormularioPaciente from './FormularioPaciente';
import { format } from 'date-fns'; 
import ptBR from 'date-fns/locale/pt-BR'; 

const Home = () => {
    const [agendamentos, setAgendamentos] = useState([]);
    const [busca, setBusca] = useState('');
    const [mostrarModal, setMostrarModal] = useState(false);

   
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    const buscarAgendamentos = async () => {
        try {
            const resposta = await axios.get('http://127.0.0.1:8000/api/v1/agendamentos', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAgendamentos(resposta.data); 
        } catch (erro) {
            console.error('Erro ao buscar agendamentos:', erro);
        }
    };

    useEffect(() => {
        buscarAgendamentos();
    }, []);

    useEffect(() => {
    }, [agendamentos]);

    const agendamentosFiltrados = agendamentos.filter(agendamento =>
        agendamento.paciente?.nome?.toLowerCase().includes(busca.toLowerCase())
    );

    const handleAdicionarPaciente = () => {
        setMostrarModal(true);
    };

    const handleFecharModal = () => {
        setMostrarModal(false);
    };

    const handleSubmitFormulario = async (dadosPaciente) => {
        try {
            await axios.post('http://127.0.0.1:8000/api/v1/pacientes', dadosPaciente, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
            setMostrarModal(false);
            buscarAgendamentos(); 
        } catch (erro) {
            console.error('Erro ao cadastrar paciente:', erro);
        }
    };

    return (
        <div className='min-h-screen flex justify-center m-10'>
            <div className="overflow-x-auto w-full max-w-4xl">
                <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="Buscar paciente"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-1/2"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                    <button
                        onClick={handleAdicionarPaciente}
                        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        <FaPlus className="mr-2" /> Adicionar Paciente
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nome</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Profissão</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Data do Atendimento</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Hora Atendimento</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agendamentosFiltrados.length > 0 ? (
                                agendamentosFiltrados.map((agendamento) => (
                                    <tr key={agendamento.id} className="border-t">
                                        <td className="px-4 py-2 text-sm text-gray-600">{agendamento.paciente?.nome} {agendamento.paciente?.sobrenome}</td>
                                        <td className="px-4 py-2 text-sm text-gray-600">{agendamento.profissao}</td>
                                        <td className="px-4 py-2 text-sm text-gray-600">
                                            {agendamento.data_atendimento ? format(new Date(agendamento.data_atendimento), 'dd-MM-yyyy', { locale: ptBR }) : ''}
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-600">
                                            {agendamento.hora_atendimento ? format(new Date(`1970-01-01T${agendamento.hora_atendimento}`), 'HH:mm', { locale: ptBR }) : ''}
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-600">{agendamento.status}</td>
                                        <td className="px-4 py-2 text-center">
                                            <button className="text-blue-500 hover:text-blue-700 mr-4">
                                                <FaEdit />
                                            </button>
                                            <button className="text-red-500 hover:text-red-700">
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-4 py-2 text-sm text-gray-600 text-center">
                                        Nenhum agendamento encontrado
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {mostrarModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
                        <FormularioPaciente onSubmit={handleSubmitFormulario} onClose={handleFecharModal} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
