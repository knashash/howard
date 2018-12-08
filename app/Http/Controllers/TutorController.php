<?php
namespace App\Http\Controllers;

use App\Tutor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use function MongoDB\BSON\toJSON;


class TutorController extends Controller
{
	public function index()
	{
		$tutor_data = DB::table('tutors')->select('first_name', 'last_name')->get();
		$student_data = DB::table('students')->select('first_name', 'last_name')->get();

		return view('admin', ['tutor_data' => $tutor_data, 'student_data' => $student_data] );
	}

	public function store(Request $request)
	{
		$validatedData = $request->validate([
			'first_name' => 'required',
			'last_name' => 'required',
			'email' => 'required',
			'address' => 'required',
			'city' => 'required',
			'state' => 'required',
			'zip' => 'required'
		]);

		$tutor = new Tutor;
		$tutor->first_name = $validatedData['first_name'];
		$tutor->last_name = $validatedData['last_name'];
		$tutor->email = $validatedData['email'];
		$tutor->address = $validatedData['address'];
		$tutor->city = $validatedData['city'];
		$tutor->state = $validatedData['state'];
		$tutor->zip = $validatedData['zip'];

		$tutor->save();

		return response()->json('Project created!');
	}
}
