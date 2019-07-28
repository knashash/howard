<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StudentTest extends Model
{
	/**
	 * The session it belongs to
	 */
	public function student()
	{
		return $this->belongsTo('App\Student', 'student_id','id');
	}
}
