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
            'name' => 'João Silva',
            'email' => 'allansousa@gmail.com',
            'cpf' => '123.456.789-03',
            'password' => bcrypt('senhaSegura123@'),
            'specialty' => 'Fisioterapeuta',
            'about' => 'Profissional com experiência em reabilitação física.',
        ]);

        
    }
}
