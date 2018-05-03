
class WiFiLogoCanvas {

  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.initCanvasValues();
    this.drawBackground('#eee');
    this.drawCanvas();
  }

  initCanvasValues() {
    if (!this.canvas.getAttribute('width')) this.canvas.width = 130;
    if (!this.canvas.getAttribute('height')) this.canvas.height = 130;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.radius = 10 / 130 * this.width;
    this.bgColor = '#f8f400';
    this.wifiColor = 'black';
    this.borderColor = 'black';
    this.rctBorderColor = 'black';
    this.triBorderColor = 'black';
    this.isLoop = true;
    this.speed = 1000;
    this.status = 0;
    this.static = false;
    this.isText = true;

    this.centerX = this.width / 2;
    this.centerY = 92 / 130 * this.height;
    this.startAngle = 1.2 * Math.PI;
    this.endAngle = 1.8 * Math.PI;

    if (this.canvas.getAttribute('isLoop') == 'false') this.isLoop = false;
    if (this.canvas.getAttribute('bgColor')) this.bgColor = this.canvas.getAttribute('bgColor');
    if (this.canvas.getAttribute('rctBorderColor')) this.rctBorderColor = this.canvas.getAttribute('rctBorderColor');
    if (this.canvas.getAttribute('triBorderColor')) this.triBorderColor = this.canvas.getAttribute('triBorderColor');
    if (this.canvas.getAttribute('wifiColor')) this.wifiColor = this.canvas.getAttribute('wifiColor');
    if (this.canvas.getAttribute('static') == 'true') this.static = true;
    if (this.canvas.getAttribute('isText') == 'false') this.isText = false;
  }

  drawCanvas() {
    if (this.static) {
      this.drawBackground(this.bgColor);
      this.drawRectBorder();
      this.drawTriBorder();
      this.drawCircleDot();
      this.drawArcLine(10 / 130 * this.height, 'first');
      this.drawArcLine(20 / 130 * this.height, 'second');
      this.drawArcLine(30 / 130 * this.height, 'third');
      if (this.isText) this.drawText('WiFi - Labs');
    } else {
      if (this.status == 0) this.drawBackground(this.bgColor);
      if (this.status == 1) this.drawRectBorder();
      if (this.status == 2) this.drawTriBorder();
      if (this.status == 3) this.drawCircleDot();
      if (this.status == 4) this.drawArcLine(10 / 130 * this.height, 'first');
      if (this.status == 5) this.drawArcLine(20 / 130 * this.height, 'second');
      if (this.status == 6) this.drawArcLine(30 / 130 * this.height, 'third');
      if (this.status == 7) {
        if (this.isText) this.drawText('WiFi - Labs');
      }
      if (this.status == 8) {
        this.clearText();
      }
      if (this.status == 9) {
        if (this.isText) this.drawText('WiFi - Labs');
      }
      if (this.status == 10) {
        this.clearText();
      }
      if (this.status == 11) {
        if (this.isText) this.drawText('WiFi - Labs');
      }
      if (this.status == 12) {
        this.clearText();
      }
      if (this.status == 13) {
        if (this.isText) this.drawText('WiFi - Labs');
        this.status = -1;
        if (this.isLoop == false) return;
      }
      this.status++;
      setTimeout(this.drawCanvas.bind(this), this.speed);
    }
  }

  drawBackground(color) {
    this.context.fillStyle = color;
    this.roundRect(this.context, 0, 0, this.width, this.height, this.radius, true, false);
  }
  
  drawRectBorder(borderWidth = 2 / 130 * this.width, padding = 5 / 130 * this.width) {
    this.context.lineWidth = borderWidth;
    this.context.strokeStyle = this.rctBorderColor;
    this.roundRect(this.context, padding, padding, this.width - padding * 2, this.height - padding * 2, this.radius, false, true);
  }
  
  drawTriBorder(borderWidth = 5 / 130 * this.width, padding = 16 / 130 * this.width) {
    var x1 = this.width / 2;         var y1 = padding;
    var x2 = this.width - padding;   var y2 = 100 / 130 * this.height;
    var x3 = padding;                var y3 = 100 / 130 * this.height;
  
    this.context.lineWidth = borderWidth;
    this.context.strokeStyle = this.triBorderColor;
    this.roundTriangle(this.context, x1, y1, x2, y2, x3, y3, this.radius, false, true);
  }
  
  drawCircleDot(radius = 3 / 130 * this.width) {
    this.context.beginPath();
    this.context.arc(this.centerX, this.centerY, radius, 0, 2 * Math.PI, false);
    this.context.closePath();
    if (this.wifiColor == 'multi') this.context.fillStyle = 'green';
    else this.context.fillStyle = this.wifiColor || 'black';
    this.context.fill();
  }
  
  drawArcLine(radius = 10 / 130 * this.width, order = 'first') {
    this.context.beginPath();
    this.context.arc(this.centerX, this.centerY, radius, this.startAngle, this.endAngle, false);
    if (this.wifiColor == 'multi') {
      
      if (order == 'first') this.context.strokeStyle = 'yellow';
      if (order == 'second') this.context.strokeStyle = 'orange';
      if (order == 'third') this.context.strokeStyle = 'red';
    } else {
      this.context.strokeStyle = this.wifiColor;
    }
    this.context.stroke();
  }
  
  drawText(string) {
    this.context.font = 'bold ' + (12 / 130 * this.width).toString() + 'pt Calibri';
    this.context.fillStyle = this.triBorderColor;
    // this.context.fillText(string, 30, 118);
    this.context.fillText(string, 20 / 130 * this.width, 118 / 130 * this.height);
  }

  clearText() {
    this.context.fillStyle = this.bgColor;
    // this.roundRect(this.context, 30, 106, 90, 15, 0, true, false);
    this.roundRect(this.context, 20 / 130 * this.width, 106 / 130 * this.height, 90 / 130 * this.width, 15 / 130 * this.height, 0, true, false);
  }
  
  // Draw Rectangle
  roundRect(context, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke == "undefined" ) {
      stroke = true;
    }
    if (typeof radius === "undefined") {
      radius = 5 / 130 * this.width;
    }
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
    if (stroke) {
      context.stroke();
    }
    if (fill) {
      context.fill();
    }        
  }
  // Draw Triangle
  roundTriangle(context, x1, y1, x2, y2, x3, y3, radius, fill, stroke) {
    if (typeof stroke == "undefined" ) {
      stroke = true;
    }
    if (typeof radius === "undefined") {
      radius = 5;
    }
    var r = radius / 2;
    var rr = r * 2;
    var rrr = r * 3;
    context.beginPath();
    context.moveTo(x1 + rr, y1 + rrr);
    context.lineTo(x2 - r, y2 - rrr);
    context.quadraticCurveTo(x2, y2, x2 - rrr, y2);
    context.lineTo(x3 + rrr, y3);
    context.quadraticCurveTo(x3, y3, x3 + r, y3 - rrr);
    context.lineTo(x1 - rr, y1 + rrr);
    context.quadraticCurveTo(x1, y1, x1 + rr, y1 + rrr);
    context.closePath();
    if (stroke) {
      context.stroke();
    }
    if (fill) {
      context.fill();
    }
  }
}

var wifiLogos = document.getElementsByClassName('wifi');
for (var i = 0; i < wifiLogos.length; i++) {
  var logoCanvas = new WiFiLogoCanvas(wifiLogos[i]);
}