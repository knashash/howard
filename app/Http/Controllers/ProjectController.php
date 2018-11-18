<?php
namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use function MongoDB\BSON\toJSON;


class ProjectController extends Controller
{
	public function index()
	{
		//$projects = DB::table('projects')->get();

		$projects = Project::where('is_completed', false)
			->orderBy('created_at', 'desc')
			->withCount(['tasks' => function ($query) {
				$query->where('is_completed', false);
			}])
			->get();

		/*$projects = Project::where('is_completed', false)
			->orderBy('created_at', 'desc')
			->take(10)
			->get();*/

		return response()->json($projects);
	}

	public function store(Request $request)
	{
		$validatedData = $request->validate([
			'name' => 'required',
			'description' => 'required',
		]);

		$project = new Project;
		$project->name = $validatedData['name'];
		$project->description = $validatedData['description'];

		$project->save();

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
