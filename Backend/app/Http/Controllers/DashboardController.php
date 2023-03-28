<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\DB;


class DashboardController extends Controller
{
    private $queryIdeasByDept = "select * from ideas_by_department_vw";

    public function ideasByDept()
    {
        try {
            $data = DB::select($this->queryIdeasByDept);
            if (is_null($data)) {
                $data = "";
                $message = "NOT FOUND";
                $responseCode = 404;
                goto RETURN_STATEMENT;
            } else {
                $data = $data;
                $message = "SUCCESS";
                $responseCode = 200;
                goto RETURN_STATEMENT;
            }
        } catch (\Throwable $th) {
            $data = "UNEXPECTED_ERROR";
            $message = $th->getMessage();
            $responseCode = 500;
        }
        RETURN_STATEMENT:
        // Return Json Response
        return response()->json([
            'data' => $data,
            'message' => $message
        ], $responseCode);    
    }
}
