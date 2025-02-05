<?php

namespace App\Http\Controllers;

use App\Models\Paquete;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class PaqueteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $packages = Paquete::select(['id','nombrePaquete', 'descripcionPaquete', 'remitente', 'horaLlegadaPaquete', 'usuarioRecibio'])->where('usuarioDestinatario', $userId)->get();

        return Inertia::render('Packages/Packages', compact('packages'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::select(['id', 'name'])->get();

        return Inertia::render('Packages/RegisterPackage', compact('users'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Gate::authorize('create', Paquete::class);

        $userId = $request->user()->id;

        $validated = $request->validate([
            'nombrePaquete' => 'required|min:3|max:100',
            'descripcionPaquete' => 'required|min:10|max:255',
            'remitente' => 'required|max:50',
            'usuarioDestinatario' => 'required|integer',
            'usuarioRecibio' => 'required|min:3|max:50',
            'horaLlegadaPaquete' => 'required|date'
        ]);

        $validated['usuarioRecepcion'] = $userId;

        Paquete::create($validated);

        return redirect(route('registrar'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Paquete $paquete)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Paquete $paquete)
    {
        //
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
