import React, { useState, useEffect } from 'react';

const Agendamentos = () => {
    // Estados para armazenar os valores dos campos
    const [pacienteId, setPacienteId] = useState('');
    const [dataAtendimento, setDataAtendimento] = useState('');
    const [horaAtendimento, setHoraAtendimento] = useState('');
    const [historico, setHistorico] = useState('');
    const [status, setStatus] = useState('PENDENTE');
    const [pacientes, setPacientes] = useState([]);

    // Função para buscar pacientes da API
    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token'); // Ou outra forma que você armazena o token

        fetch('http://127.0.0.1:8000/api/v1/pacientes', {
            headers: {
                'Authorization': `Bearer ${token}`, // Adicione o token de autenticação
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar pacientes');
                }
                return response.json();
            })
            .then(data => setPacientes(data))
            .catch(error => console.error('Erro ao buscar pacientes:', error));
    }, []);

    // Função para manipular o envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault();

        // Dados do novo agendamento
        const novoAgendamento = {
            paciente_id: pacienteId,
            data_atendimento: dataAtendimento,
            hora_atendimento: horaAtendimento,
            historico: historico,
            status: status
        };

        const token = localStorage.getItem('token');

        // Fazer o POST para cadastrar o agendamento na API
        fetch('http://127.0.0.1:8000/api/v1/agendamentos', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoAgendamento) // Enviar os dados no corpo da requisição
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao cadastrar agendamento');
                }
                return response.json();
            })
            .then(data => {
                console.log('Agendamento cadastrado com sucesso:', data);
                // Limpar os campos do formulário
                setPacienteId('');
                setDataAtendimento('');
                setHoraAtendimento('');
                setHistorico('');
                setStatus('PENDENTE');
            })
            .catch(error => console.error('Erro ao cadastrar agendamento:', error));
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6">Agendamento de Atendimento</h1>
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
                            value={historico}
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
                            onClick={() => console.log('Cancelado')}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="w-32 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Agendamentos;
