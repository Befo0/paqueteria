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
        Schema::create('estados', function (Blueprint $table) {
            $table->id();
            $table->string('nombreEstado', length: 50);
            $table->timestamps();
        });

        DB::table('estados')->insert([
            ['nombreEstado' => 'Recepcion'],
            ['nombreEstado' => 'Recibido'],
            ['nombreEstado' => 'Eliminado'],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('estados');
    }
};
