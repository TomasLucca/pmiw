let fondo;

let caminar = [];
let fuego = [];

let x = 80;

// Posición del suelo
let suelo = 505;

let estado = 0;

let frameActual = 0;

let tiempoAnterior = 0;
let tiempoEstado = 0;

let velocidad = 2;

let velocidadCaminar = 120;
let velocidadFuego = 120;

let CAMINAR = 0;
let FUEGO = 1;
let FIN = 2;

// Para evitar que vuelva a lanzar fuego
let yaLanzoFuego = false;


function preload() {

  fondo = loadImage("fondo.png");

  // Animación de caminar
  for (let i = 0; i < 6; i++) {

    caminar[i] = loadImage(
      "data/walk/sprite-1-" + (i + 1) + ".png"
    );

  }

  // Animación de lanzar fuego
  for (let i = 0; i < 8; i++) {

    fuego[i] = loadImage(
      "data/accion/accion-1-" + (i + 1) + ".png"
    );

  }

}


function setup() {

  createCanvas(800, 600);

  imageMode(CENTER);

  tiempoAnterior = millis();
  tiempoEstado = millis();

}


function draw() {

  // Fondo
  image(
    fondo,
    width / 2,
    height / 2,
    width,
    height
  );


  // Máquina de estados

  if (estado == CAMINAR) {

    caminarPersonaje();

  }
  else if (estado == FUEGO) {

    lanzarFuego();

  }
  else if (estado == FIN) {

    personajeFinal();

  }

}



// CAMINAR


function caminarPersonaje() {

  // El personaje avanza
  x = x + velocidad;


  // Animación de caminar
  frameActual = obtenerFramePorTiempo(
    caminar,
    tiempoAnterior,
    velocidadCaminar
  );


  // Dibujar personaje
  dibujarFrame(
    caminar,
    frameActual,
    x,
    suelo,
    2
  );


  //lanzar fuego UNA VEZ
  if (x >= 350 && yaLanzoFuego == false) {

    cambiarEstado(FUEGO);

    yaLanzoFuego = true;

  }


  // Cuando llega al final
  // queda congelado

  if (x >= 700) {

    cambiarEstado(FIN);

  }

}


// LANZAR FUEGO


function lanzarFuego() {

  let tiempoPasado = millis() - tiempoEstado;

  frameActual = floor(
    tiempoPasado / velocidadFuego
  );


  // Reproducir los 8 frames
  // solamente una vez

  if (frameActual < fuego.length) {

    dibujarFrame(
      fuego,
      frameActual,
      x,
      suelo,
      2
    );

  }
  else {

    // Terminó de lanzar fuego
    // vuelve a caminar

    cambiarEstado(CAMINAR);

  }

}


// FINAL


function personajeFinal() {

  // Último frame de caminar
  // para que quede caminando congelado

  dibujarFrame(
    caminar,
    caminar.length - 1,
    x,
    suelo,
    2
  );

}


// DIBUJAR FRAME


function dibujarFrame(
  animacion,
  numero,
  posX,
  posicionSuelo,
  escala
) {

  let imagen = obtenerFrame(
    animacion,
    numero
  );

  let ancho = imagen.width * escala;
  let alto = imagen.height * escala;

  // El centro de la imagen se calcula
  // para que los pies queden en el suelo

  let posY = posicionSuelo - alto / 2;

  image(
    imagen,
    posX,
    posY,
    ancho,
    alto
  );

}


// OBTENER FRAME


function obtenerFrame(
  animacion,
  numero
) {

  return animacion[numero];

}



// FRAME SEGÚN TIEMPO


function obtenerFramePorTiempo(
  animacion,
  tiempoInicio,
  velocidadAnimacion
) {

  let tiempoActual = millis();

  let tiempoPasado =
    tiempoActual - tiempoInicio;

  let frame = floor(
    tiempoPasado / velocidadAnimacion
  );

  frame = frame % animacion.length;

  return frame;

}


// CAMBIAR ESTADO


function cambiarEstado(nuevoEstado) {

  estado = nuevoEstado;

  frameActual = 0;

  tiempoEstado = millis();

  tiempoAnterior = millis();

}



// REINICIAR


function reiniciar() {

  x = 80;

  estado = CAMINAR;

  frameActual = 0;

  yaLanzoFuego = false;

  tiempoAnterior = millis();

  tiempoEstado = millis();

}


// TECLA R

function keyPressed() {

  if (key == 'r' || key == 'R') {

    reiniciar();

  }

}
