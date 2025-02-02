<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alumno extends Model
{
    use HasFactory;
    protected $table = 'alumno'; // Nombrar la tabla
    protected $primary = 'id'; // Nombrar el atributo principal

    protected $fillable = [ // Nombre de las columnas
        'nombre',
        'apellidos',
        'email',
        'password',
        'id_aula',
    ];

    function aula(){
        return $this->belongsTo(Aula::class, 'id_aula'); // Le señalamos con el id que se esta conectando
    }
}
