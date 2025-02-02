<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AulaController;
use App\Http\Controllers\CartonController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/bingo', function () {
    return view('bingo');
});
Route::get('/probando', function () {
    return view('probando');
});

Route::get('/aula{i}', [AulaController::class, 'index']);



Route::post('/CartonController', [CartonController::class, 'guardar']) -> name('CartonController');