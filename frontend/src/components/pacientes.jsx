import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSort } from 'react-icons/fa';
import axios from 'axios';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [busca, setBusca] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    nascimento: '',
    cpf: '',
    email: '',
    profissao: '',
    sintomas: '',
    genero: '',
    telefone: '',
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade_estado: '',
    complemento: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [ordenacao, setOrdenacao] = useState({ campo: 'nome', ordem: 'asc' });
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  useEffect(() => {
    fetchPacientes();
  }, []);

  const fetchPacientes = async () => {
    try {
      const resposta = await axios.get('http://127.0.0.1:8000/api/v1/pacientes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPacientes(resposta.data);
    } catch (erro) {
      console.error('Erro ao buscar pacientes:', erro);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://127.0.0.1:8000/api/v1/pacientes/${idEditando}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        Swal.fire('Sucesso!', 'Paciente atualizado com sucesso!', 'success');
      } else {
        await axios.post('http://127.0.0.1:8000/api/v1/pacientes', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        Swal.fire('Sucesso!', 'Novo paciente cadastrado com sucesso!', 'success');
      }
      setShowModal(false);
      fetchPacientes();
      limparFormulario();
      setIsEditing(false);
    } catch (erro) {
      console.error('Erro ao salvar paciente:', erro);
      Swal.fire('Erro!', 'Ocorreu um erro ao salvar o paciente.', 'error');
    }
  };

  const limparFormulario = () => {
    setFormData({
      nome: '',
      sobrenome: '',
      nascimento: '',
      cpf: '',
      email: '',
      profissao: '',
      sintomas: '',
      genero: '',
      telefone: '',
      cep: '',
      logradouro: '',
      numero: '',
      bairro: '',
      cidade_estado: '',
      complemento: ''
    });
  };

  const handleEditar = (paciente) => {
    setFormData(paciente);
    setIdEditando(paciente.id);
    setIsEditing(true);
    setShowModal(true);
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
          await axios.delete(`http://127.0.0.1:8000/api/v1/pacientes/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          Swal.fire('Excluído!', 'O paciente foi excluído com sucesso.', 'success');
          fetchPacientes();
        } catch (erro) {
          console.error('Erro ao excluir paciente:', erro);
          Swal.fire('Erro!', 'Ocorreu um erro ao excluir o paciente.', 'error');
        }
      }
    });
  };

  const ordenarPacientes = (campo) => {
    const novaOrdem = ordenacao.ordem === 'asc' ? 'desc' : 'asc';
    setOrdenacao({ campo, ordem: novaOrdem });
    const sorted = [...pacientes].sort((a, b) =>
      novaOrdem === 'asc' ? a[campo].localeCompare(b[campo]) : b[campo].localeCompare(a[campo])
    );
    setPacientes(sorted);
  };

  const pacientesFiltrados = pacientes
    .filter(paciente => paciente.nome.toLowerCase().includes(busca.toLowerCase()))
    .slice((paginaAtual - 1) * itensPorPagina, paginaAtual * itensPorPagina);

  const totalPaginas = Math.ceil(pacientes.filter(p => p.nome.toLowerCase().includes(busca.toLowerCase())).length / itensPorPagina);

  const handlePaginaAnterior = () => {
    if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1);
  };

  const handleProximaPagina = () => {
    if (paginaAtual < totalPaginas) setPaginaAtual(paginaAtual + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-6xl mx-auto mt-8 p-4">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Buscar paciente"
            className="border rounded-lg px-4 py-2 w-1/2"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button
            onClick={() => {
              setShowModal(true);
              setIsEditing(false);
              limparFormulario();
            }}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <FaPlus className="mr-2" /> Adicionar Paciente
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th onClick={() => ordenarPacientes('nome')} className="px-4 py-2 text-left text-sm font-medium text-gray-700 cursor-pointer">
                  Nome <FaSort />
                </th>
                <th onClick={() => ordenarPacientes('created_at')} className="px-4 py-2 text-left text-sm font-medium text-gray-700 cursor-pointer">
                  Data Cadastro <FaSort />
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Opções</th>
              </tr>
            </thead>
            <tbody>
              {pacientesFiltrados.map((paciente) => (
                <tr key={paciente.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 text-black cursor-pointer" onClick={() => navigate(`/paciente/${paciente.id}`)}>
                    {paciente.nome} {paciente.sobrenome}
                  </td>
                  <td className="px-4 py-2">{format(new Date(paciente.created_at), 'dd-MM-yyyy', { locale: ptBR })}</td>
                  <td className="px-4 py-2 text-center flex justify-center space-x-4">
                    <button onClick={() => handleEditar(paciente)} className="text-yellow-500 hover:text-yellow-700">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleExcluir(paciente.id)} className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <button onClick={handlePaginaAnterior} disabled={paginaAtual === 1} className="bg-gray-300 px-3 py-1 rounded-md disabled:opacity-50">
              Anterior
            </button>
            <span>Página {paginaAtual} de {totalPaginas}</span>
            <button onClick={handleProximaPagina} disabled={paginaAtual === totalPaginas} className="bg-gray-300 px-3 py-1 rounded-md disabled:opacity-50">
              Próxima
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Editar Paciente' : 'Cadastrar Paciente'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label className="block text-gray-700 font-medium mb-1">Nome</label>
                  <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" required />
                </div>
                <div className="col-span-1">
                  <label className="block text-gray-700 font-medium mb-1">Sobrenome</label>
                  <input type="text" name="sobrenome" value={formData.sobrenome} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" required />
                </div>
                <div className="col-span-1">
                  <label className="block text-gray-700 font-medium mb-1">Data de Nascimento</label>
                  <input type="date" name="nascimento" value={formData.nascimento} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" required />
                </div>
                <div className="col-span-1">
                  <label className="block text-gray-700 font-medium mb-1">CPF</label>
                  <input type="text" name="cpf" value={formData.cpf} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" required />
                </div>
                <div className="col-span-1">
                  <label className="block text-gray-700 font-medium mb-1">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" required />
                </div>
                <div className="col-span-1">
                  <label className="block text-gray-700 font-medium mb-1">Profissão</label>
                  <input type="text" name="profissao" value={formData.profissao} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div className="col-span-1">
                  <label className="block text-gray-700 font-medium mb-1">Telefone</label>
                  <input type="text" name="telefone" value={formData.telefone} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div className="col-span-1">
                  <label className="block text-gray-700 font-medium mb-1">CEP</label>
                  <input type="text" name="cep" value={formData.cep} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div className="col-span-1">
                  <label className="block text-gray-700 font-medium mb-1">Logradouro</label>
                  <input type="text" name="logradouro" value={formData.logradouro} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div className="col-span-1">
                  <label className="block text-gray-700 font-medium mb-1">Número</label>
                  <input type="text" name="numero" value={formData.numero} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700 font-medium mb-1">Complemento</label>
                  <input type="text" name="complemento" value={formData.complemento} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button type="button" onClick={() => setShowModal(false)} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Cancelar</button>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">{isEditing ? 'Salvar Alterações' : 'Cadastrar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pacientes;