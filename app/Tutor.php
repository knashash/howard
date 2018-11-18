<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tutor extends Model
{
	protected $fillable = ['first_name', 'last_name', 'email', 'address', 'city', 'state', 'zip'];
}
