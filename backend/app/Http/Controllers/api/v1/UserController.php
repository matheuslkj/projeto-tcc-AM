<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller; // Importando a classe Controller correta
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'cpf' => 'required|string',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($request->only('cpf', 'password'))) {
            return response()->json(['message' => 'Credenciais inválidas'], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('token-name')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 200);
    }

    public function logout(Request $request)
    {
     
      try {
            $request->user()->currentAccessToken()->delete();

            return response()->json(['message' => 'Logout realizado com sucesso']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao tentar deslogar'], 500);
        }
    
    }

    public function profile()
    {
        return response()->json(Auth::user());
        
    }

    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'specialty' => 'nullable|string|max:255',
            'about' => 'nullable|string',
        ]);

        $user->name = $request->input('name', $user->name);
        $user->specialty = $request->input('specialty', $user->specialty);
        $user->about = $request->input('about', $user->about);

        $user->save();

        return response()->json([
            'message' => 'Perfil atualizado com sucesso',
            'user' => $user,
        ]);
    }
}