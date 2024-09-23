<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paciente extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'sobrenome',
        'nascimento',
        'cpf',
        'email',
        'profissao',
        'sintomas',
        'genero',
        'telefone',
        'cep',
        'logradouro',
        'numero',
        'bairro',
        'cidade_estado',
        'complemento',
    ];
}
