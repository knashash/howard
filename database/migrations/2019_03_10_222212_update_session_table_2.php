<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateSessionTable2 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		 Schema::table('session_match_assocs', function (Blueprint $table) {
			 $table->foreign('tutor_student_assoc_id')->references('id')->on('tutor_student_assocs');
			 $table->foreign('session_id')->references('id')->on('sessions');
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
