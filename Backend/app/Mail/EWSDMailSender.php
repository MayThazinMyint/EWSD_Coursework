<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Config;


class EWSDMailSender extends Mailable
{
    use Queueable, SerializesModels;

    private $emailParams;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($params)
    {
        $this->emailParams = $params;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $this->from(Config::get('app.senderEmail'), Config::get('app.senderName'))
            ->subject($this->emailParams->subject)
            ->view('emails.mail')
            ->with(['emailParams' => $this->emailParams]);
    }
}
