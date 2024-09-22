<input type="text" name="name" id="name"  value="{{ $simulate->name ?? null }}">
<input type="text" name="initial_value" id="initial_value"  value="{{ isset($request['initial_value']) ? $request['initial_value'] : ( $simulate->initial_value ?? null) }}">
<input type="text" name="value_per_month" id="value_per_month"  value="{{ isset($request['value_per_month']) ? $request['value_per_month'] : ( $simulate->value_per_month ?? null) }}">
<input type="text" name="rate" id="rate"  value="{{ isset($request['rate']) ? $request['rate'] : ( $simulate->rate ?? null) }}">
<input type="text" name="months" id="months"  value="{{ isset($request['months']) ? $request['months']/12 : ( isset($simulate) ? $simulate->months/12 : null) }}">
<input type="text" name="result" value="{{ $result ?? 0 }}" disabled>