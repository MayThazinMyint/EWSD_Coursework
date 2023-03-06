<?php

namespace App\Http\Controllers;

use App\Mail\EWSDMailSender;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use App\Mail\TestEmailSender;
use Illuminate\Support\Facades\Log;

class EmailSenderController extends Controller
{
    public $name;
    public $email;

    public function __construct()
    {
    }

    public function sendEmail()
    {
        $this->name = "Vanzar"; //recipient name
        $this->email = "vanzar2017@gmail.com"; //recipient email id
        /**
         *creating an empty object of of stdClass
         *
         */
        $emailParams = new \stdClass();
        $emailParams->usersName = $this->name;
        $emailParams->usersEmail = $this->email;

        $emailParams->subject = "Testing Email sending feature";
        Mail::to($emailParams->usersEmail)->send(new EWSDMailSender($emailParams));
    }

    public function test()
    {
        $this->sendEmail();
    }
}
