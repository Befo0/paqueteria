<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('nombreRol', length: 50);
            $table->timestamps();
        });

        DB::table('roles')->insert([
            ['nombreRol' => 'Administrador'],
            ['nombreRol' => 'Recepcion'],
            ['nombreRol' => 'Usuario']
        ]);

        Schema::table('users', function(Blueprint $table){
            $table->unsignedBigInteger('idRol');
            $table->foreign('idRol')->references('id')->on('roles');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};
