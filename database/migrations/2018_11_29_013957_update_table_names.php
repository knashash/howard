<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateTableNames extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
    	 Schema::rename('tutor_training_assoc', 'tutor_training_assocs');
		 Schema::rename('tutor_student_assoc', 'tutor_student_assocs');
		 Schema::rename('time_track', 'time_records');
		 Schema::rename('training', 'training_items');
		 Schema::rename('tutor_availability', 'tutor_schedules');
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
