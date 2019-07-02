<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddProfileImageColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		 Schema::table('students', function (Blueprint $table) {
			 $table->string('profile_image')->after('notes')->nullable($value = true);
		 });

		 Schema::table('tutors', function (Blueprint $table) {
			 $table->string('profile_image')->after('notes')->nullable($value = true);
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
