<?php
namespace App\Http\Controllers;

use App\Tutor;
use App\Match;
use App\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use function MongoDB\BSON\toJSON;


class TutorController extends Controller
{
	public function index()
	{
		$tutor_data = Tutor::with(['students'])->get();
		$student_data = Student::with(['tutors'])->get();
		$match_data = Match::with(['tutor', 'student'])->get();

		//print_r($match_data);
		//die();

		return view('admin', ['tutor_data' => $tutor_data, 'student_data' => $student_data, 'match_data' => $match_data] );
	}

	public function tutor_list()
	{
		$tutor_data = DB::table('tutors')->get();

		return response()->json($tutor_data);
	}
}
