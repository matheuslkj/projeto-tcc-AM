import React, { useState } from 'react';

const FormularioProcedimento = ({ onSubmit }) => {
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: '',
    descricao: '',
    objetivo: '',
    video: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDadosFormulario({
      ...dadosFormulario,
      [name]: value,
    });
  };

  const handleVideoChange = (e) => {
    setDadosFormulario({
      ...dadosFormulario,
      video: e.target.files[0], // Captura o vídeo selecionado
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nome', dadosFormulario.nome);
    formData.append('descricao', dadosFormulario.descricao);
    formData.append('objetivo', dadosFormulario.objetivo);
    if (dadosFormulario.video) {
      formData.append('video', dadosFormulario.video);
    }

    onSubmit(formData); // Enviar como FormData
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-6">Cadastro de Procedimento</h2>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Nome</label>
        <input type="text" name="nome" value={dadosFormulario.nome} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3" required />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Objetivo</label>
        <input type="text" name="objetivo" value={dadosFormulario.objetivo} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3" required />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Descrição</label>
        <textarea name="descricao" value={dadosFormulario.descricao} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3" required />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Vídeo Demonstrativo (opcional)</label>
        <input type="file" name="video" accept="video/*" onChange={handleVideoChange} className="shadow appearance-none border rounded w-full py-2 px-3" />
      </div>

      <div className="flex justify-end">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Cadastrar
        </button>
      </div>
    </form>
  );
};

export default FormularioProcedimento;
