<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PasswordResetRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'password' => 'required|confirmed',
      'email' => 'required|exists:users,email',
    ];
  }

  public function messages()
  {
    return [
      'password.required' => 'Preencha todos os campos.',
      'password.confirmed' => 'Senhas diferentes',
      'email.required' => 'Preencha todos os campos.',
      'email.exists' => 'Email não registrado',
    ];
  }
}