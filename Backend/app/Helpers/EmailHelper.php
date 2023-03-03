<?php

namespace App\Helpers;

use App\Mail\EWSDMailSender;
use Illuminate\Support\Facades\Mail;

class EmailHelper
{

    public static function sendEmail($name, $subject, $receiptEmail, $description)
    {
        $emailParams = new \stdClass();
        $emailParams->usersName = $name;
        $emailParams->usersEmail = $receiptEmail;
        $emailParams->description = $description;

        $emailParams->subject = $subject;
        Mail::to($emailParams->usersEmail)->send(new EWSDMailSender($emailParams));
    }
}
