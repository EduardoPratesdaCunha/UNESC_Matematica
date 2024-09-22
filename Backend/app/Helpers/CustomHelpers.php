<?php

function logoutToken()
{
  return auth('api')->logout();
}