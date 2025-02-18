<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePaqueteRequest;
use App\Mail\NewPaquete;
use App\Models\Paquete;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PaqueteController extends Controller
{

    public function packages(User $user, int $state)
    {
        $packages = [];

        if ($user && ($user->idRol == '1' || $user->idRol == '2')) {
            $userId = $user->id;

            if ($userId) {
                $packages = Paquete::select(['id', 'nombrePaquete', 'descripcionPaquete', 'remitente', 'horaLlegadaPaquete', 'usuarioRecibio', 'estadoEntrega'])->where('usuarioDestinatario', $userId)->where('estadoPaquete', $state)->paginate(5);
            }
        }

        return $packages;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        Gate::authorize('view', Paquete::class);

        $user = $request->user();
        
        $paquete = $this->packages($user, 1);

        return Inertia::render('Packages/Packages', [
            'registeredPackages' => $paquete
        ]);
    }

    /**
     * Display a view of the new registered package
     */
    public function paquete(Paquete $paquete)
    {
        Gate::authorize('view', Paquete::class);

        return Inertia::render('Packages/DeliverPackage', [
            'newPackage' => [
                'id' => $paquete->id,
                'titulo' => $paquete->nombrePaquete,
                'remitente' => $paquete->remitente,
                'destinatario' => $paquete->usuarioDestinatario,
                'recepcion' => $paquete->usuarioRecepcion,
                'entrega' => $paquete->estadoEntrega,
            ]
        ]);
    }

    /**
     * Displays a list of the Registered Packages
     */
    public function list(Request $request)
    {

        Gate::authorize('viewAny', Paquete::class);

        $userId = $request->user()->id;
        $userRole = $request->user()->idRol;

        $paquete = Paquete::select([
            'paquetes.id',
            'paquetes.nombrePaquete',
            'paquetes.remitente',
            'paquetes.usuarioRecibio',
            'paquetes.estadoEntrega',
            'users.name as usuarioNombre'
        ])
            ->join('users', 'users.id', '=', 'paquetes.usuarioDestinatario')
            ->where('estadoPaquete', 1)->whereNull('estadoEntrega');

        if ($userRole == '2') {
            $paquete = $paquete->where('usuarioRecepcion', $userId);
        }

        $paquete = $paquete->orderBy('horaLlegadaPaquete', 'desc')->paginate(5);


        return Inertia::render('Packages/ListPackages', [
            'registeredPackages' => $paquete
        ]);
    }

    /**
     * Shows the eliminated packages
     */
    public function eliminated(Request $request)
    {
        Gate::authorize('eliminated', Paquete::class);

        $user = $request->user();

        $paquete = $this->packages($user, 3);

        return Inertia::render('Packages/Packages', [
            'registeredPackages' => $paquete
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('viewAny', Paquete::class);

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
    public function deliver(Request $request, Paquete $paquete, $estado)
    {

        Gate::authorize('deliver', $paquete);

        $changes = [
            'estadoEntrega' => $estado
        ];

        if ($estado == '1') {
            $changes['usuarioRecibio'] = $request->user()->name;
        }

        $paquete->update($changes);

        return redirect(route('paquete.registrado', $paquete->id));
    }

    /**
     * Update the name of the person that delivers the package
     */
    public function sentPackage(Paquete $paquete, Request $request)
    {

        Gate::authorize('updateDeliver', $paquete);

        $validated = Validator::make($request->all(), [
            'usuarioRecibio' => 'required|min:3|max:50'
        ], $messages = [
            'usuarioRecibio.required' => 'Debes de poner el nombre de quien entrega el paquete',
            'usuarioRecibio.min' => 'El nombre debe de ser de al menos 3 caracteres',
            'usuarioRecibio.max' => 'El nombre debe de ser de maximo 50 caracteres'
        ])->validate();

        $paquete->update($validated);

        return redirect(route('registro.paquetes'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Paquete $paquete)
    {
        Gate::authorize('delete', $paquete);

        $paquete->update([
            'estadoPaquete' => 3,
        ]);

        return redirect(route('registro.paquetes'));
    }
}
