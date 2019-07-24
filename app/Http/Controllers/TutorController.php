<?php
namespace App\Http\Controllers;

use App\Tutor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;


class TutorController extends Controller
{
	public function index()
	{
		$tutor_data = Tutor::with(['students'])->get();
		//$student_data = Student::with(['tutors'])->get();
		//$match_data = Match::with(['tutor', 'student', 'match_meeting_details'])->get();

		//$user->roles()->attach($roleId);


		//$match_data->match_meeting_details->attach('location_name');

		//print_r($match_data);
		//die();
		$profile_img_placeholder = asset( Storage::url('profile_placeholder.png'));

		return view('admin', ['tutor_data' => $tutor_data, 'profile_image_placeholder' => $profile_img_placeholder] );
	}

	public function tutor_list()
	{
		$tutor_data = Tutor::orderBy('last_name')->get();

		return response()->json($tutor_data);
	}

	public function store(Request $request)
	{
		$validatedData = $request->validate([
			'first_name' => 'required',
			'last_name' => 'required',
			'email' => 'nullable|email',
			'address' => 'nullable',
			'city' => 'nullable',
			'state' => 'nullable',
			'zip' => 'nullable',
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

		if (!empty($request['profile_image'])) {

			if (stristr($request->input('profile_image'), 'image/jpeg')) $ext = 'jpeg';
			if (stristr($request->input('profile_image'), 'image/jpg')) $ext = 'jpg';
			if (stristr($request->input('profile_image'), 'image/png')) $ext = 'png';

			$img = str_replace('data:image/'.$ext.';base64,','',$request->input('profile_image'));
			$img = str_replace(' ', '+', $img);

			$img_name = $id.'_'.time().'.'.$ext;

			Storage::disk('public')->put("/tutor_profile_images/$img_name", base64_decode($img));

			$request['profile_image'] = $img_name;
		}

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

		// delete the old profile image
		if (!empty($request['profile_image'])) Storage::disk('public')->delete("/tutor_profile_images/$tutor->profile_image");
		else unset($request['profile_image']);

		$input = $request->all();

		$tutor->fill($input)->save();

		return response()->json('Tutor updated!');
	}
}
