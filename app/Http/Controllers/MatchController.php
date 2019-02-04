<?php
namespace App\Http\Controllers;

use App\Match;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use function MongoDB\BSON\toJSON;


class MatchController extends Controller
{
	public function index()
	{
		$tutor_data = DB::table('tutors')->get();
		$student_data = DB::table('students')->get();

		return view('admin', ['tutor_data' => $tutor_data, 'student_data' => $student_data] );
	}

	public function store(Request $request)
	{
		$validatedData = $request->validate([
			'tutor_id' => 'required',
			'student_id' => 'required',
		]);

		$match = new Match;
		$match->student_id = $validatedData['student_id'];
		$match->tutor_id = $validatedData['tutor_id'];

		$match->save();

		return response()->json('Match created!');
	}

	public function match_list()
	{
		$match_data = Match::get();

		return response()->json($match_data);
	}
}
