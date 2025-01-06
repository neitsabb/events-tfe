<?php

namespace App\Organization\Admin\Http\Controllers;

use App\Organization\Shared\Models\Organization;
use App\Organization\Shared\Resources\OrganizationResource;
use App\Shared\Http\Controller;
use App\Shared\Services\StripeService;

class ShowOrganizationSettingsController extends Controller
{
	protected $model = Organization::class;
	protected $viewPath = 'Organizations/Admin/Settings/';
	protected $panels = ['general', 'team', 'banking'];
	protected $resource = OrganizationResource::class;

	public function __invoke($panel = 'general')
	{
		$status = app(StripeService::class)->getVerificationStatus(session('selected_organization')->stripe_account_id);

		return $this->handlePanel(panel: $panel, data: [
			'required_actions' => !empty($status['currently_due']),
		]);
	}
}
