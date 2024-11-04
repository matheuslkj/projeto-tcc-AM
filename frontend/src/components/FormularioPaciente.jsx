// FormularioPaciente.jsx
import React, { useState } from 'react';

const FormularioPaciente = ({ onSubmit, formDataInicial = {}, onClose }) => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
       <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4"></h2>
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
                  <input name="cpf" value={formData.cpf} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" required />
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
                <div className="col-span-1">
                  <label className="block text-gray-700 font-medium mb-1">Gênero</label>
                  <select name="genero" value={formData.genero} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" required>
                    <option value="">Selecione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="block text-gray-700 font-medium mb-1">Sintomas</label>
                  <input type="text" name="sintomas" value={formData.sintomas} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" required />
                </div>
                <div className="col-span-1">
                  <label className="block text-gray-700 font-medium mb-1">Bairro</label>
                  <input type="text" name="bairro" value={formData.bairro} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" required />
                </div>
                <div className="col-span-1">
                  <label className="block text-gray-700 font-medium mb-1">Cidade e Estado</label>
                  <input type="text" name="cidade_estado" value={formData.cidade_estado} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" required />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700 font-medium mb-1">Complemento</label>
                  <input type="text" name="complemento" value={formData.complemento} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button type="button" onClick={onclose} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Cancelar</button>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Cadastrar</button>
              </div>
            </form>
          </div>
        </div>
  );
};

export default FormularioPaciente;
