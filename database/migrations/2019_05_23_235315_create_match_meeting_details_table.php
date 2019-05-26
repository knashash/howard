<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMatchMeetingDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		 Schema::create('match_meeting_locations', function (Blueprint $table) {
			 $table->increments('id');
			 $table->string('name');
			 $table->timestamps();
		 });

		 Schema::create('match_meeting_details', function (Blueprint $table) {
			 $table->increments('id');
			 $table->integer('match_id')->unsigned();
			 $table->enum('day', ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']);
			 $table->time('time');
			 $table->integer('match_location_id')->unsigned();;
			 $table->timestamps();
		 });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('match_meeting_details');
		 	Schema::dropIfExists('match_meeting_locations');
    }
}
