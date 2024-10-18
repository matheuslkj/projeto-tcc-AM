<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Chama o seeder dos pacientes
       
        $this->call([
            UserSeeder::class,
            ProcedimentoSeeder::class,
        ]);
        
    }
}
