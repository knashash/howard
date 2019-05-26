<?php
namespace App\Http\Controllers;

use App\SessionCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use function MongoDB\BSON\toJSON;


class SessionCategoryController extends Controller
{
	public function session_category_list()
	{
		$categories_data = SessionCategory::get();

		return response()->json($categories_data);
	}
}
