<?php

namespace App\Models;

use DB;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aula extends Model
{
    use HasFactory;
    protected $table = 'aula';
    protected $primary = 'id';

    protected $fillable = [ // Nombre de las columnas
        'nombre',
        'capacidad'
    ];

    function alumnos(){
        return $this->hasMany(Alumno::class, 'id_aula');
    }
}
