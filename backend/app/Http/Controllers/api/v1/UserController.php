<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller; // Importando a classe Controller correta
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UserController extends Controller
{
    // Método para login
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

    // Método para logout
    public function logout(Request $request)
    {
     
      try {
            // Invalida o token de autenticação do usuário
            $request->user()->currentAccessToken()->delete();

            return response()->json(['message' => 'Logout realizado com sucesso']);
        } catch (\Exception $e) {
            // Captura qualquer erro que possa ocorrer
            return response()->json(['error' => 'Erro ao tentar deslogar'], 500);
        }
    
    }

    // Método para retornar o perfil do usuário
    public function profile()
    {
        return response()->json(Auth::user());
        
    }

    // Método para atualizar o perfil do usuário
    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'sometimes|string|min:8|confirmed',
        ]);

        if ($request->filled('password')) {
            $user->password = bcrypt($request->password);
        }

        $user->update($request->except('cpf'));

        return response()->json(['message' => 'Perfil atualizado com sucesso']);
    }
}