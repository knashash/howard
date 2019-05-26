<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSessionCategories extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		 $data = array(
			 array('name'=>'1 ON 1', 'description'=> 'Individual Session'),
			 array('user_id'=>'Group', 'subject_id'=> 'Group Session'),
			 //...
		 );

    	// Insert some stuff
		 DB::table('session_categories')->insert(
			 $data
		 );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
