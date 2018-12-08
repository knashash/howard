<?php
namespace App\Http\Controllers;

use App\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use function MongoDB\BSON\toJSON;


class StudentController extends Controller
{
	public function index()
	{
		$data = DB::table('students')->select('first_name', 'last_name')->get();

		return view('admin', ['data' => $data]);
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

		$student = new Student;
		$student->first_name = $validatedData['first_name'];
		$student->last_name = $validatedData['last_name'];
		$student->email = $validatedData['email'];
		$student->address = $validatedData['address'];
		$student->city = $validatedData['city'];
		$student->state = $validatedData['state'];
		$student->zip = $validatedData['zip'];

		$student->save();

		return response()->json('Student saved!');
	}
}
