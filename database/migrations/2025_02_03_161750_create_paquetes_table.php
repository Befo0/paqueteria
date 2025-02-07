<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('paquetes', function (Blueprint $table) {
            $table->id();
            $table->string('nombrePaquete', length: 100);
            $table->string('descripcionPaquete', length:255);
            $table->unsignedBigInteger('usuarioDestinatario');
            $table->unsignedBigInteger('usuarioRecepcion');
            $table->string('remitente', length: 50);
            $table->dateTime('horaLlegadaPaquete');
            $table->string('usuarioRecibio', length: 50)->nullable();
            $table->unsignedBigInteger('estadoPaquete');
            $table->dateTime('horaRecibidaPaquete')->nullable();
            $table->timestamps();

            //asigning foreign keys for relations
            $table->foreign('usuarioDestinatario')->references('id')->on('users');
            $table->foreign('usuarioRecepcion')->references('id')->on('users');
            $table->foreign('estadoPaquete')->references('id')->on('estados');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paquetes');
    }
};
