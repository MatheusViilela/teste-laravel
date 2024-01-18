<?php

namespace App\Http\Requests\Client;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use App\Exceptions\ApiException;

class CreateClientRequest extends FormRequest
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
            'name' => [
                'string',
                'required',
            ],
            'email' => [
                'string',
                'required',
            ],
            'cpf' => [
                'string',
                'required',
            ],
            'birth_date' => [
                'date',
                'required',
            ],
            'gender' => [
                'string',
                'required',
            ],
            'phone' => [
                'string',
                'required',
            ],
            'cep' => [
                'string',
                'required',
            ],
            'address' => [
                'string',
                'required',
            ],
            'address_number' => [
                'string',
                'required',
            ],
            'address_complement' => [
                'string',
                'nullable',
            ],
            'neighborhood' => [
                'string',
                'required',
            ],
            'city' => [
                'string',
                'required',
            ],
            'state' => [
                'string',
                'required',
            ],

            //
        ];
    }
    public function failedValidation(Validator $validator): void
    {
        throw new ApiException($validator->errors()->first());
    }
}
