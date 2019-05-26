<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
	protected $guarded = ['id'];

	/**
	 * The students that belong to the tutor.
	 */
	public function tutors()
	{
		return $this->belongsToMany('App\Tutor', 'tutor_student_assocs','student_id');
	}
}
