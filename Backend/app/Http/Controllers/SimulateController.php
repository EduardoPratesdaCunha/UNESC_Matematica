<?php

namespace App\Http\Controllers;

use App\Http\Requests\SimulateRequest;
use App\Models\Simulate;
use App\Services\CalculateService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SimulateController extends Controller
{
  protected $calculateService;

  public function __construct(CalculateService $calculateService)
  {
    $this->calculateService = $calculateService;
  }

  public function index(Request $request)
  {
    try {
      $query = Simulate::where('user_id', Auth::id())
        ->when(isset($request->name), function($query) use ($request) {
          $query->where('name', 'LIKE', "%$request->name%");
        })
        ->when(isset($request->created_at), function($query) use ($request) {
          $query->whereDate('created_at', $request->created_at);
        })
        ->get();

        $initialValue = valueFormat($query->sum('initial_value'));
        $valuePerMonth = valueFormat($query->sum('value_per_month'));
        $result = valueFormat($query->sum('result'));

        $simulates = $query->map(function ($item) {
          return [
            'id' => $item->id,
            'name' => $item->name,
            'initial_value' => valueFormat($item->initial_value),
            'value_per_month' => valueFormat($item->value_per_month),
            'rate' => rateFormat($item->rate),
            'months' => $item->months / 12,
            'result' => valueFormat($item->result),
            'created_at' => $item->created_at->format('d/m/Y'),
          ];
        })->toArray();


      return response()->json([
        'simulates' => $simulates,
        'initialValue' => $initialValue,
        'valuePerMonth' => $valuePerMonth,
        'result' => $result,
      ], 200);

    } catch (\Exception $e) {
      Log::error($e->getMessage(), [$e]);
      return response()->json(['error' => 'Ocorreu um erro ao processar a simulação'], 402);
    }
  }

  public function edit($id)
  {
    try {
      $simulate = Simulate::find($id);

      if (empty($simulate)) {
        return response()->json(['error' => 'Não foi possivel encontrar esse item'], 402);
      }

      return response()->json(['simulate' => $simulate], 200);

    } catch (\Exception $e) {
      Log::error($e->getMessage(), [$e]);
      return response()->json(['error' => 'Não foi possivel encontrar esse item'], 402);

    }
  }

  public function store(SimulateRequest $request)
  {
    try {
      DB::beginTransaction();
      $data = $request->validated();

      if (!Auth::check()) {
        return response()->json(['error' => 'Usuario não autorizado'], 401);
      }

      $this->calculateService->calculateAndSave($data);

      DB::commit();

      return response()->json(['success' => 'Salvo com Sucesso!'], 200);

    } catch (Exception $e) {
      DB::rollBack();
      Log::error(['request' => $request->all(), 'error' => $e]);
      return response()->json(['error' => 'Confira todos os campos!'], 402);
    }
  }

  public function update($id, SimulateRequest $request)
  {
    try {
      DB::beginTransaction();
      $simulate = Simulate::find($id);

      if (!isset($simulate)) {
        return response()->json(['error' => 'Não foi possivel encontrar esse item'], 402);
      }

      $data = $request->validated();

      $this->calculateService->calculateAndSave($data, $simulate->id);

      DB::commit();
      return response()->json(['success' => 'Salvo com Sucesso!'], 200);

    } catch (\Exception $e) {
      DB::rollBack();
      Log::error($e->getMessage(), [$e]);
      return response()->json(['error' => 'Confira todos os campos!'], 402);
    }
  }

  public function destroy($id)
  {
    try {
      DB::beginTransaction();
      $simulate = Simulate::find($id);

      if (!isset($simulate)) {
        return response()->json(['error' => 'Não foi possivel encontrar esse item!'], 402);
      }

      $simulate->delete();
      DB::commit();

      return response()->json(['success' => 'Salvo com Sucesso!'], 200);

    } catch (\Exception $e) {
      Db::rollBack();
      Log::error($e->getMessage(), $e);
      return response()->json(['error' => 'Não foi possivel encontrar esse item!'], 402);
    }
  }
}
