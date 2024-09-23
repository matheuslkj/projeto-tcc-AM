import React from 'react';
import PatientForm from '../components/PacienteForm';

const RegistrarPaciente = () => {
  const handleFormSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/pacientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      const result = await response.json();
      console.log('Paciente cadastrado:', result);
    } catch (error) {
      console.error('Erro ao cadastrar paciente:', error.message);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <PatientForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default RegistrarPaciente;
