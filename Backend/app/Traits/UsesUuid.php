<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

trait UsesUuid
{
  public static function bootUsesUuid()
  {
    static::creating(function (Model $model) {
      if (empty($model->id)) {
        $model->id = Str::uuid();
      }
    });
  }
}