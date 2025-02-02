<?php

namespace Database\Factories;

use App\Models\Aula;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Alumno>
 */
class AlumnoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $aulas = Aula::all();

        return [
            'nombre' => fake()->name(),
            'apellidos' => fake()->lastName(),
            'email' => fake()->email(),
            'password' => fake()->password(),
            'id_aula' => fake()->randomElement($aulas),
        ];
    }
}
