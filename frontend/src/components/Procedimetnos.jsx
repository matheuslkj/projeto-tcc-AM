import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  useEffect(() => {
    buscarProcedimentos();
  }, []);

  const buscarProcedimentos = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
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
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (editando) {
        await axios.put(`http://127.0.0.1:8000/api/v1/procedimentos/${idEditando}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEditando(false);
        setIdEditando(null);
      } else {
        await axios.post('http://127.0.0.1:8000/api/v1/procedimentos', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setDadosFormulario({ nome: '', descricao: '', objetivo: '', video: '' });
      buscarProcedimentos();
      setMostrarModal(false);
    } catch (erro) {
      console.error('Erro ao cadastrar procedimento:', erro);
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
    if (window.confirm('Tem certeza que deseja excluir este procedimento?')) {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        await axios.delete(`http://127.0.0.1:8000/api/v1/procedimentos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        buscarProcedimentos();
      } catch (erro) {
        console.error('Erro ao excluir procedimento:', erro);
      }
    }
  };

  const procedimentosFiltrados = procedimentos.filter(procedimento =>
    procedimento.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const handleClickProcedimento = (id) => {
    navigate(`/procedimentos/${id}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDadosFormulario({
      ...dadosFormulario,
      [name]: value,
    });
  };

  const handleClickOutsideModal = (e) => {
    if (e.target.id === 'modal-overlay') {
      setMostrarModal(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-10 bg-gray-100">
      {mostrarModal && (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleClickOutsideModal}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Descrição</label>
                <textarea
                  name="descricao"
                  value={dadosFormulario.descricao}
                  onChange={handleChange}
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
                  onChange={handleChange}
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
          <button
            onClick={() => setMostrarModal(true)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <FaPlus className="mr-2" /> Cadastrar Procedimento
          </button>
        </div>

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
                  <tr key={procedimento.id} className="border-t cursor-pointer hover:bg-gray-200">
                    <td className="border px-4 py-2" onClick={() => handleClickProcedimento(procedimento.id)}>
                      {procedimento.nome}
                    </td>
                    <td className="border px-4 py-2" onClick={() => handleClickProcedimento(procedimento.id)}>
                      {procedimento.descricao}
                    </td>
                    <td className="border px-4 py-2" onClick={() => handleClickProcedimento(procedimento.id)}>
                      {procedimento.objetivo}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => handleEditar(procedimento)}
                        className="text-yellow-500 hover:text-yellow-700 mr-4"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleExcluir(procedimento.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="border px-4 py-2 text-center">
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

export default Procedimentos;
