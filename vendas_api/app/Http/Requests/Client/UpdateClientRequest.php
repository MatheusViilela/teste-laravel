<?php

namespace App\Http\Requests\Client;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use App\Exceptions\ApiException;

class UpdateClientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => [
                'required',
                'integer',
                'exists:clients,id'
            ],
            'name' => [
                'string',
            ],
            'email' => [
                'string',
            ],
            'cpf' => [
                'string',
            ],
            'birth_date' => [
                'date',
            ],
            'gender' => [
                'string',
            ],
            'phone' => [
                'string',
            ],
            'cep' => [
                'string',
            ],
            'address' => [
                'string',
            ],
            'number' => [
                'string',
            ],
            'address_complement' => [
                'string',
            ],
            'neighborhood' => [
                'string',
            ],
            'city' => [
                'string',
            ],
            //
        ];
    }
    public function failedValidation(Validator $validator): void
    {
        throw new ApiException($validator->errors()->first());
    }
}
