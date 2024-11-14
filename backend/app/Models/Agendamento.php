<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agendamento extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_paciente',
        'data_atendimento',
        'hora_atendimento',
        'historico',
        'status',
        'id_procedimento'
    ];

    public function paciente()
    {
        return $this->belongsTo(Paciente::class, 'id_paciente');
    }
    public function procedimento()
    {
        return $this->belongsTo(Procedimento::class, 'id_procedimento');
    }
}
