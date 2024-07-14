let s1 = function(sketch) {
  let bubbles = [];
  let error;
  let kittens = [];
  let hoverCount = 0; // Variable para contar los hovers

  sketch.preload = function() {
    error = sketch.loadImage('kittens/error.png');
    for (let i = 0; i < 15; i++) {
      kittens[i] = sketch.loadImage(`kittens/kitten${i}.jpg`);
    }
  }



  sketch.setup = function() {
    let canvas1 = sketch.createCanvas(1260, 655).parent("container_1");
    canvas1.position(0, 0);

    for (let i = 0; i < 500; i++) {
      let r = sketch.random(100, 100);
      let x = sketch.random(0, sketch.width - r);
      let y = sketch.random(0, sketch.height - r);
      let b = new Bubble(sketch, x, y, r);
      bubbles.push(b);
    }
  }

  sketch.draw = function() {
    sketch.background(0);

    for (let i = 0; i < bubbles.length; i++) {
      bubbles[i].hovered(sketch.mouseX, sketch.mouseY);
      bubbles[i].show();
    }

  
    sketch.textFont("Inter");
    sketch.fill(255); // Color blanco para que destaque en el fondo negro
    sketch.noStroke();
    sketch.textSize(150);
    sketch.textStyle(sketch.BOLD);
    document.querySelector('canvas').style.fontWeight = 800;

    let textToDisplay = "No soy un robot";
    let x = 120;
    let y = 400;
    let letterSpacing = -0.16; // Espaciado entre letras 

    // Dibujar cada letra por separado con espaciado adicional
    for (let i = 0; i < textToDisplay.length; i++) {
      let currentChar = textToDisplay.charAt(i);
      sketch.text(currentChar, x, y);
      x += sketch.textWidth(currentChar) * (1 + letterSpacing);
    }
  

     // Contador de hovers
     sketch.fill(255); // Color del texto
     sketch.textSize(32); // Tamaño del texto
     sketch.text("Rompiste " + hoverCount + " imágenes generadas", 360, 600); // Texto y posición
     
    
    
  }

  class Bubble {
    constructor(sketch, x, y, r) {
      this.sketch = sketch;
      this.x = x;
      this.y = y;
      this.r = r;
      this.kitten = this.sketch.random(kittens);
      this.isHovered = false;
      this.hasBeenHovered = false; // Variable para verificar si ya se ha hecho hover
    }

    hovered(px, py) {
      if (
        px > this.x &&
        px < this.x + this.r &&
        py > this.y &&
        py < this.y + this.r
      ) {
        if (!this.hasBeenHovered) {
          this.hasBeenHovered = true; // Marca que ya se ha hecho hover
          hoverCount++; // Incrementa el contador de hovers
        }
        this.isHovered = true;
      } else {
        this.isHovered = false;
      }
    }

    show() {
      if (this.hasBeenHovered) {
        this.sketch.image(error, this.x, this.y, this.r, this.r);
      } else {
        this.sketch.image(this.kitten, this.x, this.y, this.r, this.r);
      }
    }
  }
};

// create a new instance of p5 and pass in the function for sketch 1
new p5(s1);