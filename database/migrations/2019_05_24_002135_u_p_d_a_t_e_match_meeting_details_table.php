<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UPDATEMatchMeetingDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		 Schema::table('match_meeting_details', function (Blueprint $table) {
			 $table->foreign('match_id')->references('id')->on('tutor_student_assocs');
			 $table->foreign('match_location_id')->references('id')->on('match_meeting_locations');
		 });
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
