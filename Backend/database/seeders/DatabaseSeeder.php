<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
  public function run(): void
  {
    User::factory()->create([
      'id' => Str::uuid(),
      'name' => 'admin',
      'email' => 'admin@email.com',
      'cpf' => '047.665.460-24',
      'password' => Hash::make('12341234'),
    ]);
  }
}
