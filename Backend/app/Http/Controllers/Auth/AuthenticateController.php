<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Mail\PasswordResetMail;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthenticateController extends Controller
{
  public function login (LoginRequest $request)
  {
    try {
      $data = $request->validated();

      if (!$token = auth('api')->attempt(['cpf' => $data['cpf'], 'password' => $data['password']])) {
        return response()->json([], 401);
      };

      /** @var User $user */
      $user = Auth::user();

      return $this->respondWithToken($token, $user);

    } catch (\Exception $e) {
      Log::error($e->getMessage(), [$e]);
      return response()->json(['error' => 'Login Invalido'], 422);
    }
  }
  public function me()
  {
    return response()->json(auth('api')->user());
  }

  public function logout()
  {
    auth('api')->logout();

    return response()->json(['message' => 'Successfully logged out']);
  }

  public function refresh()
  {
    return $this->respondWithToken(JWTAuth::refresh(), Auth::user());
  }

  protected function respondWithToken($token, $user)
  {
    return response()->json([
      'access_token' => $token,
      'token_type' => 'bearer',
      'expires_in' => null,
      'user' => $user,
    ]);
  }

  public function register (RegisterRequest $request)
  {
    try {
      $data = $request->validated();

      User::create($data);

      return response()->json([], 200);

    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['error' => 'Confira todos os campos'], 422);
    }
  }
}
