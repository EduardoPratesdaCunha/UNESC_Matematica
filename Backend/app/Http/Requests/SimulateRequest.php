<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SimulateRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'initial_value' => 'required|numeric|min:1',
      'rate' => 'required|numeric|min:1',
      'value_per_month' => 'nullable|numeric',
      'months' => 'required|integer|min:1',
      'name' => 'string|nullable',
    ];
  }

  public function messages()
  {
    return [
      'initial_value.required' => 'O valor inicial é obrigatório.',
      'initial_value.numeric' => 'O valor inicial deve ser um número.',
      'initial_value.min' => 'O valor inicial deve ser maior ou igual a 1.',
      'value_per_month.numeric' => 'O valor adicional por mês deve ser um número.',
      'rate.required' => 'A taxa de juros anual é obrigatória.',
      'rate.numeric' => 'A taxa de juros anual deve ser um número.',
      'months.required' => 'O número de períodos é obrigatório.',
      'months.integer' => 'O número de períodos deve ser um número inteiro.',
      'months.min' => 'O número de períodos deve ser maior ou igual a 1.',
    ];
  }
}
