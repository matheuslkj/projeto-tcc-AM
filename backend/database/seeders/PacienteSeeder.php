<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Paciente;

class PacienteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Paciente::create([
            'nome' => 'Carlos',
            'sobrenome' => 'Silva',
            'nascimento' => '1985-05-15',
            'cpf' => '12345678901',
            'email' => 'carlos.silva@example.com',
            'profissao' => 'Engenheiro',
            'sintomas' => 'Dor nas costas',
            'genero' => 'Masculino',
            'telefone' => '11987654321',
            'cep' => '01010100',
            'logradouro' => 'Rua A',
            'numero' => '123',
            'bairro' => 'Centro',
            'cidade' => 'São Paulo',
            'estado' => 'SP',
            'complemento' => '',
        ]);

        Paciente::create([
            'nome' => 'Ana',
            'sobrenome' => 'Souza',
            'nascimento' => '1990-08-20',
            'cpf' => '98765432100',
            'email' => 'ana.souza@example.com',
            'profissao' => 'Advogada',
            'sintomas' => 'Enxaqueca frequente',
            'genero' => 'Feminino',
            'telefone' => '11912345678',
            'cep' => '02020200',
            'logradouro' => 'Avenida B',
            'numero' => '456',
            'bairro' => 'Jardins',
            'cidade' => 'Rio de Janeiro',
            'estado' => 'Rio de Janeiro',
            'complemento' => 'Apto 12',
        ]);

        // Adicione mais pacientes, se necessário
    }
}
