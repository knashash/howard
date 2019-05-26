<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Model;

class MatchLocationAssoc extends Pivot
{
	public $incrementing = true;

	protected $appends = ['location_name'];

	/**
	 * The tutors that belong to the students
	 */
	public function match_meeting_detail()
	{
		return $this->belongsTo('App\MatchMeetingDetail', 'match_meeting_details_id');
	}

	/**
	 * The tutors that belong to the students
	 */
	public function match_meeting_location()
	{
		return $this->belongsTo('App\MatchMeetingLocation','match_meeting_locations_id') ;
	}

	public function getLocationNameAttribute()
	{
		return $this->match_meeting_location->name;
	}
}

