<?php

namespace App\Models;

use App\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Simulate extends Model
{
  use HasFactory, UsesUuid;

  public $fillable = [
    'id',
    'user_id',
    'name',
    'initial_value',
    'value_per_month',
    'rate',
    'months',
    'result',
    'final_value',
    'created_at',
    'updated_at',
  ];

  protected $guarded = ['id'];

  protected $keyType = "string";

  public $incrementing = false;

  public function user(): HasOne
  {
    return $this->hasOne(User::class);
  }
}
