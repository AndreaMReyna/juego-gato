// Selección de elementos del DOM
const tablero = document.getElementById('tablero'); // Contenedor principal del juego
const botonReiniciar = document.getElementById('botonReiniciar'); // Botón para reiniciar el juego
const popupVictoria = document.getElementById('popupVictoria'); // Popup que muestra la victoria
const cerrarPopup = document.querySelector('.cerrar'); // Botón para cerrar el popup de victoria

// Variables de estado del juego
let jugadorActual = 'X'; // Jugador que inicia, X o O
let estadoTablero = ['', '', '', '', '', '', '', '', '']; // Estado del tablero (vacío inicialmente)
let juegoActivo = true; // Indica si el juego está en curso

// Condiciones de victoria (combinaciones ganadoras)
const condicionesGanadoras = [
    [0, 1, 2], // Fila 1
    [3, 4, 5], // Fila 2
    [6, 7, 8], // Fila 3
    [0, 3, 6], // Columna 1
    [1, 4, 7], // Columna 2
    [2, 5, 8], // Columna 3
    [0, 4, 8], // Diagonal de izquierda a derecha
    [2, 4, 6]  // Diagonal de derecha a izquierda
];

// Función para crear el tablero
function crearTablero() {
    for (let i = 0; i < 9; i++) { // Crea 9 celdas
        const celda = document.createElement('div'); // Crea un nuevo elemento div
        celda.classList.add('celda'); // Añade la clase 'celda'
        celda.addEventListener('click', () => manejarClickCelda(i)); // Añade un evento click a cada celda
        tablero.appendChild(celda); // Añade la celda al tablero
    }
}

// Manejo del clic en una celda
function manejarClickCelda(index) {
    if (estadoTablero[index] || !juegoActivo) return; // Si la celda ya está ocupada o el juego ha terminado, no hace nada

    estadoTablero[index] = jugadorActual; // Marca la celda con el jugador actual
    actualizarCelda(index); // Actualiza la visualización de la celda
    verificarVictoria(); // Verifica si hay un ganador
}

// Actualiza la visualización de una celda
function actualizarCelda(index) {
    const celdas = document.querySelectorAll('.celda'); // Selecciona todas las celdas
    celdas[index].innerText = jugadorActual; // Muestra el símbolo del jugador en la celda
}

// Verifica si hay un ganador o si hay un empate
function verificarVictoria() {
    for (const condicion of condicionesGanadoras) { // Revisa cada condición de victoria
        const [a, b, c] = condicion; // Desestructura las posiciones
        if (estadoTablero[a] && estadoTablero[a] === estadoTablero[b] && estadoTablero[a] === estadoTablero[c]) {
            juegoActivo = false; // Termina el juego si hay un ganador
            mostrarPopupVictoria(); // Muestra el popup de victoria
            return;
        }
    }
    // Si no hay más celdas vacías, es un empate
    if (!estadoTablero.includes('')) {
        juegoActivo = false; // Establece que el juego ha terminado
    }
    // Cambia al siguiente jugador
    jugadorActual = jugadorActual === 'X' ? 'O' : 'X'; // Alterna entre X y O
}

// Muestra el popup de victoria
function mostrarPopupVictoria() {
    popupVictoria.style.display = 'flex'; // Cambia el estilo para mostrar el popup
}

// Evento para cerrar el popup
cerrarPopup.addEventListener('click', () => {
    popupVictoria.style.display = 'none'; // Oculta el popup al hacer clic en cerrar
});

// Evento para reiniciar el juego
botonReiniciar.addEventListener('click', reiniciarJuego);

// Función para reiniciar el juego
function reiniciarJuego() {
    estadoTablero = ['', '', '', '', '', '', '', '', '']; // Reinicia el estado del tablero
    juegoActivo = true; // Reactiva el juego
    jugadorActual = 'X'; // Restablece al jugador X
    const celdas = document.querySelectorAll('.celda'); // Selecciona todas las celdas
    celdas.forEach(celda => celda.innerText = ''); // Limpia el texto de todas las celdas
    popupVictoria.style.display = 'none'; // Oculta el popup de victoria
}

// Inicializa el tablero al cargar el juego
crearTablero();