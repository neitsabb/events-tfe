<!DOCTYPE html>
<html>

<head>
	<title>Verify Your Email</title>
</head>

<body>
	<h1>Verify Your Email</h1>
	<p>Please click the link below to verify your email:</p>
	<a href="{{ route('customer.auth.complete', [
	'token' => $token]) }}">Verify Email</a>
	<p>If you did not request this, please ignore this email.</p>
</body>

</html>