<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class MatchMeetingLocation extends Model
{
	protected $guarded = ['id'];

	/**
	 * The matches the details belong to
	 */
	public function match_meeting_details()
	{
		return $this->belongsToMany('App\MatchMeetingDetail', 'match_location_assocs','match_meeting_locations_id');
	}

}
