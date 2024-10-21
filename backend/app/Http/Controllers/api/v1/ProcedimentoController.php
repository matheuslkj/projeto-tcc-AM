<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Procedimento;
use Illuminate\Http\Request;

class ProcedimentoController extends Controller
{
    public function index()
    {
        return Procedimento::all();
    }

    public function store(Request $request)
    {
        // Validação
        $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'required|string',
            'objetivo' => 'required|string|max:255',
            'video' => 'nullable|file|mimes:mp4,avi,mkv|max:20480' // 20MB
        ]);

        // Upload do vídeo (se existir)
        $videoPath = null;
        if ($request->hasFile('video')) {
            $videoPath = $request->file('video')->store('videos', 'public');
        }

        // Cria o procedimento
        $procedimento = Procedimento::create([
            'nome' => $request->nome,
            'descricao' => $request->descricao,
            'objetivo' => $request->objetivo,
            'video' => $videoPath ? 'storage/' . $videoPath : null // Armazenar o caminho completo

        ]);

        return response()->json(['message' => 'Procedimento cadastrado com sucesso', 'procedimento' => $procedimento], 201);
    }

    public function show($id)
    {
        return Procedimento::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $procedimento = Procedimento::findOrFail($id);

        $procedimento->update($request->all());

        return response()->json(['message' => 'Procedimento atualizado com sucesso']);
    }

    public function destroy($id)
    {
        $procedimento = Procedimento::findOrFail($id);
        $procedimento->delete();

        return response()->json(['message' => 'Procedimento excluído com sucesso']);
    }
}
