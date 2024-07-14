let s4 = function(sketch) {
  let video;
  let fotos = [];
  let numFotos = 50;
  let fotosTomadas = 0;
  let fotoWidth = 126; // Ancho de cada foto en el mosaico
  let fotoHeight = 100; // Altura de cada foto en el mosaico
  let cols = 10; // Número de columnas en el mosaico

  let weather;
  let api = 'https://api.openweathermap.org/data/2.5/weather?';
  let lat_equals = 'lat=';
  let lon_equals = '&lon=';
  let apikey = '&APPID=48d334d540030248b383104735348b07';
  let units = '&units=metric';

 

  sketch.preload = function () {
    interFontMedium = sketch.loadFont('inter/Inter-Medium.ttf');
    interFontBold = sketch.loadFont('inter/Inter-Bold.ttf');
  };

  sketch.setup = function() {
    let canvas3 = sketch.createCanvas(1260, 500).parent(container_4);
    canvas3.position(0, 1110);
    sketch.background("red");
    sketch.textFont(interFontBold);
    sketch.textAlign(sketch.LEFT);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setPos, errorHandler);
    } else {
      console.error('Geolocalización no soportada por este navegador.');
    }

    video = sketch.createCapture(sketch.VIDEO, videoLoaded);
    video.size(640, 480);
    video.hide();

    console.log('Tamaño inicial del video: ${video.width}x${video.height}');
  };

  function videoLoaded() {
    console.log("Video cargado y listo para tomar fotos.");

    // Añadir un pequeño retraso para asegurar que el video está completamente cargado
    setTimeout(() => {
      let interval = setInterval(() => {
        if (fotosTomadas < numFotos) {
          takePhoto();
        } else {
          clearInterval(interval);
          video.remove();
          mostrarMosaico();
        }
      }, 500);
    }, 1000); // Ajusta este tiempo si es necesario
  }

  function setPos(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = api + lat_equals + lat + lon_equals + lon + apikey + units;
    sketch.loadJSON(url, gotData);
  }

  function gotData(data) {
    weather = data;
  }

  function errorHandler(error) {
    console.error('Error getting location:', error);
  }

  function takePhoto() {
    if (video.width && video.height) {
      let foto = video.get(); // Obtén una copia del video actual
      fotos.push(foto);
      fotosTomadas++;
      console.log('Foto tomada: ${fotosTomadas}');
    } else {
      console.error('El video no tiene dimensiones válidas.');
    }
  }

  function mostrarMosaico() {
    sketch.background("red");

    let startX = 0;
    let startY = sketch.height - (Math.ceil(numFotos / cols) * fotoHeight);

    for (let i = 0; i < fotos.length; i++) {
      let col = i % cols;
      let row = Math.floor(i / cols);
      sketch.image(fotos[i], startX + col * fotoWidth, startY + row * fotoHeight, fotoWidth, fotoHeight);
    }
  }

  sketch.draw = function() {
    if (weather) {
      sketch.textSize(20);
      sketch.fill("red");
      sketch.text("Mientras ves esto desde " + weather.name + ",", 40, 40);

      sketch.textSize(150);
      sketch.textLeading(128);
      sketch.fill("red");
      sketch.noStroke();
      sketch.textStyle(sketch.BOLD);

      let textToDisplay = "¿Qué está\npasando con\ntu información?";
      sketch.text(textToDisplay, 20, 180);
    }
  };
};

// Crear la instancia de p5 con el sketch
new p5(s4);