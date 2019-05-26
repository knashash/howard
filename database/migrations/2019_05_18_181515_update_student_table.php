<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateStudentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		 Schema::table('students', function (Blueprint $table) {
			 $table->string('phone_cell')->after('zip')->nullable($value = true);
			 $table->string('phone_home')->after('phone_cell')->nullable($value = true);
			 $table->date('dob')->after('phone_home')->nullable($value = true);
			 $table->text('country_of_origin')->after('dob')->nullable($value = true);
			 $table->text('first_language')->after('country_of_origin')->nullable($value = true);
			 $table->enum('ethnic_group', ['Black', 'White', 'Hispanic', 'Asian', 'Indigenous', 'Other'])->after('first_language')->nullable($value = true);
			 $table->enum('gender', ['M', 'F'])->after('ethnic_group')->nullable($value = true);
			 $table->enum('employment_status', ['PT', 'FT', 'Unemployed', 'Not In Labor Force'])->after('gender')->nullable($value = true);
			 $table->date('date_entry')->after('employment_status')->nullable($value = true);
			 $table->date('date_exit')->after('date_entry')->nullable($value = true);
			 $table->text('notes')->after('date_exit')->nullable($value = true);
			 $table->tinyInteger('active')->after('notes')->default(1);
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
