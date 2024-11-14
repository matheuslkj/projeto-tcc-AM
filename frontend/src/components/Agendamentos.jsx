import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Agendamentos = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [pacienteId, setPacienteId] = useState('');
    const [dataAtendimento, setDataAtendimento] = useState('');
    const [horaAtendimento, setHoraAtendimento] = useState('');
    const [historico, setHistorico] = useState('');
    const [status, setStatus] = useState('PENDENTE');
    const [procedimentoId, setProcedimentoId] = useState('');
    const [pacientes, setPacientes] = useState([]);
    const [procedimentos, setProcedimentos] = useState([]);

    useEffect(() => {
        buscarPacientes();
        buscarProcedimentos();
        if (id) {
            buscarAgendamento();
        }
    }, [id]);

    const buscarPacientes = async () => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const resposta = await axios.get('http://127.0.0.1:8000/api/v1/pacientes', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const pacientesOrdenados = resposta.data.sort((a, b) => a.nome.localeCompare(b.nome));
            setPacientes(pacientesOrdenados);
        } catch (erro) {
            console.error('Erro ao buscar pacientes:', erro);
        }
    };

    const buscarProcedimentos = async () => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const resposta = await axios.get('http://127.0.0.1:8000/api/v1/procedimentos', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const procedimentosOrdenados = resposta.data.sort((a, b) => a.nome.localeCompare(b.nome));
            setProcedimentos(procedimentosOrdenados);
        } catch (erro) {
            console.error('Erro ao buscar procedimentos:', erro);
        }
    };
    
    const buscarAgendamento = async () => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const resposta = await axios.get(`http://127.0.0.1:8000/api/v1/agendamentos/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const agendamento = resposta.data;
            setPacienteId(agendamento.id_paciente);
            setDataAtendimento(agendamento.data_atendimento);
            setHoraAtendimento(agendamento.hora_atendimento);
            setHistorico(agendamento.historico);
            setStatus(agendamento.status);
            setProcedimentoId(agendamento.id_procedimento || '');
        } catch (erro) {
            console.error('Erro ao buscar agendamento:', erro);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação de data e hora
        const dataHoraAtual = new Date();
        const dataHoraSelecionada = new Date(`${dataAtendimento}T${horaAtendimento}`);

        if (dataHoraSelecionada < dataHoraAtual) {
            Swal.fire({
                icon: 'warning',
                title: 'Data e hora inválidas',
                text: 'A data e hora devem ser maiores que o momento atual.',
            });
            return;
        }

        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const formattedHoraAtendimento = horaAtendimento ? horaAtendimento.slice(0, 5) : '';

        const novoAgendamento = {
            id_paciente: pacienteId,
            id_procedimento: procedimentoId,
            data_atendimento: dataAtendimento,
            hora_atendimento: formattedHoraAtendimento,
            historico: historico,
            status: status
        };

        try {
            if (id) {
                await axios.put(`http://127.0.0.1:8000/api/v1/agendamentos/${id}`, novoAgendamento, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                Swal.fire('Sucesso!', 'Agendamento atualizado com sucesso!', 'success');
            } else {
                await axios.post('http://127.0.0.1:8000/api/v1/agendamentos', novoAgendamento, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                Swal.fire('Sucesso!', 'Novo agendamento criado com sucesso!', 'success');
            }
            navigate('/');
        } catch (error) {
            console.error('Erro ao salvar agendamento:', error);
            Swal.fire('Erro!', 'Ocorreu um erro ao salvar o agendamento. Tente novamente.', 'error');
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6">{id ? 'Editar Agendamento' : 'Agendar Atendimento'}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="paciente">
                            Paciente
                        </label>
                        <select
                            id="paciente"
                            value={pacienteId}
                            onChange={(e) => setPacienteId(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="" disabled>Selecione um paciente</option>
                            {pacientes.map(paciente => (
                                <option key={paciente.id} value={paciente.id}>
                                    {paciente.nome} {paciente.sobrenome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="procedimento">
                            Procedimento
                        </label>
                        <select
                            id="procedimento"
                            value={procedimentoId}
                            onChange={(e) => setProcedimentoId(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="" disabled>Selecione um procedimento</option>
                            {procedimentos.map(procedimento => (
                                <option key={procedimento.id} value={procedimento.id}>
                                    {procedimento.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="data">
                            Data do Atendimento
                        </label>
                        <input
                            type="date"
                            id="data"
                            value={dataAtendimento}
                            onChange={(e) => setDataAtendimento(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="hora">
                            Hora do Atendimento
                        </label>
                        <input
                            type="time"
                            id="hora"
                            value={horaAtendimento}
                            onChange={(e) => setHoraAtendimento(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="historico">
                            Histórico (opcional)
                        </label>
                        <textarea
                            id="historico"
                            value={historico || ''}
                            onChange={(e) => setHistorico(e.target.value)}
                            placeholder="Descreva o que foi realizado no atendimento"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            rows="4"
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Status</label>
                        <div className="flex items-center">
                            <label className="mr-4">
                                <input
                                    type="radio"
                                    name="status"
                                    value="PENDENTE"
                                    checked={status === 'PENDENTE'}
                                    onChange={() => setStatus('PENDENTE')}
                                />
                                <span className="ml-2">Pendente</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="REALIZADO"
                                    checked={status === 'REALIZADO'}
                                    onChange={() => setStatus('REALIZADO')}
                                />
                                <span className="ml-2">Realizado</span>
                            </label>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end space-x-4">
                        <button
                            type="button"
                            className="w-32 bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600"
                            onClick={() => navigate('/')}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="w-32 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                        >
                            Agendar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Agendamentos;
