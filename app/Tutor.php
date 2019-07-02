<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Tutor extends Model
{
	protected $guarded = ['id'];

	protected $appends = ['image_url', 'student_list'];

	/**
	 * The students that belong to the tutor.
	 */
	public function students()
	{
		return $this->belongsToMany('App\Student', 'tutor_student_assocs','tutor_id');
	}

	public function getImageUrlAttribute()
	{
		if ($this->profile_image && Storage::disk('public')->exists("/tutor_profile_images/$this->profile_image")) return asset( Storage::url("/tutor_profile_images/$this->profile_image"));
		else return asset( Storage::url('profile_placeholder.png'));
	}

	public function getStudentListAttribute()
	{
		$student_list = '';
		if (!empty($this->students))
		{
			$i=0;
			foreach ($this->students as $student)
			{
				if ($i) $student_list .= ', '.$student->first_name.' '.$student->last_name;
				else $student_list = $student->first_name.' '.$student->last_name;

				$i++;
			}
		}

		return $student_list;
	}
}
