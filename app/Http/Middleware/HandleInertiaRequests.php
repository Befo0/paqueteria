<?php

namespace App\Http\Middleware;

use App\Models\Paquete;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        $packages = [];

        if($user && ($user->idRol == '1' || $user->idRol == '2'))
        {
            $userId = $user->id;

            if($userId){
                $packages = Paquete::select(['id','nombrePaquete', 'descripcionPaquete', 'remitente', 'horaLlegadaPaquete', 'usuarioRecibio'])->where('usuarioDestinatario', $userId)->where('estadoPaquete', 1)->paginate(5);
            }
        }

        return array_merge(
            parent::share($request),[
            'auth' => [
                'user' => $request->user(),
            ],
            'packages' => $packages
        ]);
    }
}
