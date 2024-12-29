<!DOCTYPE html>
<html>

<head>
	<title>Billet - {{ $ticket_name }}</title>


	<style>
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}


		body {
			font-family: 'IntegralCF', sans-serif;
			font-size: 16px;
			background: #5A3EE5;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

		}

		.ticket {
			text-align: center;
			padding: 4rem;
			color: #fff;
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
			max-width: 200px;
			position: absolute;
			top: 0;
			right: 0;
			z-index: -1;
		}

		.bg-bottom {
			max-width: 200px;
			position: absolute;
			bottom: 0;
			left: -50px;
			z-index: -1;
			transform: rotate(90deg)
		}
	</style>
</head>

<body>
	<img
		src="{{ public_path('images/header-bg.png') }}"
		alt="background"
		class="bg-top">
	<img
		src="{{ public_path('images/footer-bg.png') }}"
		alt="background"
		class="bg-bottom">
	<div class="ticket">
		<h1>{{ $ticket_name }} {{ $ticket_price }} € </h1>
		<p>{{ $event_name }}</p>
		<div class="qr-code">
			<img src="data:image/png;base64, {!! base64_encode(SimpleSoftwareIO\QrCode\Facades\QrCode::format('png')->size(200)->generate($qr_code)) !!}" alt="QR Code">
		</div>
		<span>Acheté le {{ \Carbon\Carbon::parse($created_at)->format('d/m/Y') }} à {{ \Carbon\Carbon::parse($created_at)->format('H:i') }}</span>
		<b>{{ $qr_code }}</b>
	</div>
</body>

</html>