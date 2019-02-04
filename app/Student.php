<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
	/**
	 * The students that belong to the tutor.
	 */
	public function tutors()
	{
		return $this->belongsToMany('App\Tutor', 'tutor_student_assocs','student_id');
	}
}
