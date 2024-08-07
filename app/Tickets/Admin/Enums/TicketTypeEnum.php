<?php

namespace App\Tickets\Admin\Enums;


enum TicketTypeEnum: string
{
	case ADMISSION = 'admission';
	case EXTRA = 'extra';

	public static function toArray(): array
	{
		return array_column(TicketTypeEnum::cases(), 'value');
	}
}
