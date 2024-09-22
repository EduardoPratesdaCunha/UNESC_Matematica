<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'cpf' => 'required|exists:users,cpf',
      'password' => 'required',
    ];
  }

  public function messages()
  {
    return [
      'cpf.required' => 'Credencias invalido',
      'cpf.exists' => 'Credencias invalido',
      'password.required' => 'Credencias invalido',
    ];
  }
}
