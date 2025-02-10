<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePaqueteRequest;
use App\Mail\NewPaquete;
use App\Models\Paquete;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class PaqueteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Packages/Packages');
    }

    /**
     * Display a view of the new registered package
     */
    public function paquete(Paquete $paquete)
    {
        return Inertia::render('Packages/DeliverPackage',[
            'newPackage' => [
                'id' => $paquete->id,
                'titulo' => $paquete->nombrePaquete,
                'remitente' => $paquete->remitente,
                'destinatario' => $paquete->usuarioDestinatario,
                'recepcion' => $paquete->usuarioRecepcion,
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::select(['id', 'name'])->where('idRol', '!=', '2')->get();

        return Inertia::render('Packages/RegisterPackage', compact('users'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePaqueteRequest $request)
    {
        Gate::authorize('create', Paquete::class);

        $userId = $request->user()->id;

        $validated = $request->validated();
        $validated['usuarioRecepcion'] = $userId;

        $paquete = Paquete::create($validated);
        
        $userEmail = User::select('email')->where('id', $validated['usuarioDestinatario'])->get()[0]['email'];
        Mail::to($userEmail)->send(new NewPaquete($paquete));

        return redirect(route('registrar'));
    }

    public function receivedPackage(Paquete $paquete)
    {
        Gate::authorize('receive', $paquete);

        $paquete->update([
            'estadoPaquete' => 2,
            'horaRecibidaPaquete' => now()->toDateTimeString(),
        ]);

        return redirect(route('paquetes.mostrar'));
    }

    /**
     * Update the deliver state of the package
     */
    public function deliver(Request $request, Paquete $paquete, $estado){
        
        Gate::authorize('deliver', $paquete);

        $changes = [
            'estadoEntrega' => $estado
        ];

        if($estado == '1'){
            $changes['usuarioRecibio'] = $request->user()->name;
        }

        $paquete->update($changes);

        return redirect(route('paquetes.mostrar'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Paquete $paquete)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Paquete $paquete)
    {
        //
    }
}
