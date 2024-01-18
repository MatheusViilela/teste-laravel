<?php

namespace App\Http\Controllers;

use App\Builder\ReturnApi;
use App\Http\Requests\Client\CreateClientRequest;
use App\Http\Requests\Client\DeleteClientRequest;
use App\Http\Requests\Client\UpdateClientRequest;
use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function create(CreateClientRequest $request)
    {
        return ReturnApi::Success("Cliente criado com sucesso", Client::create($request->validated()), 201);
    }

    public function update(UpdateClientRequest $request)
    {
        return ReturnApi::Success("Cliente atualizado com sucesso", Client::find($request->validated()['id'])->update($request->validated()));
    }
    public function delete(DeleteClientRequest $request)
    {
        return ReturnApi::Success("Cliente deletado com sucesso", Client::find($request->validated()['id'])->delete());
    }

    public function list()
    {
        return response()->json(['error' => false, 'message' => 'Clientes listados com sucesso', 'data' => Client::all()], 200, [], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    }
}
