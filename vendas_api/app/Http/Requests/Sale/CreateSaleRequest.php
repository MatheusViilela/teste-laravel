<?php

namespace App\Http\Requests\Sale;

use App\Exceptions\ApiException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class CreateSaleRequest extends FormRequest
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
            'client_id' => [
                'required',
                'integer',
                'exists:clients,id'
            ],
            'product_id' => [
                'required',
                'integer',
                'exists:products,id'
            ],
            'discount' => [
                'numeric',
                'nullable',
            ],
            'total' => [
                'required',
                'numeric',
            ],
            'sale_date' => [
                'required',
                'date',
            ],
            'payment_form' => [
                'required',
                'string',
            ],
            'number_of_installments' => [
                'integer',
            ],
            'installment_value' => [
                'numeric',
            ],
            'observation' => [],
            //
        ];
    }
    public function failedValidation(Validator $validator): void
    {
        throw new ApiException($validator->errors()->first());
    }
}
