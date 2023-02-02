<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class dummyAPI extends Controller
{
    //
    function getData()
    {
        return[
            "name"=>"May",
            "name"=>"May May"];
    }
    function getUsers()
    {
        return[
            "name"=>"May",
            "name"=>"May May"];
    }
}
