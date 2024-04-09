<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TimeSeries;
use App\Models\Excel;
 
//use Rap2hpoutre\FastExcel\FastExcel;
//use Maatwebsite\Excel\Facades\Excel;
//use App\Imports\TimeSeriesImport;




class TimeSeriesCollectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $timeSeriesData = new TimeSeries();
        // $timeSeriesData->x = [1,2,3,4];
        // $timeSeriesData->y = [5,8,6,9];
        // $timeSeriesData->status = 'TA';
        // $timeSeriesData->save();

        $excelData = new Excel();
        $excelData->name = 'test';
        $excelData->save();



        //Excel::import(new TimeSeriesImport, '995.xlsx');

        // $timeSeriesData = (new FastExcel)->import('995.xlsx', function ($line) {
            
        //     $model  = new TimeSeries();
        //     $model->x = $line[1] ; // Increment value before assigning
        //     $model->y = $line[2]; // Assign 'y' from the third row
        //     $model->save();
        // });
    }
}
