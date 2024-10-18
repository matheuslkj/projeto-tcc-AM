<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Procedimento;

class ProcedimentoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Procedimento::create([
            'nome' => 'Fisioterapia Manual',
            'descricao' => 'Técnicas de fisioterapia manual para alívio de dor e recuperação.',
            'objetivo' => 'Melhorar a mobilidade e reduzir a dor.',
        ]);

        Procedimento::create([
            'nome' => 'Acupuntura',
            'descricao' => 'Tratamento com agulhas para alívio de dores e estresse.',
            'objetivo' => 'Equilibrar a energia do corpo.',
        ]);

        Procedimento::create([
            'nome' => 'Exercícios de Reabilitação',
            'descricao' => 'Programas de exercícios personalizados para recuperação.',
            'objetivo' => 'Reforçar músculos e melhorar a funcionalidade.',
        ]);

        // Adicione mais procedimentos se necessário
    }
}
