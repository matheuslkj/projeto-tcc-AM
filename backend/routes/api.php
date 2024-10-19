<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\v1\PacienteController;
use App\Http\Controllers\api\v1\ProcedimentoController;
use App\Http\Controllers\api\v1\UserController;
use App\Http\Controllers\Auth\ForgotPasswordController; // Importa o controlador

Route::group(['prefix' => 'v1'], function(){

    // Rotas públicas (login)
    Route::post('/login', [UserController::class, 'login'])->name('login');

    // Rotas protegidas com Sanctum
    Route::apiResource('pacientes', PacienteController::class);
    Route::apiResource('procedimentos', ProcedimentoController::class);

    // Rotas de perfil de usuário
    Route::get('/user/profile', [UserController::class, 'profile']);
    Route::put('/user/profile', [UserController::class, 'updateProfile']);
    
    // Logout
    Route::post('/logout', [UserController::class, 'logout']);

    // Rotas de recuperação de senha
    Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLink'])->name('password.email')->middleware('throttle:20,1');
    Route::post('/reset-password', [ForgotPasswordController::class, 'reset'])->name('password.update');

    Route::get('/password/reset', function () {
        return response()->json(['message' => 'Password reset link sent to your email.']);
    })->name('password.reset');
    
});
