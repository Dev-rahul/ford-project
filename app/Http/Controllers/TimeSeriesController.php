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

        $measurements = TimeSeries::where('excel_id', $id)->get();
        $lastIndex = 0;

        $transformedData = [];

        // Determine the maximum number of time points
        $maxTimePoints = $measurements->max(function ($measurement) {
            return count($measurement['y']);
        });


        // Initialize structure for each time point
        for ($i = 0; $i < $maxTimePoints; $i++) {
            $transformedData[$i] = ['time' => $i];
        }

        // Populate the data for each time point from each measurement
        foreach ($measurements as $measurement) {
            if($measurement['status'] != 'unmarked') {
                $lastIndex++;
            }
            foreach ($measurement['y'] as $index => $value) {
                // Assuming 'x' represents a unique identifier for each measurement and is a string
                $transformedData[$index][$measurement['x']] = $value;
            }
        }
        // Return the data as JSON
        return response()->json(['data' => $transformedData, 'lastMarkedIndex' => $lastIndex]);

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
