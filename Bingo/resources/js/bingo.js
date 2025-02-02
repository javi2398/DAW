document.addEventListener('DOMContentLoaded', () => {

    let cartones = [];
    let numeroCartones = prompt("Introduce el número de cartones con los que desea jugar")

    for (let x = 0; x < numeroCartones; x++) {
        let carton = generarCarton();
        cartones.push(carton)
        
    }

    generarNumeroAleatorio(cartones);
})


const sleep = function(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}


function generarNumeroAleatorio(cartonesJugadores){
    
    const numero = document.querySelector('#boton')
    
    numero.addEventListener('click', async () => {
        
        let arrayNumeros = [];
        for (let i = 1; i <= 90; i++) {
            arrayNumeros.push(i);
        }
        
        let linea = false; // Declaramos la linea como falsa
        
        while (arrayNumeros.length > 0){
            
            let bolaAleatoria = document.querySelector('#bola');
            
            let aleatorio = getRandomInt(0, arrayNumeros.length - 1); // ! Este es el valor que acaba de salir
            bolaAleatoria.textContent = arrayNumeros[aleatorio];
            
            let bolaSeleccionada = document.querySelector('#o' + arrayNumeros[aleatorio]);
            bolaSeleccionada.style.backgroundColor = 'green';
            if(comprobarNumero(arrayNumeros[aleatorio], cartonesJugadores, linea)){ // Si devuelve verdadero significa que ha hecho línea
                linea = true
            }
            
            
            arrayNumeros.splice(aleatorio, 1);
            await sleep(100)
            
            // console.log(arrayNumeros.length);
        }   
    })
}


// Notesé que también en este caso `min` será incluido y `max` excluido
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function generarCarton(){
    let carton = [[],[],[],[],[],[],[],[],[]]
    let valorMinimo = 1; // lo usaré para el valor mínimo

    for (let i = 0; i < 9; i++) { // Recorremos las 8 columnas
        for (let j = 0; j < 3; j++) { // Recorremos todas las filas

            let numeroCarton = getRandomInt(valorMinimo, ((i + 1) * 10));

            if (j == 0){ // Para que pase la primera vuelta donde no hay numeros
                carton[i].push(numeroCarton)

            } else if (!carton[i].includes(numeroCarton)){ // Si devuelve false añadimos el numero, ya que no lo contiene
                carton[i].push(numeroCarton)

            } else {
                j--; // Si el numero esta repetido restamos la vuelta
            }
        }
        valorMinimo += 10; // Con esto voy cambiando el valor minimo
    }

    carton.forEach(subArray => {
        subArray.sort(function(a, b) {
            return a - b; // Ordena cada subarreglo en orden ascendente
        });
    });

    let cartonComprobado = generarX(carton)
    rellenarCarton(cartonComprobado)
    let cartonEstructurado = redefinirCarton(cartonComprobado)

    console.table(cartonEstructurado);
    return cartonEstructurado;
}



function generarX(cartonSinX){
    
    let cartonCorrecto = JSON.parse(JSON.stringify(cartonSinX)); // Si lo igualo directamente toma el carton anterior por referencia y le modifica los valores también
    let comprobarPosicionXColumna = true
    let comprobarPosicionXFila = true
    let xConsecutivasColumnas = 0;
    let xConsecutivasFilas = 0;


    do {
        cartonCorrecto = JSON.parse(JSON.stringify(cartonSinX)) // Lo copiamos ya que vamos a tener que repetir varias veces

        for (let fila = 0; fila < 3; fila++) { // Lo repetimos 3 veces, uno por cada columna
            for (let index = 0; index < 4; index++) { // Lo repetimos 4 veces para que añada 4 X

                let posicion = getRandomInt(0, 8); // Generamos la posicion de la fila donde ira la X

                if (cartonCorrecto[posicion][fila] != 'X'){ // Comprobamos que no haya una X ya en esa posicion
                    cartonCorrecto[posicion].splice(fila, 1, 'X');
                } else {
                    index--;
                }
            }
        }

        //* Aquí comprobaré que no haya más de 2 X consecutivas en las columnas
        comprobarPosicionXColumna = true // Lo marcamos como true antes del bucle, si sale como false nos indica que alguna columna no está bien.
        
        bucleCompletoColumnas:
        for (let columnas = 0; columnas < 3; columnas++) {
            xConsecutivasColumnas = 0;

            for (let filas = 0; filas < 9; filas++) {
                if (cartonCorrecto[filas][columnas] == 'X'){
                    xConsecutivasColumnas++;
                } else {
                    xConsecutivasColumnas = 0;
                }

                if (xConsecutivasColumnas > 2){
                    comprobarPosicionXColumna = false
                    break bucleCompletoColumnas; // Con esto hacemos que salga del bucle principal también
                }
            }
        }

        //* Aquí comprobaré que no haya más de 2 X consecutivas en las filas
        comprobarPosicionXFila = true 
        if (comprobarPosicionXColumna) { // Si es falso ya no hace falta revisar las filas

            bucleCompletoFilas:
            for (let filas = 0; filas < 9; filas++) {
                xConsecutivasFilas = 0;
                
                for (let columnas = 0; columnas < 3; columnas++) {
    
                    if (cartonCorrecto[filas][columnas] == 'X'){
                        xConsecutivasFilas++;
                    } else {
                        xConsecutivasFilas = 0;
                    }
    
                    if (xConsecutivasFilas > 2){
                        comprobarPosicionXFila = false
                        break bucleCompletoFilas;
                    }
                }
            }
        }
    } while (!comprobarPosicionXColumna || !comprobarPosicionXFila);
        
    return cartonCorrecto;
}


let contadorCartones = 1; // Le genero un contador para llevar la cuenta de los cartones que he generado

function rellenarCarton(valoresCarton){
    const cartonSeleccionado = document.querySelector("#carton");
    
    let nuevoH1 = document.createElement("h1")
    nuevoH1.textContent = `Cartón #${contadorCartones}`
    cartonSeleccionado.appendChild(nuevoH1)
    
    let divContenedor = document.createElement("div")
    divContenedor.classList.add("grid");
    divContenedor.classList.add("grid-cols-9");
    divContenedor.classList.add("gap-1");
    divContenedor.classList.add("p-6");
    divContenedor.classList.add("bg-gray-600");

    cartonSeleccionado.appendChild(divContenedor)

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 9; j++) {
            const nuevoDiv = document.createElement("div")
            // No nos permite añadir todas las clases de una sola vez
            nuevoDiv.classList.add("w-16");
            nuevoDiv.classList.add("h-16");
            nuevoDiv.classList.add("flex");
            nuevoDiv.classList.add("items-center");
            nuevoDiv.classList.add("justify-center");
            nuevoDiv.classList.add("bg-gray-200");
            nuevoDiv.classList.add("rounded");
        
            nuevoDiv.textContent = valoresCarton[j][i];
            nuevoDiv.id = `c${valoresCarton[j][i]}` // Le asigno el mismo id que su valor para que sea facil de buscar
        
            divContenedor.appendChild(nuevoDiv)
            divContenedor.id = contadorCartones;

        }
    }
    contadorCartones++;
    
}


function comprobarNumero(numeroAComprobar, arrayCartones, lineaCheck) {
    const seleccionDivs = document.querySelectorAll("div");
    let comprobacionLinea = false;

    seleccionDivs.forEach(div => {
        if (div.id == `c${numeroAComprobar}`) { // Si el id es igual le cambiamos el fondo
            div.classList.add("bg-green-500");

            arrayCartones.forEach(carton => { // Recorremos el array de cartones
                carton.forEach(filaCarton => { // Recorremos el carton en específico
                    if ((filaCarton.indexOf(numeroAComprobar)) >= 0) { // Si es >= 0 significa que lo ha encontrado
                        filaCarton.splice(filaCarton.indexOf(numeroAComprobar), 1); // Borramos el valor que acaba de salir.

                        if (!lineaCheck) { // Comprobamos si ya hizo línea
                            if (filaCarton.length < 5) { // Si la longitud es menor a 5, significa que ha hecho línea
                                alert("LINEA");
                                comprobacionLinea = true;
                            }
                        }
                    }
                });
            });

            if (lineaCheck) { // Si ya hemos hecho línea, comprobamos el bingo
                arrayCartones.forEach(carton => { // Recorremos el array de cartones
                    if (carton[0].length < 5 && carton[1].length < 5 && carton[2].length < 5) { // Si todas las filas son menos de 5 indica que solo quedan las 4 X y es bingo
                        alert("BINGO");
                    }
                });
            }
        }
    });
    
    return comprobacionLinea; // Si no ha hecho línea devolvemos falso
}



function redefinirCarton(cartonARedefinir){

    // Voy a redefinir la estructura del cartón para comprobar la línea

    let cartonRedefinido = [[],[],[]];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 9; j++) {
            cartonRedefinido[i].push(cartonARedefinir[j][i])
        }
    }
    return cartonRedefinido
}
