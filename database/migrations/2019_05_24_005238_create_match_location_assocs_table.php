<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMatchLocationAssocsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('match_location_assocs', function (Blueprint $table) {
            $table->increments('id');
			  	$table->integer('match_meeting_details_id')->unsigned();
			  	$table->integer('match_meeting_locations_id')->unsigned();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('match_location_assocs');
    }
}
