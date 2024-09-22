<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Mail\PasswordResetMail;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthenticateController extends Controller
{
  public function login (LoginRequest $request)
  {
    $data = $request->validated();

    if (!$token = auth('api')->attempt(['cpf' => $data['cpf'], 'password' => $data['password']])) {
      return response()->json([], 401);
    };

    if (auth('api')->user()->status === 0) {
      return response()->json([], 401);
    };

    /** @var User $user */
    $user = Auth::user();

    $user_data = [
      'id' => $user->id,
      'name' => $user->name,
      'cpf' => $user->cpf,
    ];

    return $this->respondWithToken($token, $user_data);
  }
  /**
   * Get the token array structure.
   *
   * @param  string $token
   *
   * @return \Illuminate\Http\JsonResponse
   */
  protected function respondWithToken($token, $user)
  {
    return response()->json([
      'token' => $token,
      'token_type' => 'bearer',
      'user' => $user,
      'expires_in' => null
    ], 200);
  }

  public function register (RegisterRequest $request) {
    try {
      $data = $request->validated();

      User::create($data);

      return response()->json([], 200);

    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['error' => 'Confira todos os campos'], 422);
    }


  }

  public function logout()
  {
    logoutToken();

    return response()->json([], 200);
  }
}
