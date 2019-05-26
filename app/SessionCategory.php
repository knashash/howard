<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SessionCategory extends Model
{
	/**
	 * The session it belongs to
	 */
	public function session()
	{
		return $this->belongsTo('App\Session', 'category_id','id');
	}
}
