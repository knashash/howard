<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
	protected $appends = ['category_name','duration','hours','mins','tutors','students'];

	/**
	 * The matches that belong to the session
	 */
	public function matches()
	{
		return $this->belongsToMany('App\Match', 'session_match_assocs','session_id', 'tutor_student_assoc_id');
	}

	/**
	 * The session category
	 */
	public function category()
	{
		return $this->hasOne('App\SessionCategory', 'id','category_id');
	}

	public function getCategoryNameAttribute()
	{
		return $this->category->name;
	}

	public function getDurationAttribute()
	{
		return $this->_convertToHoursMins($this->minutes);
	}

	public function getHoursAttribute()
	{
		return floor($this->minutes / 60);
	}

	public function getMinsAttribute()
	{
		return $minutes = ($this->minutes % 60);
	}

	public function getStudentsAttribute()
	{
		$students = '';

		$i=0;
		foreach ($this->matches as $match)
		{
			if ($i) $students .= ', '.$match->student->first_name.' '.$match->student->last_name;
			else $students = $match->student->first_name.' '.$match->student->last_name;
			$i++;
		}

		return $students;
	}

	public function getTutorsAttribute()
	{
		$tutors = '';

		$i=0;
		foreach ($this->matches as $match)
		{
			if ($i) $tutors .= ', '.$match->tutor->first_name.' '.$match->tutor->last_name;
			else $tutors = $match->tutor->first_name.' '.$match->tutor->last_name;
			$i++;
		}

		return $tutors;
	}

	private function _convertToHoursMins($time, $format = '%02d:%02d') {
		if ($time < 1) {
			return;
		}
		$hours = floor($time / 60);
		$minutes = ($time % 60);
		return sprintf($format, $hours, $minutes);
	}

}
