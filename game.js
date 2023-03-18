var canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
var context = canvas.getContext("2d");
var bgcolor = "green";
const SW = canvas.width;
const SH = canvas.height;
const TILE_W = 25;
var target = 1;
var lives = 100;

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
    console.log(this.pos.x)
    console.log(this.pos.y)

    if(599 < this.pos.y){
      console.log('delelete')
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

class Soldier {
  constructor(pos, r, attack, range){
    this.pos = pos;
    this.r = r;
    this.attack = attack;
    this.range = range;
  }

  onPlace(){
    console.log("start placing")
  }

}

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
}
  


function play(){
  update();
  render();
  
  
}
setInterval(play, 1000/60);