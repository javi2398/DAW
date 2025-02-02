<?php

namespace App\Http\Controllers;

use App\Models\Carton;
use Illuminate\Http\Request;

class CartonController extends Controller
{
    function guardar(Request $request){
        $c = new Carton();
        $c -> tipo = $request['tipo'];
        $c -> numeros = "20, 55, 80, 90";
        $c -> save(); // El método save es nativo de laravel

    }
}
