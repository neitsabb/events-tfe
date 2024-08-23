<?php

namespace App\Organization\Admin\Http\Controllers;

use App\Organization\Shared\Models\Organization;
use App\Organization\Shared\Resources\OrganizationResource;
use App\Shared\Http\Controller;


class ShowOrganizationSettingsController extends Controller
{
	protected $model = Organization::class;
	protected $viewPath = 'Organizations/Admin/Settings/';
	protected $panels = ['general', 'team'];
	protected $resource = OrganizationResource::class;

	public function __invoke($panel = 'general')
	{
		return $this->handlePanel(panel: $panel);
	}
}
