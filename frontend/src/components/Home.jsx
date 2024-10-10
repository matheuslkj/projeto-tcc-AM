import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import FormularioPaciente from './FormularioPaciente'; // Importar o formulário de paciente

const Home = () => {
    const [pacientes, setPacientes] = useState([]);
    const [busca, setBusca] = useState('');
    const [mostrarModal, setMostrarModal] = useState(false); // Estado para controlar o modal

    const buscarPacientes = async () => {
        try {
            const resposta = await axios.get('http://127.0.0.1:8000/api/v1/pacientes');
            setPacientes(resposta.data);
        } catch (erro) {
            console.error('Erro ao buscar pacientes:', erro);
        }
    };

    useEffect(() => {
        buscarPacientes();
    }, []);

    const pacientesFiltrados = pacientes.filter(paciente =>
        paciente.nome.toLowerCase().includes(busca.toLowerCase())
    );

    const handleAdicionarPaciente = () => {
        setMostrarModal(true); // Mostrar o modal quando clicar em "Adicionar Paciente"
    };

    const handleFecharModal = () => {
        setMostrarModal(false); // Fechar o modal
    };

    const handleSubmitFormulario = async (dadosPaciente) => {
        // Aqui você faz a requisição para cadastrar o paciente
        try {
            await axios.post('http://127.0.0.1:8000/api/v1/pacientes', dadosPaciente);
            setMostrarModal(false); // Fechar o modal após o cadastro
            buscarPacientes(); // Atualizar a lista de pacientes
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
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Idade</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Profissão</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pacientesFiltrados.length > 0 ? (
                                pacientesFiltrados.map((paciente) => (
                                    <tr key={paciente.id} className="border-t">
                                        <td className="px-4 py-2 text-sm text-gray-600">{paciente.nome}</td>
                                        <td className="px-4 py-2 text-sm text-gray-600">{paciente.idade}</td>
                                        <td className="px-4 py-2 text-sm text-gray-600">{paciente.profissao}</td>
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
                                    <td colSpan="4" className="px-4 py-2 text-sm text-gray-600 text-center">
                                        Nenhum paciente encontrado
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {mostrarModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto"> {/* max-h-screen e overflow-y-auto adicionados */}
                        <FormularioPaciente onSubmit={handleSubmitFormulario} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
