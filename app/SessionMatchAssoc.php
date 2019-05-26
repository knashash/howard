<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class SessionMatchAssoc extends Pivot
{
	protected $table = 'session_match_assocs';
	public $incrementing = true;
	//protected $appends = ['student_name', 'tutor_name'];

	/**
	 * The tutors that belong to the students
	 */
	public function session()
	{
		return $this->belongsTo('App\Session');
	}

	/**
	 * The tutors that belong to the students
	 */
	public function match()
	{
		return $this->belongsTo('App\Match', 'tutor_student_assoc_id') ;
	}

}
