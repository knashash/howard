<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Student extends Model
{
	protected $guarded = ['id'];

	protected $appends = ['image_url', 'age'];

	/**
	 * The students that belong to the tutor.
	 */
	public function tutors()
	{
		return $this->belongsToMany('App\Tutor', 'tutor_student_assocs','student_id');
	}

	public function getImageUrlAttribute()
	{
		if ($this->profile_image && Storage::disk('public')->exists("/student_profile_images/$this->profile_image")) return asset( Storage::url("/student_profile_images/$this->profile_image"));
		else return asset( Storage::url('profile_placeholder.png'));
	}

	public function getAgeAttribute()
	{
		if (!empty($this->dob))
		{
			$birthDate = $this->dob;
			//explode the date to get month, day and year
			$birthDate = explode("-", $birthDate);
			//get age from date or birthdate
			$age = (date("md", date("U", mktime(0, 0, 0, $birthDate[1], $birthDate[2], $birthDate[0]))) > date("md")
				? ((date("Y") - $birthDate[0]) - 1)
				: (date("Y") - $birthDate[0]));
			return $age;
		}

	}
}
