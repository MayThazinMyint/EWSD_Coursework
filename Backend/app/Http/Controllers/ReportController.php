<?php

namespace App\Http\Controllers;

use App\Models\AcademicYear;
use App\Models\Ideas;
use Illuminate\Http\Request;
use ZipArchive;
use League\Csv\Writer;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function downloadZipFile(Request $request)
    {
        $zip = new ZipArchive;

        $academic_years = AcademicYear::where('academic_id', "=", $request->academic_id)->first();

        $fileName = $academic_years->academic_year_code . ".zip";

        if ($zip->open(public_path($fileName), ZipArchive::CREATE) === TRUE) {
            $files = \File::files(public_path($academic_years->academic_year_code));

            foreach ($files as $key => $value) {
                $file = basename($value);
                $zip->addFile($value, $file);
            }

            $zip->close();
        }

        return response()->download(public_path($fileName))->deleteFileAfterSend(true);
    }

    public function summaryListing()
    {
        $date = date('Y-m-d');

        $summaryList = AcademicYear::select('academic_year_code')->where('is_active', 1)->where('final_closure_date', '<', $date)->get();
        //print_r($summaryList);
        return response()->json([
            'data' => $summaryList,
            'message' => "SUCCESS"
        ], 200);
    }

    public function exportCSV($academic_id)
    {
        $csv = Writer::createFromFileObject(new \SplTempFileObject());
        $data = Ideas::select('idea_description', 'categories.category_code', 'users.user_name', 'is_anonymous')
            ->join('categories', 'categories.category_id', '=', 'ideas.category_id')
            ->join('users', 'users.id', '=', 'ideas.user_id')
            ->where('ideas.academic_id', $academic_id)
            ->get();
        //var_dump($exportVars);

        $csv->insertOne(['Idea Description', 'Category', 'User', 'Is Anonymous']);
        foreach ($data as $var) {
            $csv->insertOne($var->toArray());
        }

        //Generate File Name with Academic Year Id
        $academic_years = AcademicYear::where('academic_id', "=", $academic_id)->first();

        $fileName = $academic_years->academic_year_code . ".csv";

        $csv->output($fileName);
        die;
    }
    public function categoriesByDepartmentView()
    {
        $data = "";
        $message = "Success";
        $responseCode = 200;
        try {
            $data = DB::table('categories_by_department_vw')->get();
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
