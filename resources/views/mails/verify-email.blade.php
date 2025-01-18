<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Email Template</title>
	<link href="{{ asset('css/app.css') }}" rel="stylesheet">
	<style>
		/* Styles fallback pour les clients sans CSS avancé */
		body {
			margin: 0;
			padding: 0;
			background-color: #f9f9f9;
			font-family: Arial, sans-serif;
		}

		table {
			border-spacing: 0;
			width: 100%;
		}

		td {
			padding: 0;
		}

		.container {
			max-width: 600px;
			margin: 20px;
			background-color: #ffffff;
			border-radius: 8px;
			overflow: hidden;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		}

		.header {
			background-color: #5A3EE5;
			color: #ffffff;
			text-align: center;
			padding: 20px;
			font-size: 24px;
			font-weight: bold;
		}

		.content {
			padding: 20px;
			font-size: 16px;
			line-height: 1.5;
			color: #333333;
		}

		.button {
			display: inline-block;
			padding: 10px 20px;
			margin: 20px 0;
			background-color: #5A3EE5;
			color: #ffffff;
			text-decoration: none;
			border-radius: 5px;
			font-weight: semibold;
		}

		.footer {
			background-color: #f3f4f6;
			text-align: center;
			padding: 10px;
			font-size: 14px;
			color: #6b7280;
		}
	</style>
</head>

<body>
	<table>
		<tr>
			<td align="center">
				<div class="container">
					<!-- Header -->
					<div class="header">
						Bienvenue 👋
					</div>

					<!-- Content -->
					<div class="content">
						<p>
							Vous venez de vous inscrire sur {{ config('app.name') }}, merci de cliquer sur le bouton ci-dessous pour vérifier votre adresse email.
						</p>
						<a href="{{ route('register.complete', [
	'token' => $token]) }}" class="button">
							Vérifier mon adresse email
						</a>
					</div>

					<!-- Footer -->
					<div class="footer">
						&copy; {{ date('Y') }} {{ config('app.name') }}. Tous droits réservés.
					</div>
				</div>
			</td>
		</tr>
	</table>
</body>

</html>