<?php

namespace App\Imports;

use PhpOffice\PhpSpreadsheet\Shared\Date;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use App\Student;

class SecondSheetImport implements ToCollection
{

	/**
    * @param Collection $collection
    */
    public function collection(Collection $collection)
    {
		 foreach ($collection as $row)
		 {
			 //if (is_numeric($row[7])) print_r(Date::excelToDateTimeObject($row[3]));
			 //echo $row[3];
			 /*
		 	Tutor::create([
				 'name' => $row[0],
			 ]);*/
			 if (!empty($row[0]))
			 {
			 	if ($row[0] == 'Total Students') break;
			 	else
				{
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

					if ($name_array[0] == 'Name' || $name_array[1] == 'Name') continue;


					// dob
					$dob = null;
					if (!empty($row[11]) && is_numeric($row[11]))
					{
						$dob_obj = Date::excelToDateTimeObject($row[11]);
						$dob = $dob_obj->format('Y-m-d');
					}

					$country_of_origin = !empty($row[13]) ? $row[13] : null;
					$first_language = !empty($row[14]) ? $row[14] : null;

					$ethnic_group = null;
					if ($row[15] == 'x') $ethnic_group = 'Black';
					if ($row[16] == 'x') $ethnic_group = 'White';
					if ($row[17] == 'x') $ethnic_group = 'Hispanic';
					if ($row[18] == 'x') $ethnic_group = 'Asian';
					if ($row[19] == 'x') $ethnic_group = 'Indigenous';
					if ($row[20] == 'x') $ethnic_group = 'Other';

					// phone
					$phone_cell = null;
					$phone_home = null;
					if (!empty($row[21]))
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

					$city = !empty($row[22]) ? $row[22] : null;
					$zip = !empty($row[23]) ? $row[23] : null;
					$state = "IL";

					$gender = null;
					if ($row[25] == 'x') $gender = 'F';
					if ($row[24] == 'x') $gender = 'M';

					$employment_status = null;
					if ($row[26] == 'x') $employment_status = 'PT';
					if ($row[27] == 'x') $employment_status = 'FT';
					if ($row[28] == 'x') $employment_status = 'Not In Labor Force';
					if ($row[29] == 'x') $employment_status = 'Unemployed';

					$date_entry= null;
					if (!empty($row[30]) && is_numeric($row[30]))
					{
						$dob_obj = Date::excelToDateTimeObject($row[30]);
						$date_entry = $dob_obj->format('Y-m-d');
					}

					$date_exit= null;
					if (!empty($row[31]) && is_numeric($row[31]))
					{
						$dob_obj = Date::excelToDateTimeObject($row[31]);
						$date_exit = $dob_obj->format('Y-m-d');
					}

					$active = 0;
					if (!empty($row[35]) && $row[35] == "TRUE") $active = 1;

					Student::create([
						'first_name' => $first_name,
						'last_name' => $last_name,
						'city' => $city,
						'state' => $state,
						'zip' => $zip,
						'phone_home' => $phone_home,
						'phone_cell' => $phone_cell,
						'dob' => $dob,
						'employment_status' => $employment_status,
						'country_of_origin' => $country_of_origin,
						'first_language' => $first_language,
						'ethnic_group' => $ethnic_group,
						'gender' => $gender,
						'date_entry' => $date_entry,
						'date_exit' => $date_exit,
						'active' => $active,
					]);
				}
			 }
		 }
    }
}
