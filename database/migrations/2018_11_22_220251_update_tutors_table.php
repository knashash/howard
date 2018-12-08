<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateTutorsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('tutors', function (Blueprint $table) {
			$table->string('phone_cell')->after('zip')->nullable($value = true);
			$table->string('phone_home')->after('phone_cell')->nullable($value = true);
			$table->string('dob')->after('phone_home')->nullable($value = true);
			$table->enum('ethnic_group', ['Black', 'White', 'Hispanic', 'Asian', 'Indigenous', 'Other'])->after('dob')->nullable($value = true);
			$table->enum('gender', ['M', 'F'])->after('ethnic_group')->nullable($value = true);
			$table->date('date_entry')->after('gender')->nullable($value = true);
			$table->date('date_exit')->after('date_entry')->nullable($value = true);
			$table->datetime('notes')->after('date_exit')->nullable($value = true);
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
