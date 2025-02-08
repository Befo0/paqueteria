<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use App\Observers\PaqueteObserver;

#[ObservedBy([PaqueteObserver::class])]
class Paquete extends Model
{
    protected $fillable = [
        'nombrePaquete',
        'descripcionPaquete',
        'usuarioDestinatario',
        'usuarioRecepcion',
        'remitente',
        'horaLlegadaPaquete',
        'usuarioRecibio',
        'estadoPaquete',
        'horaRecibidaPaquete',
    ];
}
