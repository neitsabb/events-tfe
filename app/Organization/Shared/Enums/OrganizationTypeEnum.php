<?php

namespace App\Organization\Shared\Enums;

enum OrganizationTypeEnum: string
{
	case ASSOCIATION = 'association';
	case ENTERPRISE = 'company';

	public static function toArray(): array
	{
		return array_column(OrganizationTypeEnum::cases(), 'value');
	}
}
