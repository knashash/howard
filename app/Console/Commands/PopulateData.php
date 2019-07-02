<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Imports\TutorsImport;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\DB;

class PopulateData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:populate_data';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        //
		 if (Storage::disk('local')->exists("/avl.xlsx")) echo "it exists";
		 else echo "cant find it";

		 DB::statement('SET FOREIGN_KEY_CHECKS=0');
		 DB::table('tutors')->truncate();
		 DB::table('students')->truncate();
		 DB::table('match_location_assocs')->truncate();
		 DB::table('match_meeting_details')->truncate();
		 DB::table('session_match_assocs')->truncate();
		 DB::table('sessions')->truncate();
		 DB::table('tutor_student_assocs')->truncate();


		 Excel::import(new TutorsImport, 'avl.xlsx');
    }
}
