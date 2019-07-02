<?php
namespace App\Http\Controllers;

use App\Match;
use App\MatchMeetingLocation;
use App\MatchMeetingDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use function MongoDB\BSON\toJSON;
use Log;


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

		// update the match meeting details first
		if (!empty($request->match_meeting_details))
		{
			//now insert the match meeting details
			$meeting_details = [];
			foreach ($request->match_meeting_details as $match_meeting_detail)
			{
				$t = date('H:i:s',strtotime($match_meeting_detail['meeting_time']));

				$meeting_details[] = [
					'match_id' => $match->id,
					'day' => $match_meeting_detail['day'],
					'time' => $t,
					'match_location_id' => $match_meeting_detail['match_location_id'],
				];
			}

			MatchMeetingDetail::insert($meeting_details);
		}

		return response()->json('Match created!');
	}

	public function match_list()
	{
		$match_data = Match::with(['tutor', 'student', 'match_meeting_details', 'sessions'])->get();

		foreach ($match_data as &$match)
		{
			if (!empty($match['sessions'][0]))
			{
				$match['latest_session'] = $match['sessions'][0]->session_date;
				$match['total_sessions'] = count($match['sessions']);

				$total_session_minutes = 0;
				foreach ($match['sessions'] as $session)
				{
					$total_session_minutes += $session->minutes;
				}
				$match['total_session_time'] = $this->_convertToHoursMins($total_session_minutes);
			}
			else
			{
				$match['latest_session'] = 'N/A';
				$match['total_sessions'] = 0;
				$match['total_session_time'] = 0;
			}
		}

		return response()->json($match_data);
	}

	public function location_list()
	{
		$match_locations_data = MatchMeetingLocation::get();

		return response()->json($match_locations_data);
	}

	public function update(Request $request, $id)
	{
		DB::transaction(function () use ($request, $id) {


			// update the match meeting details first
			if (isset($request->match_meeting_details))
			{
				// delete the current match details
				$deletedRows = MatchMeetingDetail::where('match_id', $id)->delete();

				//now insert the match meeting details
				$meeting_details = [];
				foreach ($request->match_meeting_details as $match_meeting_detail)
				{
					$t = date('H:i:s',strtotime($match_meeting_detail['meeting_time']));

					$meeting_details[] = [
						'match_id' => $id,
						'day' => $match_meeting_detail['day'],
						'time' => $t,
						'match_location_id' => $match_meeting_detail['match_location_id'],
					];
				}

				MatchMeetingDetail::insert($meeting_details);
			}

			$validatedData = $request->validate([
				'tutor_id' => 'required',
				'student_id' => 'required',
			]);

			$match = Match::find($id);

			$match->fill($validatedData)->save();


		});

		return response()->json('Match updated!');
	}


	private function _convertToHoursMins($time, $format = '%02d:%02d') {
		if ($time < 1) {
			return;
		}
		$hours = floor($time / 60);
		$minutes = ($time % 60);
		return sprintf($format, $hours, $minutes);
	}
}
