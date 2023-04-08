<?php

namespace App\Http\Controllers;

use App\Models\AcademicYear;
use Illuminate\Http\Request;

class AcademicYearController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $academic_years = AcademicYear::where('is_active', 1)->get();

        // Return Json Response
        return response()->json([
            'data' => $academic_years,
            'message' => "SUCCESS"
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = "";
        $message = "";
        $responseCode = 200;
        try {
            // Check new Academic code already exists
            $count = AcademicYear::where('academic_year_code', $request->academic_year_code)->count();
            if ($count > 0) {
                $data = $request->academic_year_code;
                $message = "DUPLICATE";
                $responseCode = 403;
            } else {
                //Add new Academic
                $academic_year = AcademicYear::create([
                    'academic_year_code' => $request->academic_year_code,
                    'academic_year' => $request->academic_year,
                    'academic_sdate' => $request->academic_sdate,
                    'academic_edate' => $request->academic_edate,
                    'final_closure_date' => $request->final_closure_date,
                    'is_active' => 1,
                    'created_date' => date('Y-m-d H:i:s')
                ]);

                $data = $academic_year->academic_id;
                $message = "SUCCESS";
                $responseCode = 200;
            }
        } catch (\Throwable $th) {

            $data = "UNEXPECTED_ERROR";
            $message = $th->getMessage();
            $responseCode = 500;
        }

        return response()->json([
            'data' => $data,
            'message' => $message
        ], $responseCode);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AcademicYear  $academic_year
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $data = $id;
        $message = "SUCCESS";
        $responseCode = 200;

        try {
            // Find Academic Year
            $academic_year = AcademicYear::find($id);
            if (!$academic_year) {
                $data = $id;
                $message = "NOT_FOUND";
                $responseCode = 404;
            } else {
                // Update Is_Active to 0 and updated date to current date
                $academic_year->is_active = 0;
                $academic_year->updated_date = date('Y-m-d H:i:s');
                // Update 
                $academic_year->save();
            }
        } catch (\Throwable $th) {
            $data = "UNEXPECTED_ERROR";
            $message = $th->getMessage();
            $responseCode = 500;
        }
        return response()->json([
            'data' => $data,
            'message' => $message
        ], $responseCode);
    }
}
