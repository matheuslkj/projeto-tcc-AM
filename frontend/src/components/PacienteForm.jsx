import React, { useState } from 'react';

const FormularioPaciente = ({ onSubmit }) => {
  const [dadosFormulario, setDadosFormulario] = useState({
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
    complemento: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cpf") {
      if (value.length <= 14) {
        setDadosFormulario({
          ...dadosFormulario,
          [name]: formatarCPF(value),
        });
      }
    } else if (name === "telefone") {
      if (value.length <= 15) {
        setDadosFormulario({
          ...dadosFormulario,
          [name]: formatarTelefone(value),
        });
      }
    } else {
      setDadosFormulario({
        ...dadosFormulario,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Remover a formatação do CPF e telefone antes de enviar
    const dadosParaEnviar = {
      ...dadosFormulario,
      cpf: dadosFormulario.cpf.replace(/\D/g, ''), // Remove formatação do CPF
      telefone: dadosFormulario.telefone.replace(/\D/g, ''), // Remove formatação do telefone
    };

    onSubmit(dadosParaEnviar);
  };

  const formatarCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, "");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return cpf;
  };

  const formatarTelefone = (telefone) => {
    telefone = telefone.replace(/\D/g, "");
    if (telefone.length <= 10) {
      telefone = telefone.replace(/(\d{2})(\d{4})(\d)/, "($1) $2-$3");
    } else {
      telefone = telefone.replace(/(\d{2})(\d{5})(\d)/, "($1) $2-$3");
    }
    return telefone;
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-6">Cadastro de Paciente</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(dadosFormulario).map(([key, value]) => (
          key !== "genero" && ( 
            <div key={key} className="form-group">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}
              </label>
              {key === "sintomas" ? (
                <textarea
                  name={key}
                  value={value}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              ) : (
                <input
                  type={key === "nascimento" ? "date" : key === "email" ? "email" : "text"}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  required
                  maxLength={key === "cpf" ? 14 : key === "telefone" ? 15 : undefined}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              )}
            </div>
          )
        ))}
        <div className="form-group">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genero">
            Gênero
          </label>
          <select
            name="genero"
            value={dadosFormulario.genero}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Selecione</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outros">Outros</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cadastrar
        </button>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormularioPaciente;
