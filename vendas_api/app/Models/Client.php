<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "email",
        "cpf",
        "birth_date",
        "gender",
        "phone",
        "cep",
        "address",
        "address_number",
        "address_complement",
        "neighborhood",
        "city",
        "state",
    ];

    public function sales()
    {
        return $this->hasMany(Sale::class, 'client_id', 'id');
    }
}
