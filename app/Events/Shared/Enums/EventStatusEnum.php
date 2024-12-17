<?php

namespace App\Events\Shared\Enums;


enum EventStatusEnum: string
{
	case DRAFT = 'draft';
	case PUBLISHED = 'published';
	case ARCHIVED = 'archived';
	case NOT_CONFIGURED = 'not_configured';

	public static function toArray(): array
	{
		return array_column(EventStatusEnum::cases(), 'value');
	}
}
