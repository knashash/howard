<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Model;
use Log;

class Match extends Model
{
	protected $guarded = ['id'];
	protected $table = 'tutor_student_assocs';
	protected $appends = ['student_name', 'tutor_name'];
	public $incrementing = true;

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

	/**
	 * The matches the details belong to
	 */
	public function match_meeting_details()
	{
		return $this->hasMany('App\MatchMeetingDetail', 'match_id');
	}

	/**
	 * Get the sessions for the match
	 */
	public function sessions()
	{
		return $this->belongsToMany('App\Session', 'session_match_assocs','tutor_student_assoc_id', 'session_id')->orderBy('session_date', 'Desc');
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
