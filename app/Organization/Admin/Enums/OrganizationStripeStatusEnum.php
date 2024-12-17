<?php

namespace App\Organization\Admin\Enums;

enum OrganizationStripeStatusEnum: string
{
	case COMPLETE = 'complete';
	case INCOMPLETE = 'incomplete';

	public static function toArray(): array
	{
		return array_column(OrganizationStripeStatusEnum::cases(), 'value');
	}
}
