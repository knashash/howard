<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSessionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sessions', function (Blueprint $table) {
        	  $table->increments('id');
			  $table->unsignedInteger('tutor_student_assoc_id');
			  $table->unsignedInteger('minutes');
			  $table->dateTime('session_date');
			  $table->tinyInteger('category_id');
			  $table->text('notes')->nullable($value = true);
			  $table->timestamps();
			  $table->foreign('tutor_student_assoc_id')->references('id')->on('tutor_student_assocs');
			  $table->foreign('category_id')->references('id')->on('session_categories');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sessions');
    }
}
