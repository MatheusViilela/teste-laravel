<?php

namespace App\Http\Requests\Auth;

use App\Exceptions\ApiException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => [
                'string',
                'email',
                'required',
                'exists:users,email'
            ],
            'password' => [
                'string',
                'required',
            ],
        ];
    }

 

 

    public function failedValidation(Validator $validator): void
    {
        throw new ApiException($validator->errors()->first());
    }
}