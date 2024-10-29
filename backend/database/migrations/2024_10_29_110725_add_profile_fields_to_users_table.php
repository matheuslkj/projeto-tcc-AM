<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddProfileFieldsToUsersTable extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('specialty')->nullable();  // Campo para especialidade
            $table->text('about')->nullable();         // Campo para "sobre"
            $table->string('profile_pic')->nullable(); // Campo para o caminho da imagem de perfil
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('specialty');
            $table->dropColumn('about');
            $table->dropColumn('profile_pic');
        });
    }
}
