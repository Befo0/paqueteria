<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePaqueteRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nombrePaquete' => 'required|min:3|max:100',
            'descripcionPaquete' => 'required|min:10|max:255',
            'remitente' => 'required|min:3|max:50',
            'usuarioDestinatario' => 'required|integer|min:1',
            'horaLlegadaPaquete' => [
                'required',
                'date',
                Rule::date()->betweenOrEqual(today()->subDay(), now()->toDateTimeString()),
            ]
        ];
    }

    public function messages(): array
    {
        return [
            'horaLlegadaPaquete.after_or_equal' => 'La fecha no debe de pasarse de un día',
            'horaLlegadaPaquete.before_or_equal' => 'La fecha debe ser ayer u hoy',
            'nombrePaquete.required' => 'El titulo del paquete debe ser requerido',
            'nombrePaquete.min' => 'El titulo del paquete debe ser de al menos :min caracteres',
            'nombrePaquete.max' => 'El titulo del paquete debe ser de maximo :max caracteres',
            'descripcionPaquete.required' => 'La descripción del paquete debe ser requerido',
            'descripcionPaquete.min' => 'La descripción del paquete debe ser de al menos :min caracteres',
            'descripcionPaquete.max' => 'La descripción del paquete debe ser de maximo :max caracteres',
            'usuarioDestinatario.min' => 'Necesitas elegir un nombre',
            'horaLlegadaPaquete.required' => 'La hora de llegada del paquete debe ser requerida',
            'horaLlegadaPaquete.date' => 'La hora de llegada debe ser una fecha valida'
        ];
    }
}
