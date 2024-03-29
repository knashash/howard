<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSessionMatchAssocTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('session_match_assoc', function (Blueprint $table) {
            $table->increments('id');
			   $table->unsignedInteger('tutor_student_assoc_id');
			   $table->unsignedInteger('session_id');
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
        Schema::dropIfExists('session_match_assoc');
    }
}
