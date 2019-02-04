<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class TutorStudentAssoc extends Pivot
{
	/**
	 * The tutors that belong to the students
	 */
	public function tutors()
	{
		return $this->belongsToMany('App\Tutor')
			->using('App\TutorStudentAssoc');
	}

	/**
	 * The tutors that belong to the students
	 */
	public function students()
	{
		return $this->belongsToMany('App\Student')
			->using('App\TutorStudentAssoc');
	}
}
