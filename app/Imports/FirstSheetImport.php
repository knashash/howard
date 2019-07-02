<?php

namespace App\Imports;

use PhpOffice\PhpSpreadsheet\Shared\Date;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use App\Tutor;

class FirstSheetImport implements ToCollection
{
    /**
    * @param Collection $collection
    */
    public function collection(Collection $collection)
    {

    	foreach ($collection as $row)
		 {
			// tutor name

		 	if (!empty($row[0]) && is_string($row[0]))
			{
				$name_array = explode(' ',$row[0]);

				if (count($name_array)>1)
				{
					$first_name = $name_array[1];
					if (!empty($name_array[2])) $first_name.=" ".$name_array[2];
					if (!empty($name_array[3])) $first_name.=" ".$name_array[3];
					$first_name = str_replace(',','',$first_name);

					$last_name = $name_array[0];
					$last_name = str_replace(',','',$last_name);
				}
				else continue;
			}
			else continue;

			 // phone
			 $phone_cell = null;
			 $phone_home = null;
			 if (!empty($row[1]))
			 {
				// there is home cell entry
			 	if (stristr($row[1],'h'))
				{
					$matches=[];
					$phone_array = explode('h', $row[1]);
					$home_phone_num = preg_replace("/[^0-9,.]/", "", $phone_array[0]);
					if(  preg_match( '/^(\d{3})(\d{3})(\d{4})$/', $home_phone_num,  $matches ) )
					{
						$phone_home = $matches[1] . '-' .$matches[2] . '-' . $matches[3];
					}

					$matches=[];
					$cell_phone_num = preg_replace("/[^0-9,.]/", "", $phone_array[1]);
					if(  preg_match( '/^(\d{3})(\d{3})(\d{4})$/', $cell_phone_num,  $matches ) ) {
						$phone_cell = $matches[1] . '-' .$matches[2] . '-' . $matches[3];
					}
				}
				else
				{
					$phone_num = preg_replace("/[^0-9,.]/", "", $row[1]);

					if(  preg_match( '/^(\d{3})(\d{3})(\d{4})$/', $phone_num,  $matches ) )
					{
						$phone_cell = $matches[1] . '-' .$matches[2] . '-' . $matches[3];
					}
				}
			 }

			 // email
			 $email = null;
			 if (!empty($row[2]))
			 {
				 $email = $row[2];
			 }
			 else continue;

			 // dob
			 $dob = null;
			 if (!empty($row[3]) && is_numeric($row[3]))
			 {
				 $dob_obj = Date::excelToDateTimeObject($row[3]);
				 $dob = $dob_obj->format('Y-m-d');
			 }

			 // adddress
			 $address = !empty($row[5]) ? $row[5] : 'please update';
			 $city = !empty($row[6]) ? $row[6] : 'Chicago';
			 $state = !empty($row[7]) ? $row[7] : 'IL';
			 $zip = !empty($row[8]) ? $row[8] : '60626';

			 $ethnic_group = null;
			 if ($row[9] == 'x') $ethnic_group = 'Black';
			 if ($row[10] == 'x') $ethnic_group = 'White';
			 if ($row[11] == 'x') $ethnic_group = 'Hispanic';
			 if ($row[12] == 'x') $ethnic_group = 'Asian';
			 if ($row[13] == 'x') $ethnic_group = 'Indigenous';
			 if ($row[14] == 'x') $ethnic_group = 'Other';

			 $gender = null;
			 if ($row[15] == 'x') $gender = 'F';
			 if ($row[16] == 'x') $gender = 'M';

			 $date_entry= null;
			 if (!empty($row[17]) && is_numeric($row[17]))
			 {
				 $dob_obj = Date::excelToDateTimeObject($row[17]);
				 $date_entry = $dob_obj->format('Y-m-d');
			 }

			 $date_exit= null;
			 if (!empty($row[18]) && is_numeric($row[18]))
			 {
				 $dob_obj = Date::excelToDateTimeObject($row[18]);
				 $date_exit = $dob_obj->format('Y-m-d');
			 }

			 $active = 0;
			 if (!empty($row[30]) && $row[30] == "TRUE") $active = 1;

			 $student_string = !empty($row[33]) ? $row[33] : null;

			 $notes = null;
			 if (!empty($row[35])) $notes = $row[35];
			 if (!empty($row[36])) $notes .= ' '.$row[36];

			 //echo $first_name;

		 	$tutor = Tutor::create([
				 'first_name' => $first_name,
			 	 'last_name' => $last_name,
			 	'email' => $email,
				'address' => $address,
				'city' => $city,
				'state' => $state,
				'zip' => $zip,
				'phone_home' => $phone_home,
				'phone_cell' => $phone_cell,
				'dob' => $dob,
				'ethnic_group' => $ethnic_group,
				'gender' => $gender,
				'date_entry' => $date_entry,
				'date_exit' => $date_exit,
				'notes' => $notes,
				'active' => $active,
				'student_string' => $student_string,
			 ]);

		 }
    }
}
