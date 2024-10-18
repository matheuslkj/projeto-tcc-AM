<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        User::create([
            'name' => 'Matheus Freitas',
            'email' => 'matheus050319@gmail.com',
            'cpf' => '082.437.419-33',
            'password' => bcrypt('senha123'),
        ]);

        // Adicione mais usuários se necessário
    }
}
