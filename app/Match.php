<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Match extends Pivot
{
	protected $table = 'tutor_student_assocs';
	protected $appends = ['student_name', 'tutor_name'];

	/**
	 * The tutors that belong to the students
	 */
	public function tutor()
	{
		return $this->belongsTo('App\Tutor');
	}

	/**
	 * The tutors that belong to the students
	 */
	public function student()
	{
		return $this->belongsTo('App\Student') ;
	}

	public function getStudentNameAttribute()
	{
		return $this->student->last_name.', '.$this->student->first_name;
	}

	public function getTutorNameAttribute()
	{
		return $this->tutor->last_name.', '.$this->tutor->first_name;
	}

}
