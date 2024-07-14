let s3 = function( sketch ) {
let imagenes = [];
  let dataJson;

  sketch.preload = function() {
    dataJson = sketch.loadJSON('imagenes.json', gotData);
  }

  sketch.setup = function() {
    let canvas2 = sketch.createCanvas(1260, 1340).parent(container_3);
    canvas2.position(0, 555);
  }

  function gotData(data) {
    // Cargar las imágenes y sus posiciones
    for (let i = 0; i < data.imagenes.length; i++) {
      let imgData = data.imagenes[i];
      let img = sketch.loadImage(imgData.src);
      imagenes.push({
        img: img,
        x: imgData.x,
        y: imgData.y,
        width: imgData.width,
        height: imgData.height,
        hover: false,
        hoverOnce: false
      });
    }
  }

  sketch.draw = function() {
    sketch.background(0);

    for (let i = 0; i < imagenes.length; i++) {
      let imgData = imagenes[i];

      sketch.fill("red");
      sketch.rect(imgData.x, imgData.y, imgData.width, imgData.height);

      // Verificar si el mouse está sobre el rectángulo
      if (sketch.mouseX > imgData.x && sketch.mouseX < imgData.x + imgData.width &&
          sketch.mouseY > imgData.y && sketch.mouseY < imgData.y + imgData.height) {
        imgData.hover = true;
        imgData.hoverOnce = true;
      } else {
        imgData.hover = false;
      }

      // Mostrar la imagen si está en hover o si ha hecho hover alguna vez
      if (imgData.hover || imgData.hoverOnce) {
        sketch.image(imgData.img, imgData.x, imgData.y, imgData.width, imgData.height);
      }
    }
  }
};
// create the second instance of p5 and pass in the function for sketch 2
new p5(s3);
