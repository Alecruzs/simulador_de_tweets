const formulario = document.querySelector('#formulario');
const tweetInput = document.querySelector('#tweet');
const listaTweets = document.querySelector('#lista-tweets');
const textoValidacion = document.querySelector('#textoVal');
const contador = document.querySelector('#contador');
const MAXIMO_CARACTERES = 250;
const CLAVE_TWEETS = 'tweets';
let tweets = cargarTweets();

formulario.addEventListener('submit', agregarTweet);
tweetInput.addEventListener('input', actualizarContador);
mostrarTweets();
actualizarContador();
//creamos una función para agregar un tweet y validamos que no esté vacío y que no supere los 250 caracteres
function agregarTweet(event) {
    event.preventDefault();

    const contenido = tweetInput.value.trim();

    if (!contenido) {
        mostrarError('El tweet no puede estar vacío');
        return;
    }

    if (contenido.length > MAXIMO_CARACTERES) {
        mostrarError(`El tweet no puede superar los ${MAXIMO_CARACTERES} caracteres`);
        return;
    }

    limpiarError();
    tweets.push(contenido);
    guardarTweets();
    mostrarTweets();
    formulario.reset();
    actualizarContador();
}
// Función para mostrar los tweets en la lista y agregar un botón de eliminar para cada uno
function mostrarTweets() {
    listaTweets.innerHTML = '';

    tweets.forEach((contenido) => {
        const tweet = document.createElement('div');
        tweet.className = 'tweet';

        const texto = document.createElement('span');
        texto.textContent = contenido;

        const botonBorrar = document.createElement('button');
        botonBorrar.type = 'button';
        botonBorrar.className = 'borrar-tweet';
        botonBorrar.textContent = 'X';
        botonBorrar.setAttribute('aria-label', 'Eliminar tweet');
        botonBorrar.addEventListener('click', () => eliminarTweet(tweet));

        tweet.append(texto, botonBorrar);
        listaTweets.appendChild(tweet);
    });
}
// Función para eliminar un tweet de la lista y del almacenamiento local
function eliminarTweet(tweet) {
    const indice = Array.from(listaTweets.children).indexOf(tweet);
    tweets.splice(indice, 1);
    guardarTweets();
    mostrarTweets();
}
// Función para cargar los tweets desde el almacenamiento local
function cargarTweets() {
    try {
        const tweetsGuardados = JSON.parse(localStorage.getItem(CLAVE_TWEETS));
        return Array.isArray(tweetsGuardados) ? tweetsGuardados : [];
    } catch (error) {
        return [];
    }
}
// Función para guardar los tweets en el almacenamiento local
function guardarTweets() {
    localStorage.setItem(CLAVE_TWEETS, JSON.stringify(tweets));
}
// Función para actualizar el contador de caracteres restantes y cambiar el color del contador si se alcanza el límite que serian los 250 caracteres
function actualizarContador() {
    const caracteresRestantes = MAXIMO_CARACTERES - tweetInput.value.length;
    contador.textContent = `${caracteresRestantes} caracteres restantes`;
    contador.className = caracteresRestantes === 0 ? 'contador limite' : 'contador';
}
// Función para mostrar un mensaje de error en caso de que el tweet esté vacío o supere los 250 caracteres
function mostrarError(mensaje) {
    textoValidacion.textContent = mensaje;
    textoValidacion.className = 'error';
}
// Función para limpiar el mensaje de error que aparece cuando el tweet está vacío o supera los 250 caracteres
function limpiarError() {
    textoValidacion.textContent = '';
    textoValidacion.className = '';
}
