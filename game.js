var canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
var context = canvas.getContext("2d");
var bgcolor = "green";
const SW = canvas.width;
const SH = canvas.height;
const SOLDIER_BUTTON = document.getElementById('soldier-button');
const TILE_W = 25;
var target = 1;
var lives = 100;


var towerImage = new Image();
//towerImage.onload = function () {
 // context.drawImage(towerImage,40, 50)
//}
//towerImage.src = "https://www.pngall.com/wp-content/uploads/5/Tower-PNG-Image.png"

class Enemy{
  constructor(pos,color,r,health,attack){
    this.pos = pos;
    this.color = color;
    this.r = r;
    this.health = health;
    this.attack = attack;
  
    this.targets = [];
    this.targets[0] = new Vector(startPos.x + pathData[0].x, startPos.y + pathData[0].y);
      
    //console.log(this.targets[0]);

    for (let i = 1; i < pathData.length; i++){
      let prevTarget = this.targets[i - 1];
      let path = pathData[i];

      let newTarget = new Vector(prevTarget.x + path.x, prevTarget.y + path.y)
      this.targets[i] = newTarget;
      //console.log(newTarget);
    }
    this.currentTarget = this.targets[0];
    this.dir = new Vector(0,0);
    this.speed = 4;
    this.minTargetDist = 2; 
    
  }

  update(){
    if (this.currentTarget == null) return;

    //calculates direction enemy has to go
    let dir = new Vector(this.currentTarget.x - this.pos.x, this.currentTarget.y - this.pos.y)
    //pythagorean theorum
    let distance = (dir.x**2 + dir.y**2) ** (1/2)
    
    if(distance == 0) return;
    dir.x /= distance;
    dir.y /= distance;

    this.pos.x += dir.x * this.speed;
    this.pos.y += dir.y * this.speed;

    let xDist = Math.abs(this.pos.x - this.currentTarget.x);
    let yDist = Math.abs(this.pos.y - this.currentTarget.y);
    
    if(xDist <= this.minTargetDist && yDist <= this.minTargetDist){
      
      this.targets.splice(0,1);

      if(this.targets.length == 0 ){
        this.currentTarget == null;
      }else {
        this.currentTarget = this.targets[0];

      }
      
      
    }
    //console.log(this.pos.x)
    //console.log(this.pos.y)

    if(599 < this.pos.y){
      //console.log('delelete')
      enemies.splice(0,1);
      document.getElementById("lives").innerHTML = `Lives: ${lives-=10}`;
      if (lives == 0){
        document.getElementById("dead").style.display = "block";
      }
    }
  }

  render(){
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI*2);
    context.fill();
  }

}
var placing = true;
var selectedTower = null;
SOLDIER_BUTTON.addEventListener('click', function(event) {
  console.log("start placing")
  placing = true;
  var newTower = new Soldier(event.clientX, event.clientY, 10, 10, 100);
  towers.push(newTower)
  selectedTower = newTower;

});
canvas.addEventListener("mousemove", function(event) {
  // Check if the user has selected a tower to place
  if (placing) {
    // Update the position of the selected tower to follow the user's mouse pointer
    selectedTower.x = event.clientX - canvas.getBoundingClientRect().left;
    selectedTower.y = event.clientY - canvas.getBoundingClientRect().top;
  }
});
canvas.addEventListener('click', handleClick, true);

function handleClick() {
  isTowerOnPath(selectedTower);
  
}
function isTowerOnPath(tower) {
  /*
  if ( 100 < tower.x && tower.x < 150){
    var xpl = true
  }
  if ( 0 < tower.y && tower.y < 225){
    var ypl = true
  }

  if ( 100 < tower.x && tower.x < 700){
    var xpl1 = true
  }
  if ( 175 < tower.y && tower.y < 225){
    var ypl1 = true
  }

  if ( 650 < tower.x && tower.x < 700){
    var xpl2 = true
  }
  if ( 175 < tower.y && tower.y < 425){
    var ypl2 = true
  }
 
  if ( 100 < tower.x && tower.x < 700){
    var xpl3 = true
  }
  if ( 375 < tower.y && tower.y < 425){
    var ypl3 = true
  }

  if ( 100 < tower.x && tower.x < 150){
    var xpl4 = true
  }
  if ( 325 < tower.y && tower.y < 600){
    var ypl4 = true
  }


  if (xpl && ypl) {
    console.log("cant place")
    
  } else if (xpl1 && ypl1) {
    console.log("cant place")
    
  } else if (xpl2 && ypl2) {
    console.log("cant place")
  }else if (xpl3 && ypl3) {
    console.log("cant place")
  }else if (xpl4 && ypl4) {
    console.log("cant place")
  }
  else {
    placing = false;
  }*/

  //TODO: shorten and rewrite positions with pathdata instead fix 
  // you can place on path on one spot fix that
  const positions = [
    { x: 100, y: 0, width: 50, height: 225 },
    { x: 100, y: 375, width: 600, height: 50 },
    { x: 650, y: 175, width: 50, height: 250 },
    { x: 100, y: 325, width: 50, height: 275 },
    { x: 0, y: 225, width: 100, height: 200 },
  ];
  
  const overlaps = positions.some((pos) => {
    return (
      pos.x < tower.x && tower.x < pos.x + pos.width &&
      pos.y < tower.y && tower.y < pos.y + pos.height
    );
  });
  
  if (overlaps) {
    console.log("cant place");
  } else {
    placing = false;
  }
  
  

  // Check if the tower's position is within a certain distance from any point on the path
  //for (var i = 0; i < pathData.length; i++) {
    //console.log(pathData[i].x)
    //console.log(pathData[i].y)
    //console.log(tower.x)
    
    
    
    //if (tower.x - pathData[i].x )
    

    //var distancex = tower.x - (pathData[i].x + startPos.x)
    //var distancey = tower.y - (pathData[i].y + startPos.y)

    /*if (distancex < 75 && distancey < 75) { // Set the distance threshold as needed
      console.log("TOO CLOSE")
      console.log("x diff")
      console.log(tower.x - (pathData[i].x + startPos.x))
      console.log("\n y diff")
      console.log(tower.y - (pathData[i].y + startPos.y))
      //console.log(distance)
      //return true;
    } else {
      console.log("GO AHEAD")
      console.log("x diff")
      console.log(tower.x - (pathData[i].x + startPos.x))
      console.log("\n y diff")
      console.log(tower.y - (pathData[i].y + startPos.y))
    }
  }
  //console.log("false")
  
  //return false;
  */
}

function drawSelectedTower() {
  if (placing) {
    // Draw the tower image at the selected tower's x and y position
    //context.drawImage(towerImage, selectedTower.x, selectedTower.y);
    context.fillStyle = "purple";
    context.beginPath();
    context.arc(selectedTower.x, selectedTower.y, 10, 0, Math.PI*2);
    context.fill();
  }
}

class Soldier {
  constructor(x, y, r, attack, range){
    this.x = x;
    this.y = y;
    this.r = r;
    this.attack = attack;
    this.range = range;
  }

}

var towers = []


//-----------------------------------

class Vector{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}
var startPos = new Vector(125,0);

var pathData = [
  new Vector(0, 200),
  new Vector(550, 0),
  new Vector(0, 200),
  new Vector(-550, 0),
  new Vector(0, 200),
  
]

//var soldier = new Soldier(new Vector(startPos.x,startPos.y),"red",20,100,10);
var enemies = [];
const NUM_ENEMIES = 10;

var enemyStart = new Vector(125, 0);

for(let i = 0; i < NUM_ENEMIES; i++){
  let newEnemy = new Enemy(new Vector(enemyStart.x, enemyStart.y), "red", 20, 100, 10);
  enemies[i] = newEnemy;
  
  enemyStart.y -= 40;
}

function update (){
  enemies.forEach(function(e){
    e.update();
  });
}

function renderPath(){
  let drawPos = new Vector(startPos.x, startPos.y);
  context.fillStyle = "#873e23"

  pathData.forEach(function(path) {
    if(path.x == 0){
      let x = drawPos.x - TILE_W;
      let y = drawPos.y - TILE_W;
      let w = TILE_W * 2;
      let h = path.y + TILE_W * 2;

      context.fillRect(x,y,w,h);

    } 
    
    else if(path.x > 0) {
      let x = drawPos.x - TILE_W;
      let y = drawPos.y - TILE_W;
      let w = path.x + TILE_W * 2;
      let h = TILE_W * 2;

      context.fillRect(x,y,w,h);

    } else if(path.x < 0){
      let x = drawPos.x - 25;
      let y = drawPos.y - 25;
      let w = path.x;
      let h = TILE_W * 2;

      context.fillRect(x,y,w,h)
    }


    drawPos.x += path.x;
    drawPos.y += path.y;
    
  })
}

function renderGrid(){
  context.fillStyle = "black";

  let x = 0;
  for (let i = 0; i < SW/TILE_W; i++) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, 600);
    context.stroke();

    x+= TILE_W;
  }

  y = 0;
  for (let i = 0; i < SH/TILE_W; i++) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(800, y);
    context.stroke();

    y+= TILE_W;
    
  }

}

function render (){
  context.fillStyle = bgcolor;
  context.fillRect(0,0,SW,SH)
  
  renderPath();
  renderGrid();

  enemies.forEach(function(s){
    s.render();
  });

  // Draw your towers
  for (var i = 0; i < towers.length; i++) {
    // Draw the tower image at the tower's x and y position
    //context.drawImage(towerImage, towers[i].x, towers[i].y);
    context.fillStyle = "purple";
    context.beginPath();
    context.arc(towers[i].x, towers[i].y, 10, 0, Math.PI*2);
    context.fill();
  }
  
  // Draw the selected tower
  drawSelectedTower();
}
  


function play(){
  update();
  render();
  
  
}
setInterval(play, 1000/60);