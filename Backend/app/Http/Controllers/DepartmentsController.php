<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\StoreDepartmentsRequest;
use App\Http\Requests\UpdateDepartmentsRequest;

class DepartmentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //Get all department list
        $departments = Department::all();

        // Return Json Response
        return response()->json([
            'data' => $departments,
            'message' => "SUCCESS"
        ], 200);
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreDepartmentsRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreDepartmentsRequest $request)
    {
        $data = "";
        $message = "";
        $responseCode = 200;

        try {

            // Check new department code already exists
            $count = Department::where('department_code', $request->department_code)->count();
            if ($count > 0) {

                $data = $request->department_code;
                $message = "DUPLICATE";
                $responseCode = 403;
            } else {
                //Add new department
                $dept = Department::create([
                    'department_code' => $request->department_code,
                    'department_description' => $request->department_description,
                    'created_date' => date('Y-m-d H:i:s')
                ]);

                $data = $dept->department_id;
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
     * Display the specified resource.
     *
     * @param  \App\Models\Departments  $departments
     * @return \Illuminate\Http\Response
     */
    // public function show(Departments $departments)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateDepartmentsRequest  $request
     * @param  \App\Models\Departments  $departments
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateDepartmentsRequest $request, $id)
    {
        $data = $id;
        $message = "SUCCESS";
        $responseCode = 200;

        try {
            // Find Department
            $department = Department::find($id);
            if (!$department) {
                $data = $id;
                $message = "NOT_FOUND";
                $responseCode = 404;
            } else {
                // Check new department code already exists
                if (Department::where('department_code', $request->department_code)->count() > 0) {
                    $data = $request->department_code;
                    $message = "DUPLICATE";
                    $responseCode = 302;
                } else {
                    $department->department_code = $request->department_code;
                    $department->department_description = $request->department_description;
                    $department->updated_date = date('Y-m-d H:i:s');

                    // Update Department 
                    $department->save();
                }
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
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Departments  $departments
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = "";
        $message = "";
        $responseCode = 200;
        try {
            // Find Department
            $department = Department::find($id);
            if (!$department) {
                $data = $id;
                $message = "NOT_FOUND";
                $responseCode = 404;
            } else {

                if(User::where('department_id',$id)->count() > 0){
                    $data = $id;
                    $message = "DATA_IN_USE";
                    $responseCode = 406;
                }
                else{
                    //Delete Department
                    $department->delete();
                    $data = $department->department_id;
                    $message = "SUCCESS";
                    $responseCode = 200;
                }

                
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
