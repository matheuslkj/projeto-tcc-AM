import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';

const Procedimentos = () => {
  const [procedimentos, setProcedimentos] = useState([]);
  const [busca, setBusca] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: '',
    descricao: '',
    objetivo: '',
    video: '',
  });
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  useEffect(() => {
    buscarProcedimentos();
  }, []);

  const buscarProcedimentos = async () => {
    try {
      const resposta = await axios.get('http://127.0.0.1:8000/api/v1/procedimentos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProcedimentos(resposta.data);
    } catch (erro) {
      console.error('Erro ao buscar procedimentos:', erro);
    }
  };

  const handleCadastroProcedimento = async (e) => {
    e.preventDefault();
    const formData = {
      nome: dadosFormulario.nome,
      descricao: dadosFormulario.descricao,
      objetivo: dadosFormulario.objetivo,
      video: dadosFormulario.video,
    };

    try {
      if (editando) {
        await axios.put(`http://127.0.0.1:8000/api/v1/procedimentos/${idEditando}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Swal.fire('Sucesso!', 'Procedimento atualizado com sucesso!', 'success');
        setEditando(false);
        setIdEditando(null);
      } else {
        await axios.post('http://127.0.0.1:8000/api/v1/procedimentos', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Swal.fire('Sucesso!', 'Novo procedimento cadastrado com sucesso!', 'success');
      }

      setDadosFormulario({ nome: '', descricao: '', objetivo: '', video: '' });
      buscarProcedimentos();
      setMostrarModal(false);
    } catch (erro) {
      console.error('Erro ao cadastrar procedimento:', erro);
      Swal.fire('Erro!', 'Ocorreu um erro ao salvar o procedimento.', 'error');
    }
  };

  const handleEditar = (procedimento) => {
    setDadosFormulario({
      nome: procedimento.nome,
      descricao: procedimento.descricao,
      objetivo: procedimento.objetivo,
      video: procedimento.video,
    });
    setIdEditando(procedimento.id);
    setEditando(true);
    setMostrarModal(true);
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
          await axios.delete(`http://127.0.0.1:8000/api/v1/procedimentos/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          buscarProcedimentos();
          Swal.fire('Excluído!', 'O procedimento foi excluído com sucesso.', 'success');
        } catch (erro) {
          console.error('Erro ao excluir procedimento:', erro);
          Swal.fire('Erro!', 'Ocorreu um erro ao excluir o procedimento.', 'error');
        }
      }
    });
  };

  const procedimentosFiltrados = procedimentos.filter(procedimento =>
    procedimento.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const totalPaginas = Math.ceil(procedimentosFiltrados.length / itensPorPagina);
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const paginatedData = procedimentosFiltrados.slice(inicio, inicio + itensPorPagina);

  return (
    <div className="min-h-screen flex flex-col items-center p-10 bg-gray-100">
      {mostrarModal && (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setMostrarModal(false)}
        >
          <div
            className="bg-white p-6 rounded shadow-lg w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6">{editando ? 'Editar Procedimento' : 'Cadastrar Procedimento'}</h2>
            <form onSubmit={handleCadastroProcedimento}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={dadosFormulario.nome}
                  onChange={(e) => setDadosFormulario({ ...dadosFormulario, nome: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Objetivo</label>
                <input
                  type="text"
                  name="objetivo"
                  value={dadosFormulario.objetivo}
                  onChange={(e) => setDadosFormulario({ ...dadosFormulario, objetivo: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Descrição</label>
                <textarea
                  name="descricao"
                  value={dadosFormulario.descricao}
                  onChange={(e) => setDadosFormulario({ ...dadosFormulario, descricao: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Link do Vídeo (opcional)</label>
                <input
                  type="url"
                  name="video"
                  value={dadosFormulario.video}
                  onChange={(e) => setDadosFormulario({ ...dadosFormulario, video: e.target.value })}
                  placeholder="Cole o link do vídeo aqui"
                  className="shadow appearance-none border rounded w-full py-2 px-3"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setMostrarModal(false)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Cancelar
                </button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  {editando ? 'Salvar Alterações' : 'Cadastrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl  shadow-lg rounded-lg">
        <div className="p-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Buscar procedimento"
            className="border border-gray-300 rounded-lg px-4 py-2 w-1/2"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button
            onClick={() => setMostrarModal(true)}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <FaPlus className="mr-2" /> Cadastrar Procedimento
          </button>
        </div>

        <div className="mb-8">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nome</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Descrição</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Objetivo</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Opções</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((procedimento) => (
                  <tr key={procedimento.id} className="border-t hover:bg-gray-200">
                    <td className="px-4 py-2 text-sm text-gray-600">{procedimento.nome}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{procedimento.descricao}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{procedimento.objetivo}</td>
                    <td className="px-4 py-2 text-center flex justify-center items-center space-x-4">
                      <button onClick={() => handleEditar(procedimento)} className="text-blue-500 hover:text-blue-700">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleExcluir(procedimento.id)} className="text-red-500 hover:text-red-700">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-2 text-center text-gray-600">Nenhum procedimento encontrado</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-4 p-4">
          <button
            disabled={paginaAtual === 1}
            onClick={() => setPaginaAtual(paginaAtual - 1)}
            className="p-2 border rounded mr-2 disabled:opacity-50"
          >
            <FaChevronLeft />
          </button>
          <span className="p-2">{paginaAtual} de {totalPaginas}</span>
          <button
            disabled={paginaAtual === totalPaginas}
            onClick={() => setPaginaAtual(paginaAtual + 1)}
            className="p-2 border rounded ml-2 disabled:opacity-50"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Procedimentos;
