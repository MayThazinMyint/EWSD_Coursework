<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Ideas;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::where('is_active', 1)->get();

        // Return Json Response
        return response()->json([
            'data' => $categories,
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
            // Check new category code already exists
            $count = Category::where('category_code', $request->category_code)->count();
            if ($count > 0) {
                $data = $request->category_code;
                $message = "DUPLICATE";
                $responseCode = 403;
            } else {
                //Add new category
                $category = Category::create([
                    'category_code' => $request->category_code,
                    'category_type' => $request->category_type,
                    'is_active' => 1,
                    'created_date' => date('Y-m-d H:i:s')
                ]);

                $data = $category->category_id;
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
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $data = $id;
        $message = "SUCCESS";
        $responseCode = 200;

        try {
            // Find Category
            $category = Category::find($id);
            if (!$category) {
                $data = $id;
                $message = "NOT_FOUND";
                $responseCode = 404;
            } else {
                $idea = Ideas::where('category_id', $id)->count();
                if($idea > 0) {
                    $data = $id;
                    $message = "Ideas are posted in this cateogry";
                    $responseCode = 406;
                } else {
                    // Update Is_Active to 0 and updated date to current date
                    $category->is_active = 0;
                    $category->updated_date = date('Y-m-d H:i:s');
                    // Update 
                    $category->save();
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
