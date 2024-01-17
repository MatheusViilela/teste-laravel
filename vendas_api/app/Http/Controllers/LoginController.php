<?php

namespace App\Http\Controllers;

use App\Builder\ReturnApi;
use App\Exceptions\ApiException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;

class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');
        if (!$token = auth('api')->attempt($credentials)) return ReturnApi::Error("Usuário ou senha incorretos", 401);
        return ReturnApi::Success("Usuário autenticado com sucesso", $token, 200);
    }
}
