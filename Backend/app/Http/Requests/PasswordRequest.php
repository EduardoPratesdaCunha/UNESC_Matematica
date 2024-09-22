<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PasswordRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'cpf' => 'required|exists:users,cpf',
      'email' => 'required|exists:users,email',
    ];
  }

  public function messages()
  {
    return [
      'cpf.required' => 'Informe seu CPF',
      'cpf.exists' => 'CPF não cadastrado',
      'email.exists' => 'Informe seu Email',
      'email.required' => 'email não cadastrado',
    ];
  }
}