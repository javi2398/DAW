<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Carton extends Model
{
    protected $table = "carton"; // Nombre de la tabla

    protected $primary = "id"; // Clave primaria, si no la señalamos tiraría de id también.

    protected $fillable = [ // Nombre de las columnas
        'tipo',
        'numeros'
    ];
}
