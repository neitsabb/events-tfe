<?php

namespace App\User\Mail;

use App\User\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class VerifyEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public string $token)
    {
        //
    }

    public function build()
    {
        return $this->view('mails.verify-email')->with([
            'token' => $this->token,
        ])->subject('Vérification de l\'adresse e-mail');
    }
}
