<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  public function up(): void
  {
    Schema::create('simulates', function (Blueprint $table) {
      $table->uuid('id')->primary();
      $table->foreignUuid('user_id')->references('id')->on('users')->nullable()->constrained()->onDelete('cascade');

      $table->string('name')->nullable();
      $table->float('initial_value');
      $table->float('value_per_month')->nullable();
      $table->float('rate');
      $table->integer('months');
      $table->float('result');

      $table->rememberToken();
      $table->timestamps();
      $table->softDeletes();
    });
  }

  public function down(): void
  {
    Schema::dropIfExists('simulates');
  }
};
