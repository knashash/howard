<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateStudentTutorTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
    	DB::statement('ALTER TABLE `students` CHANGE COLUMN email email VARCHAR(255)');
    	DB::statement('ALTER TABLE `students` CHANGE COLUMN address address VARCHAR(255)');
		 DB::statement('ALTER TABLE `students` CHANGE COLUMN city city VARCHAR(100)');
		 DB::statement('ALTER TABLE `students` CHANGE COLUMN state state VARCHAR(10)');
		 DB::statement('ALTER TABLE `students` CHANGE COLUMN zip zip INT(11)');

		 DB::statement('ALTER TABLE `tutors` CHANGE COLUMN email email VARCHAR(255)');
		 DB::statement('ALTER TABLE `tutors` CHANGE COLUMN address address VARCHAR(255)');
		 DB::statement('ALTER TABLE `tutors` CHANGE COLUMN city city VARCHAR(100)');
		 DB::statement('ALTER TABLE `tutors` CHANGE COLUMN state state VARCHAR(10)');
		 DB::statement('ALTER TABLE `tutors` CHANGE COLUMN zip zip INT(11)');

		 Schema::table('tutors', function (Blueprint $table) {
			 $table->text('student_string')->after('active')->nullable($value = true);
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
