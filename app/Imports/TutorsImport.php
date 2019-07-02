<?php

namespace App\Imports;

use App\Tutor;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class TutorsImport implements WithMultipleSheets
{
	public function sheets(): array
	{
		return [
			new FirstSheetImport(),
			new SecondSheetImport(),
		];
	}
}
