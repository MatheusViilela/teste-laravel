<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;
    protected $fillable = [
        "client_id",
        "product_id",
        "quantity",
        "unit_price",
        "discount",
        "total",
        "sale_date",
        "payment_form",
        "number_installments",
        "installment_value",
        "observation",
    ];
    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id', 'id');
    }
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }
}
