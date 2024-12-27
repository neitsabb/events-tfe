<?php

namespace App\Payment\Customer\Http\Controllers;

use App\Shared\Http\Controller;
use Inertia\Inertia;

class ShowSuccessPaymentController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {

        return Inertia::render('Payment/Admin/SuccessPayment');
    }
}
