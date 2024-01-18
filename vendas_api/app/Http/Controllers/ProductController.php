<?php

namespace App\Http\Controllers;

use App\Builder\ReturnApi;
use App\Http\Requests\Product\CreateProductRequest;
use App\Http\Requests\Product\DeleteProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function create(CreateProductRequest $request)
    {
        return ReturnApi::Success("Produto criado com sucesso", Product::create($request->validated()), 201);
    }
    public function list()
    {
        return ReturnApi::Success("Produtos listados com sucesso", Product::all());
    }
    public function delete(DeleteProductRequest $request)
    {
        return ReturnApi::Success("Produto deletado com sucesso", Product::find($request->validated()['id'])->delete());
    }
    public function update(UpdateProductRequest $request)
    {
        return ReturnApi::Success("Produto atualizado com sucesso", Product::find($request->validated()['id'])->update($request->validated()));
    }
    public function listById(Request $request)
    {
        return ReturnApi::Success("Produto listado com sucesso", Product::find($request->id));
    }
}
