<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Paciente;
use Illuminate\Http\Request;

class PacienteController extends Controller
{
    public function index()
    {
        return response()->json(Paciente::all(), 200);
    }

    public function store(Request $request)
    {
        // Validação dos campos
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'sobrenome' => 'required|string|max:255',
            'nascimento' => 'required|date',
            'cpf' => 'required|string|size:11|unique:pacientes',
            'email' => 'required|email|unique:pacientes',
            'profissao' => 'required|string|max:255',
            'sintomas' => 'required|string',
            'genero' => 'required|string',
            'telefone' => 'required|string',
            'cep' => 'required|string',
            'logradouro' => 'required|string',
            'numero' => 'required|string',
            'bairro' => 'required|string',
            'cidade_estado' => 'required|string',
            'complemento' => 'nullable|string',
        ]);

        $validated['cpf'] = preg_replace('/\D/', '', $validated['cpf']);
        $validated['data_cadastro'] = now();

        $paciente = Paciente::create($validated);

        return response()->json($paciente, 201);
    }

    public function show($id)
    {
        $paciente = Paciente::with('agendamento')->find($id);

    if (!$paciente) {
        return response()->json(['message' => 'Paciente não encontrado'], 404);
    }

    return response()->json($paciente->toArray(), 200);
    }

    public function update(Request $request, $id)
    {
        $paciente = Paciente::find($id);
        if (!$paciente) {
            return response()->json(['message' => 'Paciente não encontrado'], 404);
        }

        $validated = $request->validate([
            'nome' => 'string|max:255',
            'sobrenome' => 'string|max:255',
            'nascimento' => 'date',
            'cpf' => 'string|size:11|unique:pacientes,cpf,' . $paciente->id,
            'email' => 'email|unique:pacientes,email,' . $paciente->id,
            'profissao' => 'string|max:255',
            'sintomas' => 'string',
            'genero' => 'string',
            'telefone' => 'string',
            'cep' => 'string',
            'logradouro' => 'string',
            'numero' => 'string',
            'bairro' => 'string',
            'cidade_estado' => 'string',
            'complemento' => 'nullable|string',
        ]);

        $paciente->update($validated);

        return response()->json($paciente, 200);
    }

    public function destroy($id)
    {
        $paciente = Paciente::find($id);
        if (!$paciente) {
            return response()->json(['message' => 'Paciente não encontrado'], 404);
        }

        $paciente->delete();
        return response()->json(['message' => 'Paciente excluído com sucesso'], 200);
    }
}
