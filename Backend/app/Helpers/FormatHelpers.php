<?php

function valueFormat($value)
{
  if (!$value) {
    return 'R$ 0,00';
  }

  return 'R$ ' . number_format($value, 2, '.', ',');
}

function rateFormat($value)
{
  if (!$value) {
    return 'R$ 0,00';
  }

  return number_format($value, 5, '.', ',') . '%';
}