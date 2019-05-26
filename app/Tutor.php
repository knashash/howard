<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Tutor extends Model
{
	protected $guarded = ['id'];

	protected $appends = ['image_url','test_attr'];

	/**
	 * The students that belong to the tutor.
	 */
	public function students()
	{
		return $this->belongsToMany('App\Student', 'tutor_student_assocs','tutor_id');
	}

	public function getImageUrlAttribute()
	{
		return asset( Storage::url('test.jpeg'));
	}

	public function getTestAttrAttribute()
	{
		return 'testing';
	}
}
