<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStudentTestingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_tests', function (Blueprint $table) {
            $table->increments('id');
			  	$table->unsignedInteger('student_id');
			  	$table->string('test_type')->nullable();
			   $table->string('test_group')->nullable();
			  	$table->string('test_num')->nullable();
			  	$table->string('test_letter')->nullable();
			  	$table->string('test_subject')->nullable();
			  	$table->date('test_date')->nullable();
			   $table->string('test_score')->nullable();
            $table->timestamps();
			  $table->foreign('student_id')->references('id')->on('students');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('student_testing');
    }
}
