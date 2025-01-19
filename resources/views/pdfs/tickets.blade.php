<!DOCTYPE html>
<html>

<head>
	<title>Billets</title>


	<style>
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}


		body {
			font-family: 'IntegralCF', sans-serif;
			font-size: 16px;
			background: #FEFFF6;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

		}

		body::before {
			content: '';
			position: abolsute;
			top: 0;
			left: 0;
			right: 0;
			height: 25px;
			background: #5A3EE5;
			z-index: 1;
		}

		body::after {
			content: '';
			position: abolsute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 25px;
			background: #5A3EE5;
			z-index: 1;
		}

		.ticket {
			text-align: center;
			padding: 4rem;
			color: black;
		}

		.ticket h1 {
			font-size: 24px;
			text-transform: uppercase;
			font-weight: 700;
		}

		.ticket p {
			font-size: 16px;
			padding: .25rem 0;
			font-weight: 400;
		}

		span,
		b {
			display: block;
			font-size: 14px;
			line-height: 1.5;
			opacity: .8;
		}

		.qr-code {
			display: block;
			text-align: center;
			margin: 2rem 0;

		}

		.bg-top {
			max-width: 400px;
			position: absolute;
			top: 0;
			right: 0;
			z-index: -1;
		}

		.bg-bottom {
			max-width: 400px;
			position: absolute;
			bottom: 0;
			left: -50px;
			z-index: -1;
			transform: rotate(90deg)
		}
	</style>
</head>

<body>
	<img src="{{ public_path('images/header-bg.png') }}" alt="background" class="bg-top">
	<img src="{{ public_path('images/footer-bg.png') }}" alt="background" class="bg-bottom">

	@foreach ($tickets as $ticket)
	<div class="ticket">
		<h1>{{ $ticket->ticket_name }}</h1> <!-- Remplacer "name" par "ticket_name" -->
		<p>{{ $ticket->event_name }}</p> <!-- Ajouter l'événement si pertinent -->
		<span>{{ $ticket->ticket_price }} €</span> <!-- Remplacer "price" par "ticket_price" -->
		<b>{{ $ticket->created_at }}</b> <!-- Date d'achat -->
		<div class="qr-code">
			<img src="data:image/png;base64,{{ base64_encode($ticket->qr_code) }}" alt="qr-code">
		</div>
	</div>
	@endforeach
</body>

</html>