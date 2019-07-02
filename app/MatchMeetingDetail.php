<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use App\MatchMeetingLocation;

class MatchMeetingDetail extends Model
{
	protected $guarded = ['id'];

	protected $appends = ['location_name','meeting_time'];

	/**
	 * The matches the details belong to
	 */
	public function match()
	{
		return $this->belongsTo('App\Match');
	}

	/**
	 * The matches the details belong to
	 */
	public function match_meeting_locations()
	{
		return $this->belongsToMany('App\MatchMeetingLocation', 'match_location_assocs', 'match_meeting_details_id')->withPivot('location_name');
	}

	public function getLocationNameAttribute()
	{
		$location_data = MatchMeetingLocation::find($this->match_location_id);
		return $location_data->name;
	}

	public function getMeetingTimeAttribute()
	{
		return date('g:i A', strtotime($this->time));
	}
}
