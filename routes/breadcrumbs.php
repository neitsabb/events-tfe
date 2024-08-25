<?php // routes/breadcrumbs.php

use App\Events\Shared\Models\Event;
use Diglactic\Breadcrumbs\Breadcrumbs;

use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

// Dashboard
Breadcrumbs::for('dashboard', function (BreadcrumbTrail $trail) {
	$trail->push('Dashboard', route('dashboard'));
});

// Dashboard > Organizations > Settings
Breadcrumbs::for('organizations.settings', function (BreadcrumbTrail $trail) {
	$trail->parent('dashboard');
	$trail->push("Paramètres de l'organization", route('organizations.settings'));
});

// Dashboard > Events > [Event]
Breadcrumbs::for('events.show', function (BreadcrumbTrail $trail, $event) {
	$trail->parent('dashboard');
	$trail->push(Event::find($event)?->name, route('events.show', $event));
});

// Dashboard > Events > [Event] > Tickets
Breadcrumbs::for('events.tickets', function (BreadcrumbTrail $trail, $event) {
	$trail->parent('events.show', $event);
	$trail->push('Tickets', route('events.tickets', $event));
});

// Dashboard > Events > [Event] > Settings
Breadcrumbs::for('events.settings', function (BreadcrumbTrail $trail, $event) {
	$trail->parent('events.show', $event);
	$trail->push('Paramètres', route('events.settings', $event));
});
