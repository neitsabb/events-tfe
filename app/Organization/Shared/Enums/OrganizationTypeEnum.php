<?php

namespace App\Organization\Shared\Enums;

enum OrganizationTypeEnum: string
{
	case ASSOCIATION = 'association';
	case ENTERPRISE = 'entreprise';

	case COLLECTIF = 'collectif';
	case LABEL = 'label';


	case PARTICULIER = 'particulier';

	public static function toArray(): array
	{
		return array_column(OrganizationTypeEnum::cases(), 'value');
	}
}
