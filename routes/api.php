<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::get('projects', 'ProjectController@index');
Route::post('projects', 'ProjectController@store');
Route::get('projects/{id}', 'ProjectController@show');
Route::put('projects/{project}', 'ProjectController@markAsCompleted');
Route::post('tasks', 'TaskController@store');
Route::put('tasks/{task}', 'TaskController@markAsCompleted');

Route::post('tutors', 'TutorController@store');
Route::put('tutors/{id}', 'TutorController@update');
Route::get('tutors', 'TutorController@tutor_list');

Route::post('students', 'StudentController@store');
Route::put('students/{id}', 'StudentController@update');
Route::get('students', 'StudentController@student_list');

Route::post('matches', 'MatchController@store');
Route::get('matches', 'MatchController@match_list');

Route::post('sessions', 'SessionController@store');
Route::put('sessions/{id}', 'SessionController@update');
Route::get('sessions', 'SessionController@index');

Route::get('session_categories', 'SessionCategoryController@session_category_list');
