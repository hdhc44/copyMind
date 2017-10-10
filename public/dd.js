
var socket;
var yourwidth = document.getElementById('width');
var yourheight = document.getElementById('height');


document.getElementById('changeBtn').addEventListener('click',function(){
  canvasChange();
});



function setup(){
  var canvas = createCanvas(500,500);
  background(50);
  canvas.parent('canvas');

  socket = io.connect('http://localhost:8080');
  socket.on('mouse', newDrawing);
  socket.on('canvas', newCanvas);
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
  stroke('#2b4672');
  strokeWeight(10);
  line(mouseX, mouseY, pmouseX, pmouseY);

}

//상대편에 새로 그리기
function newDrawing(mouseData){
  // noStroke();
  // fill(255);
  // ellipse(mouseData.x,mouseData.y,30,30);
  stroke('#2b4672');
  strokeWeight(10);
  line(mouseData.x,mouseData.y,mouseData.px,mouseData.py)
}


function canvasChange(){
  var data = {
    width: yourwidth.value,
    height: yourheight.value
  }
  socket.emit('canvas', data);
  resizeCanvas(yourwidth.value, yourheight.value);
  background(50);
}

function newCanvas(data){
  resizeCanvas(data.width, data.height);
  background(50);
}
