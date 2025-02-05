<?php

namespace App\Http\Controllers;

use App\Models\Paquete;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PaqueteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::select(['id', 'name'])->get();

        return Inertia::render('RegisterPackage', compact('users'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $userId = $request->user()->id;

        $validated = $request->validate([
            'nombrePaquete' => 'required|max:100',
            'descripcionPaquete' => 'required|max:255',
            'remitente' => 'required|max:50',
            'usuarioDestinatario' => 'required|integer',
            'usuarioRecibio' => 'required|max:50',
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
