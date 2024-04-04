<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TimeSeries;
use Rap2hpoutre\FastExcel\FastExcel;



class TimeSeriesCollectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $timeSeriesData = new TimeSeries();
        $timeSeriesData->x = [1,2,3,4];
        $timeSeriesData->y = [5,8,6,9];
        $timeSeriesData->status = 'TA';
        $timeSeriesData->save();


        $timeSeriesData = (new FastExcel)->import('995.xlsx', function ($line) {
            return TimeSeries::create([
                'x' => $line['Name'],
                'y' => $line['Email']
            ]);
        });
    }
}
