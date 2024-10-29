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
            'email' => 'alnprivado@gmail.com',
            'cpf' => '113.486.539-22',
            'password' => bcrypt('senha123'),
        ]);

        // Adicione mais usuários se necessário
    }
}
