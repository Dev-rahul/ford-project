<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TimeSeries;
use App\Models\Excel;

class TimeSeriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

              // Fetch the data from the specified collection
              $measurements = TimeSeries::where('excel_id', $id)->get();
              $lastIndex = 0;
      
              $transformedData = [];
      
              // Populate the data for each time point from each measurement
              foreach ($measurements as $measurement) {
                $lastIndex++;
                //   if($measurement['status'] != 'unmarked') {
                //       $lastIndex++;
                //   }
                  $measurementData = []; 
                  foreach ($measurement['y'] as $index => $value) {
                    // This will store the current measurement's data points
                    // Assuming 'x' represents a unique identifier for each measurement and is a string
                      $measurementData[]= (object) [
                        'x' => $index, // Assuming $index represents the time point
                        'y' => $value, // The value at the time point
                    ];

                  }
                  array_push($transformedData, $measurementData);
                

              }
              return response()->json(['data' => $transformedData, 'lastMarkedIndex' => $lastIndex]);




              // Return the data as JSON


    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
