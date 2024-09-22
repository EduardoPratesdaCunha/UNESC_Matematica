<?php

namespace App\Services;

use App\Models\Simulate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class CalculateService
{
  public function calculateAndSave($data, $id = null)
  {
    try {
      $initialValue = floatval($data['initial_value']);

      $rate = ($data['rate'] / 100) / 12;

      $months = intval($data['months']) * 12;

      $valuePerMonth = !empty($data['value_per_month']) ? floatval($data['value_per_month']) : 0;

      $result = $initialValue * pow(1 + $rate, $months);

      if ($valuePerMonth > 0) {
        $result2 = $valuePerMonth * (pow(1 + $rate, $months) - 1) / $rate;
        $result += $result2;
      }

      $resultFormatted = number_format($result, 2, ',', '.');

      if (Auth::check()) {

        if (isset($id)) {
          Simulate::find($id)
            ->update([
              'user_id' => Auth::id(),
              'initial_value' => $initialValue,
              'rate' => $data['rate'],
              'months' => $months,
              'value_per_month' => number_format($valuePerMonth, 2, '.', ''),
              'result' => number_format($result, 2, '.', ''),
              'name' => $data['name'] ?? null,
            ]);
        } else {
          $simulate = new Simulate();
          $simulate->user_id = Auth::id();
          $simulate->initial_value = $initialValue;
          $simulate->rate = $data['rate'];
          $simulate->months = $months;
          $simulate->value_per_month = number_format($valuePerMonth, 2, '.', '');
          $simulate->result = number_format($result, 2, '.', '');
          $simulate->name = $data['name'] ?? null;
          $simulate->save();
        };
      }

      return [
        'result' => $resultFormatted,
        'simulate' => $simulate ?? null,
      ];

    } catch (\Exception $e) {
      Log::error($e->getMessage(), ['request' => $data, 'error' => $e]);
      return back()->withErrors(['error' => 'Entra em contato com suporte']);
    }
  }
}