<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Bingo</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])</head>

<body>
    <div class="flex bg-gray-600 w-auto h-auto gap-10 justify-center p-6 rounded-lg">
        <!-- Tabla de Números de Bingo -->
        <div class="bg-gray-200 p-4 rounded-lg shadow-lg">
            @for ($e = 1, $cont = 1; $e < 10; $e++) 
                <div class="flex mb-1 justify-center">
                    @for($i = 0; $i < 10; $i++, $cont++)
                        <div id="o{{$cont}}" class="rounded-full flex items-center justify-center bg-white w-10 h-10 text-gray-700 font-semibold mx-1">
                            {{$cont}}
                        </div>
                    @endfor
                </div>
            @endfor
        </div>
    
        <!-- Bola Actual -->
        <div class="flex flex-col items-center">
            <div class="w-32 h-32 bg-yellow-500 text-center flex items-center justify-center text-5xl rounded-full text-cyan-50 font-bold shadow-lg" id="bola">0</div>
            <button id="boton" class="text-gray-100 mt-4 text-xl">Empezar</button>
        </div>
    </div>
    
    
    <!-- Cartón de Bingo -->
    <div class="flex flex-col items-center space-y-4">

        <div id="carton" class="bg-gray-200 p-6 rounded-lg shadow-lg w-[60%] text-center mt-4">
            <!-- Aqui insertaremos los nuevos cartones -->
        </div>
    
    </div>

</body>

</html>