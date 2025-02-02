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
        Schema::create('alumno', function (Blueprint $table) {
            $table->id();
            $table->string(column: 'nombre');
            $table->string(column: 'apellidos');
            $table->string(column: 'email');
            $table->string(column: 'password');
            $table->unsignedBigInteger(column: 'id_aula'); // Al tratarse de un id habria que ponerle este tipo
            $table->timestamps();

            $table->foreign("id_aula")->references("id")->on("aula");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alumno');
    }
};
