<?php

namespace App\Http\Controllers;

use App\Builder\ReturnApi;
use App\Http\Requests\Product\CreateProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function create(CreateProductRequest $request)
    {
        return ReturnApi::Success("Produto criado com sucesso", Product::create($request->validated()), 201);
    }
}
