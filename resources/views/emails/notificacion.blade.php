<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Nuevo Paquete</title>
</head>
<body>
    <h1 style="margin: 2rem 0;">Has recibio un nuevo paquete en recepción!</h1>

    <a style="margin: 2rem 0;" href="{{ route('paquete.registrado', $paquete->id) }}">Entra al siguiente link para ver el proceso de entrega.</a>
</body>
</html>