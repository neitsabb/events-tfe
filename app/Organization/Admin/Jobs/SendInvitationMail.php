<?php

namespace App\Organization\Admin\Jobs;

use App\Organization\Admin\Mail\InvitationMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendInvitationMail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public string $email,
        public string $token,
        public string $organizationName
    ) {}

    /**
     * Execute the job.
     */
    public function handle()
    {
        Mail::to($this->email)
            ->send(
                new InvitationMail($this->token, $this->organizationName)
            );
    }
}
