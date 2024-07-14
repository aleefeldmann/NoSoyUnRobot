let s2 = function (sketch) {
    let img1, img2, img3;
    let interFont;
    let textStr = 'La inteligencia artificial generativa (IA) es un término paraguas para referirse a modelos de aprendizaje automatizado entrenados con grandes cantidades de datos y que producen resultados basados en los pedidos de los usuarios.';
    let scrollOffset = 0; // Variable para rastrear el desplazamiento
    let lines = []; // Variable para almacenar las líneas de texto
  
    let textStr2 = 'LA MANERA EN LA QUE HABLAMOS SOBRE UNA TECNOLOGÍA DETERMINADA DETERMINA LA COMPRENSIÓN QUE TENEMOS DE ELLA.';
    let scrollOffset2 = 0;
    let lines2 = [];
  
    sketch.preload = function () {
      img1 = sketch.loadImage("imagenes/roland.jpeg");
      img2 = sketch.loadImage("imagenes/papa.webp");
      img3 = sketch.loadImage('imagenes/teatro.jpg');
      interFont = sketch.loadFont('inter/Inter-Medium.ttf');
    };
  
    sketch.setup = function () {
      // Código inicial. Se ejecuta una sola vez
      sketch.createCanvas(1260, 2300).parent(container_2);
      sketch.textFont(interFont);
  
      let words = textStr.split(' ');
      let line = '';
  
      // Dividir el texto en líneas para ajustarse al cuadro
      for (let i = 0; i < words.length; i++) {
        let testLine = line + words[i] + ' ';
        let testWidth = sketch.textWidth(testLine);
        if (testWidth > 220 && i > 0) {
          lines.push(line);
          line = words[i] + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line);
  
      let words2 = textStr2.split(' ');
      let line2 = '';
  
      for (let i = 0; i < words2.length; i++) {
        let testLine2 = line2 + words2[i] + ' ';
        let testWidth2 = sketch.textWidth(testLine2);
        if (testWidth2 > 250 && i > 0) {
          lines2.push(line2);
          line2 = words2[i] + ' ';
        } else {
          line2 = testLine2;
        }
      }
      lines2.push(line2);
    };
  
    sketch.draw = function () {
      // Se ejecuta después de setup continuamente
      sketch.background(245);
  
      // INTRO
      let img1X = 48,
        img1Y = 579.96,
        img1W = 476.18,
        img1H = 635.08;
      sketch.image(img1, img1X, img1Y, img1W, img1H); // imagen img1
      let img2X = 857.46,
        img2Y = 753.86,
        img2W = 364.52,
        img2H = 455.65;
      sketch.image(img2, img2X, img2Y, img2W, img2H);
      sketch.image(img3, 346, 1275, 574, 382.57);
  
      // interactivo img1
  
      // Dibujar imágenes y aplicar interacción
      drawInteractiveImage(img1, 48, 579.96, 476.18, 635.08);
      drawInteractiveImage(img2, 857.46, 753.86, 364.52, 455.65);
      drawInteractiveImage(img3, 346, 1275, 574, 382.57);
  
      sketch.textFont("Inter"); // subtítulos
      sketch.fill(236, 44, 44);
      sketch.noStroke();
      sketch.textSize(20);
      sketch.text("qué son las ia", 8, 55);
      sketch.text("qué son las ia", 565, 55);
      sketch.text("qué son las ia", 1122, 55);
      sketch.text("inteligente y todopoderosa", 8, 788);
      sketch.text("inteligente y todopoderosa", 501.5, 788);
      sketch.text("inteligente y todopoderosa", 995, 788);
      sketch.text("inteligente y todopoderosa", 8, 1788);
      sketch.text("inteligente y todopoderosa", 501.5, 1788);
      sketch.text("inteligente y todopoderosa", 995, 1788);
  
      // TEXTO INTERACTIVO 1
      let x = 30;
      let y = 190 - scrollOffset; // Ajusta la posición Y según el desplazamiento
      let lineHeight = 50;
      let totalChars = 0; // Contador de caracteres procesados hasta ahora
  
      sketch.textFont(interFont);
      sketch.textSize(48);
  
      for (let i = 0; i < lines.length; i++) {
        let charX = x;
        let line = lines[i];
  
        for (let j = 0; j < line.length; j++) {
          let char = line[j];
          let charWidth = sketch.textWidth(char);
  
          // Calcula el umbral en función de la posición del mouse y los caracteres procesados
          let threshold = sketch.map(sketch.mouseX, 0, sketch.width, 0, textStr.length);
  
          // Determina el color del carácter basado en el umbral
          let textColor = sketch.color(128, 128, 128);
          if (totalChars < threshold) {
            textColor = sketch.color(0, 0, 0);
          }
  
          // Configura el color de relleno
          sketch.noStroke();
          sketch.fill(textColor);
  
          // Dibuja cada letra por separado
          sketch.text(char, charX, y + i * lineHeight);
  
          // Mueve la posición X para la siguiente letra
          charX += charWidth;
  
          // Incrementa el contador total de caracteres
          totalChars++;
        }
      }
  
      // TEXTO INTERACTIVO 2
      let x2 = 100;
      let y2 = 2000 - scrollOffset2; // Ajusta la posición Y según el desplazamiento
      totalChars = 0; // Reinicia el contador de caracteres procesados
      lineHeight = sketch.textAscent() + sketch.textDescent();
  
      for (let i = 0; i < lines2.length; i++) {
        let charX2 = x2;
        let line2 = lines2[i];
  
        for (let j = 0; j < line2.length; j++) {
          let char2 = line2[j];
          let charWidth2 = sketch.textWidth(char2);
  
          let strokeWeightValue = sketch.map(sketch.mouseX, 0, sketch.width, 1, 15);
  
          // Configura el color de relleno
          sketch.stroke(0);
          sketch.strokeWeight(strokeWeightValue);
          sketch.fill("black");
  
          // Dibuja cada letra por separado
          sketch.text(char2, charX2, y2 + i * lineHeight);
  
          // Mueve la posición X para la siguiente letra
          charX2 += charWidth2;
  
          // Incrementa el contador total de caracteres
          totalChars++;
        }
      }
  
      // PROMPTS ALEATORIOS
      let sectorX = 900;
      let sectorY = 136;
      let sectorWidth = 300;
      let sectorHeight = 579;
  
      let sector2X = 690;
      let sector2Y = 681;
      let sector2Width = 300;
      let sector2Height = 579;
  
      sketch.textFont("IBM Plex Mono");
      sketch.fill(0);
      sketch.noStroke();
      sketch.textSize(20);
  
      for (let i = 0; i < 36; i++) {
        let x = sketch.random(sectorX, sectorX + sectorWidth);
        let y = sketch.random(sectorY, sectorY + sectorHeight);
        sketch.text("prompt!", x, y);
      }
  
      for (let i = 0; i < 36; i++) {
        let x = sketch.random(sector2X, sector2X + sector2Width);
        let y = sketch.random(sector2Y, sector2Y + sector2Height);
        sketch.text("prompt!", x, y);
      }
    };
  
    sketch.mouseWheel = function (event) {
      // Actualiza el desplazamiento según el scroll
      scrollOffset += event.delta;
      scrollOffset2 += event.delta;
  
      // Restringe el desplazamiento para no desplazarse más allá del contenido
      scrollOffset = sketch.constrain(scrollOffset, 0, sketch.max(0, lines.length * (sketch.textAscent() + sketch.textDescent()) - sketch.height));
      scrollOffset2 = sketch.constrain(scrollOffset2, 0, sketch.max(0, lines2.length * (sketch.textAscent() + sketch.textDescent()) - sketch.height));
    };
  
    function drawInteractiveImage(img, posX, posY, imgWidth, imgHeight) {
      if (sketch.mouseX > posX && sketch.mouseX < posX + imgWidth && sketch.mouseY > posY && sketch.mouseY < posY + imgHeight) {
        let tileCountX = sketch.floor(sketch.map(sketch.mouseX, posX, posX + imgWidth, 1, 50));
        let tileCountY = sketch.floor(sketch.map(sketch.mouseY, posY, posY + imgHeight, 1, 50));
        let stepX = img.width / tileCountX;
        let stepY = img.height / tileCountY;
  
        for (let gridY = 0; gridY < tileCountY; gridY++) {
          for (let gridX = 0; gridX < tileCountX; gridX++) {
            let px = sketch.int(gridX * stepX);
            let py = sketch.int(gridY * stepY);
  
            if (px < img.width && py < img.height) {
              let c = img.get(px, py);
              sketch.fill(c);
              sketch.noStroke();
              sketch.rect(posX + gridX * (imgWidth / tileCountX), posY + gridY * (imgHeight / tileCountY), imgWidth / tileCountX, imgHeight / tileCountY);
            }
          }
        }
      }
    }
  };
  
new p5(s2);