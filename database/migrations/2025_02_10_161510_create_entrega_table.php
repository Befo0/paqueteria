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
        Schema::create('entrega', function (Blueprint $table) {
            $table->id();
            $table->string('opcionEntrega');
            $table->timestamps();
        });

        DB::table('entrega')->insert([
            ['opcionEntrega' => 'Recoger'],
            ['opcionEntrega' => 'Enviar'],
        ]);

        Schema::table('paquetes', function(Blueprint $table) {
            $table->foreign('estadoEntrega')->references('id')->on('entrega');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entrega');
    }
};
