<?php

namespace App\Http\Controllers;

use App\Builder\ReturnApi;
use App\Http\Requests\Sale\CreateSaleRequest;
use App\Http\Requests\Sale\DeleteSaleRequest;
use App\Http\Requests\Sale\UpdateSaleRequest;
use App\Models\Sale;
use Illuminate\Http\Request;

class SaleController extends Controller
{

    public function create(CreateSaleRequest $request)
    {
        return ReturnApi::Success("Venda criada com sucesso", Sale::create($request->validated()), 201);
    }
    public function list()
    {
        return ReturnApi::Success("Vendas listadas com sucesso", Sale::all());
    }
    public function delete(DeleteSaleRequest $request)
    {
        return ReturnApi::Success("Venda deletada com sucesso", Sale::find($request->validated()['id'])->delete());
    }
    public function update(UpdateSaleRequest $request)
    {
        return ReturnApi::Success("Venda atualizada com sucesso", Sale::find($request->validated()['id'])->update($request->validated()));
    }
}
