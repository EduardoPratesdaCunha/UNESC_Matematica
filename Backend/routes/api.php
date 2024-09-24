<?php

use App\Http\Controllers\Auth\AuthenticateController;
use App\Http\Controllers\SimulateController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthenticateController::class, 'login'])->name('login');
Route::post('/register', [AuthenticateController::class, 'register'])->name('register');

Route::middleware(['AuthTokenProtected'])->group(function () {
  return response()->json(['message' => 'Pong!']);
});

Route::middleware(['apiJwt'])->group(function() {
  Route::post("/logout", [AuthenticateController::class, "logout"])->name("logout");

  Route::get('/ping', function () {
    return response()->json(['message' => 'Pong!']);
  });

  Route::prefix("/simulate")->group(function () {
    Route::get("/index", [SimulateController::class, 'index'])->name("simulate.index");
    Route::get("/edit/{id}", [SimulateController::class, 'edit'])->name("simulate.edit");
    Route::put("/update/{id}", [SimulateController::class, 'update'])->name("simulate.update");
    Route::delete("/destroy/{id}", [SimulateController::class, 'destroy'])->name("simulate.destroy");
    Route::post("/store", [SimulateController::class, 'store'])->name("simulate.store");
  });
});
