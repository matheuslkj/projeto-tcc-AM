import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import { FaEdit, FaTrash, FaPlus, FaSort, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Home = () => {
    const [agendamentos, setAgendamentos] = useState([]);
    const [busca, setBusca] = useState('');
    const [mostrarModal, setMostrarModal] = useState(false);
    const [ordenacaoHoje, setOrdenacaoHoje] = useState({ campo: 'nome', ordem: 'asc' });
    const [ordenacaoOutrosDias, setOrdenacaoOutrosDias] = useState({ campo: 'nome', ordem: 'asc' });
    const [paginaHoje, setPaginaHoje] = useState(1);
    const [paginaOutrosDias, setPaginaOutrosDias] = useState(1);
    const navigate = useNavigate();
    const itensPorPagina = 10;

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

    const ordenarAgendamentos = (campo, tipoTabela) => {
        const novaOrdem = tipoTabela === 'hoje'
            ? ordenacaoHoje.ordem === 'asc' ? 'desc' : 'asc'
            : ordenacaoOutrosDias.ordem === 'asc' ? 'desc' : 'asc';

        const ordenacaoAtualizada = { campo, ordem: novaOrdem };
        if (tipoTabela === 'hoje') {
            setOrdenacaoHoje(ordenacaoAtualizada);
        } else {
            setOrdenacaoOutrosDias(ordenacaoAtualizada);
        }

        const agendamentosOrdenados = [...agendamentos].sort((a, b) => {
            if (campo === 'nome') {
                return novaOrdem === 'asc'
                    ? a.paciente.nome.localeCompare(b.paciente.nome)
                    : b.paciente.nome.localeCompare(a.paciente.nome);
            } else if (campo === 'data_atendimento') {
                return novaOrdem === 'asc'
                    ? new Date(a.data_atendimento) - new Date(b.data_atendimento)
                    : new Date(b.data_atendimento) - new Date(a.data_atendimento);
            } else if (campo === 'status') {
                return novaOrdem === 'asc'
                    ? a.status.localeCompare(b.status)
                    : b.status.localeCompare(a.status);
            }
            return 0;
        });

        setAgendamentos(agendamentosOrdenados);
    };

    const agendamentosFiltrados = agendamentos.filter(agendamento =>
        agendamento.paciente?.nome?.toLowerCase().includes(busca.toLowerCase())
    );

    const dataHoje = format(new Date(), 'yyyy-MM-dd');
    const agendamentosHoje = agendamentosFiltrados.filter(agendamento =>
        agendamento.data_atendimento === dataHoje
    );
    const agendamentosOutrosDias = agendamentosFiltrados.filter(agendamento =>
        agendamento.data_atendimento !== dataHoje
    );

    const handleEditar = (agendamentoId) => {
        navigate(`/editar-agendamento/${agendamentoId}`);
    };

    const handleExcluir = async (id) => {
        Swal.fire({
            title: 'Tem certeza?',
            text: 'Você não poderá reverter essa ação!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://127.0.0.1:8000/api/v1/agendamentos/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    Swal.fire('Excluído!', 'O agendamento foi excluído com sucesso.', 'success');
                    buscarAgendamentos();
                } catch (erro) {
                    console.error('Erro ao excluir agendamento:', erro);
                    Swal.fire('Erro!', 'Ocorreu um erro ao excluir o agendamento.', 'error');
                }
            }
        });
    };

    const renderTabela = (titulo, agendamentos, pagina, setPagina, ordenacao, tipoTabela) => {
        const inicio = (pagina - 1) * itensPorPagina;
        const paginatedData = agendamentos.slice(inicio, inicio + itensPorPagina);
        const totalPaginas = Math.ceil(agendamentos.length / itensPorPagina);

        return (
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">{titulo}</h3>
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                Nome <FaSort onClick={() => ordenarAgendamentos('nome', tipoTabela)} className="inline cursor-pointer" />
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                Procedimento
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                Data do Atendimento <FaSort onClick={() => ordenarAgendamentos('data_atendimento', tipoTabela)} className="inline cursor-pointer" />
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Hora Atendimento</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                Status <FaSort onClick={() => ordenarAgendamentos('status', tipoTabela)} className="inline cursor-pointer" />
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((agendamento) => (
                                <tr key={agendamento.id} className="border-t hover:bg-gray-200">
                                    <td className="px-4 py-2 text-sm text-gray-600">{agendamento.paciente?.nome} {agendamento.paciente?.sobrenome}</td>
                                    <td className="px-4 py-2 text-sm text-gray-600">{agendamento.procedimento?.nome}</td>
                                    <td className="px-4 py-2 text-sm text-gray-600">
                                        {agendamento.data_atendimento
                                            ? format(new Date(agendamento.data_atendimento + 'T00:00:00'), 'dd-MM-yyyy', { locale: ptBR })
                                            : ''}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-600">
                                        {agendamento.hora_atendimento
                                            ? format(new Date(`1970-01-01T${agendamento.hora_atendimento}`), 'HH:mm', { locale: ptBR })
                                            : ''}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-600">
                                        <div className="flex items-center min-w-[100px] justify-between">
                                            <span>{agendamento.status}</span>
                                            <span className={`ml-2 w-3 h-3 rounded-full ${agendamento.status === 'PENDENTE' ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <button onClick={() => handleEditar(agendamento.id)} className="text-blue-500 hover:text-blue-700 mr-4">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleExcluir(agendamento.id)} className="text-red-500 hover:text-red-700">
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
                <div className="flex justify-end mt-4">
                    <button
                        disabled={pagina === 1}
                        onClick={() => setPagina(pagina - 1)}
                        className="p-2 border rounded mr-2 disabled:opacity-50"
                    >
                        <FaChevronLeft />
                    </button>
                    <span className="p-2">{pagina} de {totalPaginas}</span>
                    <button
                        disabled={pagina === totalPaginas}
                        onClick={() => setPagina(pagina + 1)}
                        className="p-2 border rounded ml-2 disabled:opacity-50"
                    >
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <div className="flex-grow">
                <div className="overflow-x-auto w-full max-w-4xl mb-8 mx-auto">
                    <div className="flex justify-between items-center mb-4 mt-10">
                        <input
                            type="text"
                            placeholder="Buscar paciente"
                            className="border border-gray-300 rounded-lg px-4 py-2 w-1/2"
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>

                    {renderTabela("Atendimentos de Hoje", agendamentosHoje, paginaHoje, setPaginaHoje, ordenacaoHoje, 'hoje')}
                    {renderTabela("Atendimentos de Outros Dias", agendamentosOutrosDias, paginaOutrosDias, setPaginaOutrosDias, ordenacaoOutrosDias, 'outrosDias')}
                </div>
            </div>

            {mostrarModal && (
                <div
                    id="modal-overlay"
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    onClick={handleClickOutsideModal}
                >
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <FormularioPaciente onSubmit={handleSubmitFormulario} onClose={handleFecharModal} />
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Home;
