<?php

namespace App\Observers;

use App\Models\Paquete;

class PaqueteObserver
{
    /**
     * Handle the Paquete "created" event.
     */
    public function creating(Paquete $paquete): void
    {
        $paquete->estadoPaquete = 1;
    }

    /**
     * Handle the Paquete "updated" event.
     */
    public function updated(Paquete $paquete): void
    {
        //
    }

    /**
     * Handle the Paquete "deleted" event.
     */
    public function deleted(Paquete $paquete): void
    {
        //
    }

    /**
     * Handle the Paquete "restored" event.
     */
    public function restored(Paquete $paquete): void
    {
        //
    }

    /**
     * Handle the Paquete "force deleted" event.
     */
    public function forceDeleted(Paquete $paquete): void
    {
        //
    }
}
