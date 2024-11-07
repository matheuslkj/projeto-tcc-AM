<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('pacientes', function (Blueprint $table) {
            $table->string('cidade')->after('bairro');
            $table->string('estado')->after('cidade');
            $table->dropColumn('cidade_estado');
        });
    }

    public function down()
    {
        Schema::table('pacientes', function (Blueprint $table) {
            $table->dropColumn(['cidade', 'estado']);
            $table->string('cidade_estado')->after('bairro');
        });
    }
};
