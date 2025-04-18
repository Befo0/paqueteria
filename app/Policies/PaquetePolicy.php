<?php

namespace App\Policies;

use App\Models\Paquete;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PaquetePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): Response
    {
        return $user->idRol === 2 || $user->idRol === 1 ? Response::allow() : Response::deny('Necesitas permisos para acceder a esta pagina') ;
    }

    /**
     * Determine whether a user can view the page
     */
    public function view(User $user): Response
    {
        return $user->idRol === 1 || $user->idRol === 3 ? Response::allow() : Response::deny('Solo usuarios pueden recibir paquetes');
    }

    /**
     * Determine whether a user can view the eliminated packages
     */
    public function eliminated(User $user): Response
    {
        return $user->idRol === 1 ? Response::allow() : Response::deny('No tienes permisos para acceder a esta pagina');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): Response
    {
        return $user->idRol === 1 || $user->idRol === 2 ? Response::allow() : Response::deny('No estas autorizado para registrar paquetes');
    }

    /**
     * Determine whether the user can mark a package as received
     */
    public function receive(User $user, Paquete $paquete): Response
    {
        return $user->id === $paquete->usuarioDestinatario ? Response::allow() : Response::deny('Este paquete no esta dirigido a este usuario');
    }

    /**
     * Determine whether a user can change how he will receive the package
     */
    public function deliver(User $user, Paquete $paquete): Response
    {
        return $this->receive($user, $paquete);
    }

    /**
     * Determine whether a user can change the person that delivers the package
     */
    public function updateDeliver(User $user, Paquete $paquete): Response
    {
        return $user->id === $paquete->usuarioRecepcion || $user->idRol === 1 ? Response::allow() : Response::deny('No tienes permiso para realizar esta acción');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Paquete $paquete): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Paquete $paquete): Response 
    {
        return $user->idRol === 1 && $paquete->estadoPaquete === 1 && empty($paquete->estadoEntrega) ? Response::allow() : Response::deny('No se puede eliminar el paquete');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Paquete $paquete): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Paquete $paquete): bool
    {
        return false;
    }
}
