<?php
namespace App\Http\Controllers;

use App\Tutor;
use App\Match;
use App\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use function MongoDB\BSON\toJSON;


class TutorController extends Controller
{
	public function index()
	{
		$tutor_data = Tutor::with(['students'])->get();
		$student_data = Student::with(['tutors'])->get();
		$match_data = Match::with(['tutor', 'student', 'match_meeting_details'])->get();

		//$user->roles()->attach($roleId);


		foreach ($match_data as &$match) {
			//print_r($match->match_meeting_details->location_name = 'chicago');
			//$match->match_meeting_details->location_name = 'chicago';

			foreach ($match->match_meeting_details as $match_meeting_detail)
			{
				//print_r($match_meeting_detail);
				//die();
			}

		}


		//$match_data->match_meeting_details->attach('location_name');

		//print_r($match_data);
		//die();

		return view('admin', ['tutor_data' => $tutor_data, 'student_data' => $student_data, 'match_data' => $match_data] );
	}

	public function tutor_list()
	{
		$tutor_data = Tutor::get();

		return response()->json($tutor_data);
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
			'zip' => 'required',
			'dob' => 'nullable|date',
			'phone_cell' => 'nullable',
			'phone_home' => 'nullable',
			'ethnic_group' => 'nullable',
			'gender' => 'nullable',
			'date_entry' => 'nullable|date',
			'date_exit' => 'nullable|date',
			'active' => 'nullable',
			'notes' => 'nullable'
		]);

		if (!empty($validatedData['dob']))
		{
			$dob = strtotime($validatedData['dob']);
			$validatedData['dob'] = date('Y-m-d', $dob);
		}

		if (!empty($validatedData['date_entry']))
		{
			$dob = strtotime($validatedData['date_entry']);
			$validatedData['date_entry'] = date('Y-m-d', $dob);
		}

		if (!empty($validatedData['date_exit']))
		{
			$dob = strtotime($validatedData['date_exit']);
			$validatedData['date_exit'] = date('Y-m-d', $dob);
		}

		$tutor = new Tutor;
		$tutor->first_name = $validatedData['first_name'];
		$tutor->last_name = $validatedData['last_name'];
		$tutor->email = $validatedData['email'];
		$tutor->address = $validatedData['address'];
		$tutor->city = $validatedData['city'];
		$tutor->state = $validatedData['state'];
		$tutor->zip = $validatedData['zip'];
		$tutor->dob = $validatedData['dob'];
		$tutor->phone_cell = $validatedData['phone_cell'];
		$tutor->phone_home = $validatedData['phone_home'];
		$tutor->ethnic_group = $validatedData['ethnic_group'];
		$tutor->gender = $validatedData['gender'];
		$tutor->date_entry = $validatedData['date_entry'];
		$tutor->date_exit = $validatedData['date_exit'];
		$tutor->active = $validatedData['active'];
		$tutor->notes = $validatedData['notes'];

		$tutor->save();

		return response()->json('Tutor Created!');
	}

	public function update(Request $request, $id)
	{
		date_default_timezone_set('America/Chicago');

		if (stristr($request->input('profile_picture'),'image/jpeg')) $ext = 'jpeg';
		if (stristr($request->input('profile_picture'),'image/jpg')) $ext = 'jpg';
		if (stristr($request->input('profile_picture'),'image/png')) $ext = 'png';

		$img = str_replace('data:image/'.$ext.';base64,','',$request->input('profile_picture'));
		$img = str_replace(' ', '+', $img);


		Storage::put('/public/letssee.'.$ext, base64_decode($img));


		//$path = $request->input('profile_picture')->store('avatars');

		//$path = $request->file('profile_picture')->store('avatars');

		//Storage::put('file.jpg', $request->file('profile_picture'));

		//Storage::put('file.jpg', base64_decode($img));


		if (!empty($request['dob']))
		{
			$dob = strtotime($request['dob']);
			$request['dob'] = date('Y-m-d', $dob);
		}

		if (!empty($request['date_entry']))
		{
			$dob = strtotime($request['date_entry']);
			$request['date_entry'] = date('Y-m-d', $dob);
		}

		if (!empty($request['date_exit']))
		{
			$dob = strtotime($request['date_exit']);
			$request['date_exit'] = date('Y-m-d', $dob);
		}

		Log::debug($request);

		$tutor = Tutor::find($id);

		unset($request['profile_picture']);

		$input = $request->all();

		$tutor->fill($input)->save();

		return response()->json('Tutor updated!');
	}
}
