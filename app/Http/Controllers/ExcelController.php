<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Rap2hpoutre\FastExcel\FastExcel;
use App\Models\TimeSeries;


class ExcelController extends Controller
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
        //
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

    public function upload(Request $request)
    {
        // Validate the file upload
        $request->validate([
            'file' => 'required|file|mimes:csv,txt,xlsx,xls,pdf|max:200048', // Example validation rules
        ]);

        if ($request->file('file')->isValid()) {
            // Store the uploaded file

            
            $myExcel = $request->file('file');
            $rowData = [];

            // Parse and store data from the uploaded Excel file
            (new FastExcel)->sheet(1)->import($myExcel, function ($line) use (&$rowData) {
                // Collect each row's data into the $rowData array
                $rowArray = [];

                foreach ($line as $item) {
                    // Add each item to the row array
                    array_push( $rowArray, $item);
                }
                $rowData[] = [
                    'x' => $rowArray, // Assuming 'x' is in the second column
                    'y' => 'ds', // Assuming 'y' is in the third column
                    // Add more fields as needed
                ];
            });

            //$collection = (new FastExcel)->import($request->file('file'));

            // foreach ($collection->getSheetIterator() as $sheet) {
            //     // only read data from "summary" sheet
            //     if ($sheet->getName() === 'data') {
            //         foreach ($sheet->getRowIterator() as $row) {
            //             // do something with the row
            //         }
            //         break; // no need to read more sheets
            //     }
            // }
            
            $path = $request->file('file')->store('uploads');

            //$path = $file->storeAs('public/excels', $filename);
            // Optionally, you can also store additional information about the file in your database
            // For example:
            // $file = File::create(['path' => $path, 'user_id' => auth()->id()]);

            return response()->json(['message' => 'File uploaded successfully', 'path' => $rowData], 200);
        } else {
            return response()->json(['message' => 'Invalid file'], 400);
        }
    }
}
