<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Agendamento;
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
            'cidade' => 'required|string',
            'estado' => 'required|string',
            'complemento' => 'nullable|string',
            'nome_responsavel' => 'nullable|required_if:nascimento,menor_de_idade|string|max:255',
            'sobrenome_responsavel' => 'nullable|required_if:nascimento,menor_de_idade|string|max:255',
            'cpf_responsavel' => 'nullable|required_if:nascimento,menor_de_idade|string|size:11',
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
            'cidade' => 'string',
            'estado' => 'string',
            'complemento' => 'nullable|string',
        ]);

        $paciente->update($validated);

        return response()->json($paciente, 200);
    }

    public function destroy($id)
    {
        try {
            // Verifique se o paciente existe
            $paciente = Paciente::findOrFail($id);

            // Verifique se o paciente tem agendamentos vinculados
            $agendamentos = Agendamento::where('id_paciente', $id)->exists();

            if ($agendamentos) {
                return response()->json([
                    'message' => 'Não é possível excluir um paciente com agendamentos vinculados.'
                ], 400);
            }

            // Se não houver agendamentos, exclua o paciente
            $paciente->delete();

            return response()->json([
                'message' => 'Paciente excluído com sucesso.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Ocorreu um erro ao tentar excluir o paciente.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }



    public function getAgendamentos($id)
    {
        // Busca o paciente pelo ID
        $paciente = Paciente::find($id);

        if (!$paciente) {
            return response()->json(['message' => 'Paciente não encontrado'], 404);
        }

        // Retorna os agendamentos do paciente
        $agendamentos = $paciente->agendamentos; // Certifique-se de que a relação 'agendamentos' existe no modelo Paciente
        return response()->json($agendamentos);
    }
}
