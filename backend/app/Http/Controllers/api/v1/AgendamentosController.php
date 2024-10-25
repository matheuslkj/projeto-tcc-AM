<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Agendamento;
use Illuminate\Http\Request;

class AgendamentosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $agendamentos = Agendamento::with('Paciente')->get();

        return response()->json($agendamentos);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'id_paciente' => 'required',
            'data_atendimento' => 'required|date',
            'hora_atendimento' => 'required',
            'historico' => 'nullable|string',
            'status' => 'required'
        ]);

        $agendamento = Agendamento::create([
            'id_paciente' => $request->id_paciente,
            'data_atendimento' => $request->data_atendimento,
            'hora_atendimento' => $request->hora_atendimento,
            'historico' => $request->historico,
            'status' => $request->status,
        ]);

        return response()->json($agendamento, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $agendamento = Agendamento::find($id);

        if (!$agendamento) {
            return response()->json(['message' => 'Agendamento não encontrado'], 404);
        }

        return response()->json($agendamento, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $agendamento = Agendamento::find($id);

        if (!$agendamento) {
            return response()->json(['message' => 'Agendamento não encontrado'], 404);
        }

        $validated = $request->validate([
            'id_paciente' => 'required',
            'data_atendimento' => 'required|date',
            'hora_atendimento' => 'required|time',
            'historico' => 'nullable|string',
            'status' => 'required'
        ]);

        $agendamento->update($validated);

        return response()->json($agendamento, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $agendamento = Agendamento::find($id);

        if (!$agendamento) {
            return response()->json(['message' => 'Agendamento não encontrado'], 404);
        }

        $agendamento->delete();
        return response()->json(['message' => 'Agendamento excluído com sucesso'], 200);
    }
}
