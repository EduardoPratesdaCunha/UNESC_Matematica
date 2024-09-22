<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenInvalidException;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Symfony\Component\HttpFoundation\Response;

class AuthTokenProtected
{
  /**
    * Handle an incoming request.
    *
    * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
  */
  public function handle(Request $request, Closure $next): Response
  {
    try {
      JWTAuth::parseToken()->authenticate();
    } catch (\Exception $e) {
      if ($e instanceof TokenInvalidException) {
        return response()->json(['status' => 'Token Inválido'], 401);
      } else if ($e instanceof TokenExpiredException) {
        return response()->json(['status' => 'Token Expirado'], 401);
      } else {
        return response()->json(['status' => 'Token Não Encontrado'], 401);
      }
    }

    $request = $next($request);

    return $request;
  }
}
