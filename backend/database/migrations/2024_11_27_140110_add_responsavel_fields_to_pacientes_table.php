<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('pacientes', function (Blueprint $table) {
            $table->string('nome_responsavel')->nullable();
            $table->string('sobrenome_responsavel')->nullable();
            $table->string('cpf_responsavel', 11)->nullable();
        });
    }

    public function down()
    {
        Schema::table('pacientes', function (Blueprint $table) {
            $table->dropColumn(['nome_responsavel', 'sobrenome_responsavel', 'cpf_responsavel']);
        });
    }

};
