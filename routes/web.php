<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\PaqueteController;
use App\Http\Controllers\ProfileController;
use App\Models\Paquete;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/main', function () {
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
    Route::post('/guardar', [PaqueteController::class, 'store'])->name('paquetes.guardar');
    Route::patch('/recibido/{paquete}', [PaqueteController::class, 'receivedPackage'])->name('paquetes.recibido');
    Route::get('/admin/usuarios', [AdminController::class, 'index'])->name('admin.users');
    Route::patch('/admin/usuarios/{user}', [AdminController::class, 'changeRole'])->name('admin.roles');
    Route::delete('/admin/usuarios/{user}', [AdminController::class, 'deleteUser'])->name('admin.delete');
});

Route::get('/prueba', function () {});


require __DIR__ . '/auth.php';
