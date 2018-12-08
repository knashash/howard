<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTutorAssocTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		 Schema::create('instruction_indicators', function (Blueprint $table) {
			 $table->increments('id');
			 $table->string('name');
			 $table->text('description');
			 $table->timestamps();
		 });

		 Schema::create('tutor_indicators', function (Blueprint $table) {
			 $table->unsignedInteger('instruction_indicator_id');
			 $table->unsignedInteger('tutor_id');
			 $table->timestamps();
			 $table->foreign('tutor_id')->references('id')->on('tutors');
			 $table->foreign('instruction_indicator_id')->references('id')->on('instruction_indicators');
		 });

		 Schema::create('students', function (Blueprint $table) {
			 $table->increments('id');
			 $table->string('first_name');
			 $table->string('last_name');
			 $table->string('email');
			 $table->string('address');
			 $table->string('city');
			 $table->string('state', 5);
			 $table->integer('zip');
			 $table->timestamps();
		 });

		 Schema::create('tutor_student_assoc', function (Blueprint $table) {
			 $table->increments('id');
			 $table->unsignedInteger('tutor_id');
			 $table->unsignedInteger('student_id');
			 $table->timestamps();
			 $table->foreign('tutor_id')->references('id')->on('tutors');
			 $table->foreign('student_id')->references('id')->on('students');
			 $table->unique(['tutor_id', 'student_id']);
		 });

		 Schema::table('tutors', function (Blueprint $table) {
			 $table->tinyInteger('active')->after('notes')->default(0);
		 });

		 Schema::create('tutor_availability', function (Blueprint $table) {
			 $table->increments('id');
			 $table->unsignedInteger('tutor_id');
			 $table->string('day_of_week');
			 $table->dateTime('start_time');
			 $table->dateTime('end_time');
			 $table->foreign('tutor_id')->references('id')->on('tutors');
			 $table->timestamps();
		 });

		 Schema::create('training', function (Blueprint $table) {
			 $table->increments('id');
			 $table->string('name');
			 $table->text('description');
			 $table->timestamps();
		 });

		 Schema::create('tutor_training_assoc', function (Blueprint $table) {
			 $table->increments('id');
		 	$table->unsignedInteger('tutor_id');
		 	 $table->unsignedInteger('training_id');
			 $table->timestamps();
			 $table->foreign('tutor_id')->references('id')->on('tutors');
			 $table->foreign('training_id')->references('id')->on('training');
		 });

		 Schema::create('time_track', function (Blueprint $table) {
			 $table->increments('id');
			 $table->unsignedInteger('tutor_id');
			 $table->unsignedInteger('tutor_student_assoc_id');
			 $table->dateTime('day');
			 $table->float('hours');
			 $table->enum('type', ['group', '1:1', 'other'])->nullable($value = true);
			 $table->text('notes');
			 $table->foreign('tutor_id')->references('id')->on('tutors');
			 $table->foreign('tutor_student_assoc_id')->references('id')->on('tutor_student_assoc');
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
		 Schema::dropIfExists('instruction_indicators');
		 Schema::dropIfExists('time_track');
		 Schema::dropIfExists('tutor_training_assoc');
		 Schema::dropIfExists('tutor_availability');
		 Schema::dropIfExists('training');
		 Schema::dropIfExists('tutor_student_assoc');
		 Schema::dropIfExists('students');
		 Schema::dropIfExists('tutor_indicators');
		 Schema::dropIfExists('instruction_indicators');

    }
}
