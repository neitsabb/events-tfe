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
		if ($stripeId = session('selected_organization')->stripe_account_id) {
			$status = cache()->remember("stripe_verification_status_{$stripeId}", 3600, function () use ($stripeId) {
				return app(StripeService::class)->getVerificationStatus($stripeId);
			});
		}


		return $this->handlePanel(panel: $panel, data: [
			'required_actions' => !empty($status['currently_due']),
		]);
	}
}
