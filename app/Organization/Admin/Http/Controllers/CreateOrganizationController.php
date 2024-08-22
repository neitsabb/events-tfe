<?php

namespace App\Organization\Admin\Http\Controllers;

use App\Organization\Admin\Http\Requests\CreateOrganizationRequest;
use App\Shared\Http\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;

class CreateOrganizationController extends Controller
{
	public function __invoke(CreateOrganizationRequest $request)
	{
		$request->user()->organizations()->create($request->validated());
		return Redirect::back();
	}
}
