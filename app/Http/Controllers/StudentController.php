<?php
namespace App\Http\Controllers;

use App\Student;
use App\StudentTest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;


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

		$student = new Student;
		$student->first_name = $validatedData['first_name'];
		$student->last_name = $validatedData['last_name'];
		$student->email = $validatedData['email'];
		$student->address = $validatedData['address'];
		$student->city = $validatedData['city'];
		$student->state = $validatedData['state'];
		$student->zip = $validatedData['zip'];
		$student->dob = $validatedData['dob'];
		$student->phone_cell = $validatedData['phone_cell'];
		$student->phone_home = $validatedData['phone_home'];
		$student->ethnic_group = $validatedData['ethnic_group'];
		$student->gender = $validatedData['gender'];
		$student->date_entry = $validatedData['date_entry'];
		$student->date_exit = $validatedData['date_exit'];
		$student->active = $validatedData['active'];
		$student->notes = $validatedData['notes'];

		$student->save();

		return response()->json('Student Created!');
	}

	public function student_list()
	{
		$student_data = Student::with(['test_results'])->orderBy('last_name')->get();

		return response()->json($student_data);
	}

	public function update(Request $request, $id)
	{
		date_default_timezone_set('America/Chicago');

		// update the match meeting details first
		if (!empty($request->student_tests))
		{
			// delete the current student tests
			$deletedRows = StudentTest::where('student_id', $id)->delete();

			//now insert the new student test data
			$student_test_details = [];
			foreach ($request->student_tests as $student_test)
			{
				$test_date = date('Y-m-d',strtotime($student_test['test_date']));

				$student_test_details[] = [
					'student_id' => $id,
					'test_type' => $student_test['test_type'],
					'test_date' => $test_date,
					'test_group' => $student_test['test_group'],
					'test_num' => $student_test['test_num'],
					'test_letter' => $student_test['test_letter'],
					'test_subject' => $student_test['test_subject'],
					'test_score' => $student_test['test_score'],
				];
			}

			StudentTest::insert($student_test_details);
		}

		if (!empty($request['profile_image'])) {

			if (stristr($request->input('profile_image'), 'image/jpeg')) $ext = 'jpeg';
			if (stristr($request->input('profile_image'), 'image/jpg')) $ext = 'jpg';
			if (stristr($request->input('profile_image'), 'image/png')) $ext = 'png';

			$img = str_replace('data:image/'.$ext.';base64,','',$request->input('profile_image'));
			$img = str_replace(' ', '+', $img);

			$img_name = $id.'_'.time().'.'.$ext;

			Storage::disk('public')->put("/student_profile_images/$img_name", base64_decode($img));

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

		$student = Student::find($id);

		// delete the old profile image
		if (!empty($request['profile_image'])) Storage::disk('public')->delete("/student_profile_images/$student->profile_image");
		else unset($request['profile_image']);

		$input = $request->all();
		unset($input['student_tests']);


		$student->fill($input)->save();

		return response()->json('Student updated!');
	}
}
