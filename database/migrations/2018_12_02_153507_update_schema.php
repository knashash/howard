<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateSchema extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		 Schema::table('tutor_student_assocs', function (Blueprint $table) {
			 $table->tinyInteger('active')->after('student_id')->default(1);
			 $table->timestamp('ts_deactivate')->after('updated_at')->nullable($value = true);
		 });

		 Schema::table('tutors', function (Blueprint $table) {
			 $table->tinyInteger('active')->default(1)->change();
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
