<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tutor extends Model
{
	protected $fillable = ['first_name', 'last_name', 'email', 'address', 'city', 'state', 'zip'];

	/**
	 * The students that belong to the tutor.
	 */
	public function students()
	{
		return $this->belongsToMany('App\Student', 'tutor_student_assocs','tutor_id');
	}
}
