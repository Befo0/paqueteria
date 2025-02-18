<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\PaqueteController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('/index.php/inicio');
});

Route::get('/inicio', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('main');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::middleware('auth')->group(function () {
    Route::get('/registrar', [PaqueteController::class, 'create'])->name('registrar');
    Route::get('/paquetes', [PaqueteController::class, 'index'])->name('paquetes.mostrar');
    Route::get('/nuevo_registro/{paquete}', [PaqueteController::class, 'paquete'])->name('paquete.registrado');
    Route::get('/registro/paquetes', [PaqueteController::class, 'list'])->name('registro.paquetes');
    Route::get('/paquetes/eliminados', [PaqueteController::class, 'eliminated'])->name('paquetes.eliminados');

    Route::post('/guardar', [PaqueteController::class, 'store'])->name('paquetes.guardar');

    Route::patch('/nuevo_registro/{paquete}/{estado}', [PaqueteController::class, 'deliver'])->name('paquete.entrega');
    Route::patch('/recibido/{paquete}', [PaqueteController::class, 'receivedPackage'])->name('paquetes.recibido');
    Route::patch('/registro/paquetes/{paquete}', [PaqueteController::class, 'sentPackage'])->name('paquete.enviado');
    Route::patch('/registro/paquetes/{paquete}/eliminar', [PaqueteController::class, 'destroy'])->name('paquete.eliminar');

    Route::get('/admin/usuarios', [AdminController::class, 'index'])->name('admin.users');

    Route::patch('/admin/usuarios/{user}', [AdminController::class, 'changeRole'])->name('admin.roles');
    Route::patch('/admin/usuarios/{user}/eliminar', [AdminController::class, 'deleteUser'])->name('admin.delete');
    Route::patch('/admin/usuarios/{user}/activar', [AdminController::class, 'activateUser'])->name('admin.activate');
});


require __DIR__ . '/auth.php';
