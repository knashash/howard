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
		$test = array(1,2,3);

		$data[] = array('name' => 'karim', 'age' => '23');
		$data[] = array('name' => 'john', 'age' => '23');
		$data[] = array('name' => 'chris', 'age' => '23');
		$data[] = array('name' => 'yes', 'age' => '23');
		$data[] = array('name' => 'him', 'age' => '23');
		$data[] = array('name' => 'are', 'age' => '23');
		$data[] = array('name' => 'you', 'age' => '23');
		$data[] = array('name' => 'sure', 'age' => '23');
		$data[] = array('name' => 'please', 'age' => '23');
		$data[] = array('name' => 'let', 'age' => '23');

		$data = Tutor::orderBy('last_name', 'desc')
			->get();

		$data = DB::table('tutors')->select('first_name', 'last_name')->get();

		/*$projects = Project::where('is_completed', false)
			->orderBy('created_at', 'desc')
			->take(10)
			->get();*/

		//return response()->json($projects);

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

		$tutor = new Tutor;
		$tutor->first_name = $validatedData['first_name'];
		$tutor->last_name = $validatedData['last_name'];
		$tutor->email = $validatedData['email'];
		$tutor->address = $validatedData['address'];
		$tutor->city = $validatedData['city'];
		$tutor->state = $validatedData['state'];
		$tutor->zip = $validatedData['zip'];

		$tutor->save();

		/*
		$project = App\Project::create([
			'name' => $validatedData['name'],
			'description' => $validatedData['description'],
		]);*/

		return response()->json('Project created!');
	}

	public function show($id)
	{
		$project = Project::with(['tasks' => function ($query) {
			$query->where('is_completed', false);
		}])->find($id);

		return $project->toJson();
	}

	public function markAsCompleted(Project $project)
	{
		$project->is_completed = true;
		$project->update();

		return response()->json('Project updated!');
	}
}
