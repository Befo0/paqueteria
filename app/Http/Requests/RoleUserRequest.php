<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RoleUserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'idRol' => 'required|min:1'
        ];
    }

    public function messages(): array
    {
        return [
            'idRol.min' => 'Debes de elegir un rol'
        ];
    }
}
