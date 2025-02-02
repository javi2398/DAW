<?php

namespace App\Http\Controllers;

use App\Models\Aula;
use Illuminate\Http\Request;

class AulaController extends Controller
{
    function index($i){
        
        $aula = Aula::where("id", $i)->first();
        dd($aula);


        // return view('alumnos')->with(['aula' => $aula]);

    }
}
