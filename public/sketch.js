var socket;
var yourwidth = document.getElementById('width');
var yourheight = document.getElementById('height');
var cInput = document.getElementById('colorInput');
var c;

document.getElementById('changeBtn').addEventListener('click',function(){
  canvasChange();
});
document.getElementById('colorBtn').addEventListener('click',function(){
  colorChange();
})


socket = io.connect('http://localhost:8080');

var data = document.URL;
var sliced = data.split('8080/')[1];
console.log(sliced);
socket.emit('joinRoom',sliced);


function setup(){
  var canvas = createCanvas(500,500);
  background(50);
  canvas.parent('canvas');
  c = color('#fff');

  //trigger
  socket.on('mouse', newDrawing);
  socket.on('canvas', newCanvas);
  socket.on('colors', newColor);
}

function mouseDragged(){
  var mouseData = {
    x: mouseX,
    y: mouseY,
    px: pmouseX,
    py: pmouseY
  }
  socket.emit('mouse' ,mouseData); // 마우스 위치정보 전달

  noStroke();
  stroke(c);
  strokeWeight(10);
  line(mouseX, mouseY, pmouseX, pmouseY);
}

//상대편에 새로 그리기
function newDrawing(mouseData){
  // noStroke();
  // fill(255);
  // ellipse(mouseData.x,mouseData.y,30,30);
  stroke(c);
  strokeWeight(10);
  line(mouseData.x,mouseData.y,mouseData.px,mouseData.py)
}


function canvasChange(){
  var data = {
    width: yourwidth.value,
    height: yourheight.value
  };
  socket.emit('canvas', data); //data emit
  resizeCanvas(yourwidth.value, yourheight.value);
  background(50);
}

function newCanvas(data){
  resizeCanvas(data.width, data.height); //resize canvas on other side
  background(50);
}

function colorChange(){
    var colorData = {
      color: cInput.value
    };
    socket.emit('colors', colorData);
    c = color(cInput.value);
}
function newColor(colorData){
    c = color(colorData.color);
}
