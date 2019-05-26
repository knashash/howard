<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
	protected $appends = ['category_name','duration','hours','mins'];

	/**
	 * The matches that belong to the session
	 */
	public function matches()
	{
		return $this->belongsToMany('App\Match', 'session_match_assocs','session_id', 'tutor_student_assoc_id')->withPivot('tutor_student_assoc_id', 'session_id');
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

	private function _convertToHoursMins($time, $format = '%02d:%02d') {
		if ($time < 1) {
			return;
		}
		$hours = floor($time / 60);
		$minutes = ($time % 60);
		return sprintf($format, $hours, $minutes);
	}

}
