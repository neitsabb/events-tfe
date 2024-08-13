<?php

namespace App\Artists\Customer\Http\Controllers;

use App\Artists\Shared\Models\Artist;
use Inertia\Inertia;

use App\Shared\Http\Controller;

class ShowArtistsController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function __invoke()
	{
		return Inertia::render('Artists/Customer/Index/View', [
			'artists' => Artist::all()
		]);
	}
}
