<?php
namespace App\Http\Controllers;

use App\Session;
use App\Match;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use function MongoDB\BSON\toJSON;


class SessionController extends Controller
{
	public function index()
	{
		$session_data = Session::with(['matches'])->get();

		return response()->json($session_data);
	}

	public function store(Request $request)
	{
		$validatedData = $request->validate([
			'category_id' => 'required|integer',
			'student_list' => 'required|array',
			'tutor_list' => 'required|array',
			'session_date' => 'required',
			'session_mins' => 'required|numeric|max:100',
			'session_hours' => 'required|numeric|max:12',
			'notes' => 'nullable|string',
			'in_class' => 'required:numeric:max:1',
		]);

		DB::transaction(function () use ($validatedData) {

			$session_matches = [];
			$session_minutes = ($validatedData['session_hours']*60) + $validatedData['session_mins'];
			$session_date = strtotime($validatedData['session_date']);
			date_default_timezone_set('America/Chicago');
			$session_date = date('Y-m-d', $session_date);

			if (!$session_minutes) abort(400, 'Session must have time');

			foreach ($validatedData['tutor_list'] as $tutor_id) {
				foreach ($validatedData['student_list'] as $student_id) {
					$match = DB::table('tutor_student_assocs')
						->where([
							['tutor_id', '=', $tutor_id],
							['student_id', '=', $student_id],
						])
						->first();

					// if match doesnt xist, create it
					if (!$match) {
						$match = new Match;
						$match->student_id = $student_id;
						$match->tutor_id = $tutor_id;

						$match->save();

					}
					$match_ids[] = $match->id;
				}
			}

			// set up new session data
			$session = new Session;
			$session->minutes = $session_minutes;
			$session->session_date = $session_date;
			$session->category_id = $validatedData['category_id'];
			if ($validatedData['notes']) $session->notes = $validatedData['notes'];
			$session->in_class = $validatedData['in_class'];

			$session->save();

			foreach($match_ids as $match_id)
			{
				$session_matches[] = ['tutor_student_assoc_id' => $match_id, 'session_id' => $session->id,'created_at'=>date('Y-m-d H:i:s')];
			}

			DB::table('session_match_assocs')->insert($session_matches);

		});

		//print_r($request);


		return response()->json('Session created!');
	}

	private function _check_for_matches(Array $tutor_list, Array $student_list)
	{
		foreach ($tutor_list as $tutor_id)
		{
			foreach ($student_list as $student_id)
			{
				$match = DB::table('tutor_student_assocs')
					->where(['tutor_id', '=', $tutor_id],['student_id', '=', $student_id])
					->first();
			}
		}
	}

	public function update(Request $request, $id)
	{
		$session = Session::find($id);

		$validatedData = $request->validate([
			'category_id' => 'required|integer',
			'student_list' => 'required|array',
			'tutor_list' => 'required|array',
			'session_date' => 'required',
			'session_mins' => 'required|numeric|max:100',
			'session_hours' => 'required|numeric|max:12',
			'notes' => 'nullable|string',
			'in_class' => 'required:numeric:max:1',
		]);

		DB::transaction(function () use ($validatedData, $session) {

			$session_matches = [];
			$session_minutes = ($validatedData['session_hours']*60) + $validatedData['session_mins'];
			$session_date = strtotime($validatedData['session_date']);
			date_default_timezone_set('America/Chicago');
			$session_date = date('Y-m-d', $session_date);

			if (!$session_minutes) abort(400, 'Session must have time');

			foreach ($validatedData['tutor_list'] as $tutor_id) {
				foreach ($validatedData['student_list'] as $student_id) {
					$match = DB::table('tutor_student_assocs')
						->where([
							['tutor_id', '=', $tutor_id],
							['student_id', '=', $student_id],
						])
						->first();

					// if match doesnt xist, create it
					if (!$match) {
						$match = new Match;
						$match->student_id = $student_id;
						$match->tutor_id = $tutor_id;

						$match->save();

					}
					$match_ids[] = $match->id;
				}
			}

			// set up new session data
			$session->minutes = $session_minutes;
			$session->session_date = $session_date;
			$session->category_id = $validatedData['category_id'];
			if ($validatedData['notes']) $session->notes = $validatedData['notes'];
			$session->in_class = $validatedData['in_class'];

			$session->save();

			// delete the existing matches from the session
			DB::table('session_match_assocs')->where('session_id', $session->id)->delete();

			foreach($match_ids as $match_id)
			{
				$session_matches[] = ['tutor_student_assoc_id' => $match_id, 'session_id' => $session->id,'created_at'=>date('Y-m-d H:i:s')];
			}

			DB::table('session_match_assocs')->insert($session_matches);

		});

		//print_r($request);


		return response()->json('Session created!');
	}

	public function match_list()
	{
		$match_data = Match::get();

		return response()->json($match_data);
	}
}
