<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'name' => 'required',
      'email' => 'required|email|unique:users,email',
      'cpf' => 'required|unique:users,cpf',
      'password' => 'required|confirmed',
    ];
  }

  public function messages()
  {
    return [
      'name.required' => 'Confira todos os campos',
      'email.required' => 'Confira todos os campos',
      'email.unique' => 'E-mail já esta em uso',
      'cpf.unique' => 'CPF já esta em uso',
      'cpf.required' => 'Confira todos os campos',
      'password.required' => 'Confira todos os campos',
      'password.confirmed' => 'Senhas diferentes',
    ];
  }
}