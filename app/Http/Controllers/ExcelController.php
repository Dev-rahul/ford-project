<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

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
            'file' => 'required|file|mimes:csv,txt,xlsx,xls,pdf|max:2048', // Example validation rules
        ]);

        if ($request->file('file')->isValid()) {
            // Store the uploaded file
            $path = $request->file('file')->store('uploads');

            //$path = $file->storeAs('public/excels', $filename);
            // Optionally, you can also store additional information about the file in your database
            // For example:
            // $file = File::create(['path' => $path, 'user_id' => auth()->id()]);

            return response()->json(['message' => 'File uploaded successfully', 'path' => $path], 200);
        } else {
            return response()->json(['message' => 'Invalid file'], 400);
        }
    }
}
