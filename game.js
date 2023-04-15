var canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
var context = canvas.getContext("2d");
var bgcolor = "green";
const SW = canvas.width;
const SH = canvas.height;
const SOLDIER_BUTTON = document.getElementById('soldier-button');
const TEST_BUTTON = document.getElementById('test-button');
const TILE_W = 25;
var target = 1;
var hp = 100;
var gold = 200;
var balloon_img = new Image();
var monkey_img = new Image();
var bullet_img = new Image();
var catapult_img = new Image();
var catapult_projectile_img = new Image();
monkey_img.src = "monkey-removebg-preview.png"
balloon_img.src = "http://topper64.co.uk/nk/btd6/img/bloons/red.png"
bullet_img.src = "output-onlinepngtools.png"
catapult_img.src = "catapult-fixed.png"
catapult_projectile_img.src = "spike.svg"
var placing = true;
var musicStart = true;
const swingAudio = document.getElementById("swing-audio");
const popAudio = document.getElementById("pop-audio");

class Enemy{
  constructor(pos,color,r,health,attack){
    this.pos = pos;
    this.color = color;
    this.r = r;
    this.health = health;
    this.attack = attack;
    this.x;
    this.y;
  
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
    this.speed = 2;
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
      document.getElementById("lives").innerHTML = `HP: ${hp-=10}`;
      if (hp == 0){
        document.getElementById("dead").style.display = "block";
      }
    }
  }

  render(){
    context.drawImage(balloon_img, this.pos.x - 64, this.pos.y - 64, 128, 128)
    
  }

}

var selectedTower = null;
SOLDIER_BUTTON.addEventListener('click', function(event) {
  
  if(gold >= 50 ){
    //console.log("start placing")
    gold -= 50;
    document.getElementById("gold").innerHTML = `Gold: ${gold}`;
    Soldier.placing = true;
    document.getElementById("canvas").style.cursor = "move"; 
    var newTower = new Soldier(event.clientX, event.clientY, 20, 10, 100, monkey_img);
    towers.push(newTower)
    selectedTower = newTower;
  }
  

});


canvas.addEventListener("mousemove", function(event) {
  // Check if the user has selected a tower to place
  if (Soldier.placing || CatapultMonkey.placing) {
    // Update the position of the selected tower to follow the user's mouse pointer
    selectedTower.x = event.clientX - canvas.getBoundingClientRect().left;
    selectedTower.y = event.clientY - canvas.getBoundingClientRect().top;
    isTowerOnPath(selectedTower)
  }
});
canvas.addEventListener('click', handleClick, true);

function handleClick() {
  if(Soldier.placing){
    if(!isTowerOnPath(selectedTower)){
      Soldier.placing = false;
      selectedTower.isPlaced = true;
      document.getElementById("canvas").style.cursor = "default"; 
    }
  }
  if(CatapultMonkey.placing){
    if(!isTowerOnPath(selectedTower)){
      CatapultMonkey.placing = false;
      selectedTower.isPlaced = true;
      document.getElementById("canvas").style.cursor = "default"; 
    }
  }
  
}
function isTowerOnPath(tower) {
  //TODO: shorten and rewrite positions with pathdata instead fix 
  // you can place on path on one spot fix that
  const positions = [
    { x: 100, y: 0, width: 50, height: 225 },
    { x: 100, y: 175, width: 600, height: 50 },
    { x: 100, y: 375, width: 600, height: 50 },
    { x: 650, y: 175, width: 50, height: 250 },
    { x: 100, y: 325, width: 50, height: 275 },
    //{ x: 0, y: 225, width: 100, height: 200 },
  ];
  
  const overlaps = positions.some((pos) => {
    return (
      pos.x < tower.x && tower.x < pos.x + pos.width &&
      pos.y < tower.y && tower.y < pos.y + pos.height
    );
  });
  
  if (overlaps) {
    //console.log("cant place");
    selectedTower.rcolor = "red"
    return true
  } else {
    
    //placing = false;
    selectedTower.rcolor = "black";
    
    return false;
  }
}

function drawSelectedTower() {
  if (Soldier.placing) {
    Soldier.placing = true;
    context.drawImage(monkey_img, selectedTower.x -32, selectedTower.y-32, 64, 64)
  }
}

function drawCatapultMonkeys() {
  if(CatapultMonkey.placing){
    CatapultMonkey.placing = true;
    context.drawImage(catapult_img, selectedTower.x -50, selectedTower.y-50, 100, 100)
  }
}
class Monkeys {
  constructor(image, imageSizeX, imageSizeY, bulletType, monkeyType) {
    this.image = image;
    this.imageSizeX = imageSizeX;
    this.imageSizeY = imageSizeY;
    this.bulletType = bulletType;
    this.monkeyType = monkeyType;
  }
  update3() {
    alert("test");
    console.log("udpates")
  }
  update2() {
    let closestDist = Infinity;
    let closestEnemy = null;
    let leadingEnemy = null;
    let lastEnemyInRange = null;

    for (let i = 0 ;i < enemies.length; i++) {
      let dist = Math.sqrt((enemies[i].pos.x - this.x) ** 2 + (enemies[i].pos.y - this.y) ** 2);
      if (dist < this.range) {
        leadingEnemy = enemies[i];
        break;
      }
    }

    for(let i = enemies.length - 1; i >= 0; i--){
      let dist = Math.sqrt((enemies[i].pos.x - this.x) ** 2 + (enemies[i].pos.y - this.y) ** 2);
      if (dist < this.range) {
        lastEnemyInRange = enemies[i];
        break;
      }
    }


    // Set the tower's target to the closest enemy within range
    if(this.monkeyType == "dart"){
      this.target = leadingEnemy;
    }
    if(this.monkeyType == "catapult"){
      this.target = lastEnemyInRange;
    }

    // Fire a bullet at the target if the tower is not on cooldown
    if (this.target && this.fireCooldown === 0) {
      let direction = calculateDirection(this, this.target);
      //console.log(direction)
      var newBullet = new Bullet(this.x, this.y, 6, 1, direction, this.bulletType);
      //console.log(newBullet)
      bullets.push(newBullet);
      swingAudio.currentTime = 0;
      swingAudio.play();
      //enemies.splice(0, 1)
      this.fireCooldown = 60; // 60 frames between shots
    }

    // Update the fire cooldown
    if (this.fireCooldown > 0) {
      this.fireCooldown--;
    }
  }
  
  
  rotateTowardsEnemy(enemy) {
    console.log("1")
    // Calculate the vector from the tower to the enemy
    let dx = enemy.pos.x - this.x;
    let dy = enemy.pos.y - this.y;
    console.log("2")
    // Calculate the angle between the tower and the enemy
    let angle = Math.atan2(dy, dx);
    console.log("3")
    context.save()
    // Set the origin point to the center of the tower
    context.translate(this.x + 5, this.y);
    console.log(this.x + " : " + this.y)
  
    // Rotate the tower towards the enemy
    context.rotate(angle + Math.PI / 2);
    context.drawImage(this.image, -this.imageSizeX/2, -this.imageSizeY/2, this.imageSizeX, this.imageSizeY)
    // Reset the origin point to the top-left corner of the tower
 
    //context.translate(-this.x, -this.y);
  
  
    context.restore()
  }
  rotateTowardsPoint(x, y){
    let dx = x - this.x;
    let dy = y - this.y;
    console.log("2")
    // Calculate the angle between the tower and the enemy
    let angle = Math.atan2(dy, dx);
    console.log("3")
    context.save()
    // Set the origin point to the center of the tower
    context.translate(this.x, this.y);
  
    // Rotate the tower towards the enemy
    context.rotate(angle + Math.PI / 2);
    context.drawImage(this.image, -this.imageSizeX/2, -this.imageSizeY/2, this.imageSizeX, this.imageSizeY)
    // Reset the origin point to the top-left corner of the tower
  
    //context.translate(-this.x, -this.y);
  
  
    context.restore()
  }
  
}


class Soldier extends Monkeys {
  
  constructor(x, y, r, attack, range, rcolor){
    super(monkey_img, 64, 64, "a", "dart");
    this.x = x;
    this.y = y;
    this.r = r;
    this.attack = attack;
    this.range = range;
    this.rcolor = rcolor;
    this.target = null;
    this.fireCooldown = 0;
    this.isPlaced = false;
    
  }
  update(){
    this.update2();
  }
  
}

class CatapultMonkey extends Monkeys {
  constructor(x, y, r, attack, range, rcolor){
    super(catapult_img, 100, 100, "b", "catapult");
    this.x = x;
    this.y = y;
    this.r = r;
    this.attack = attack;
    this.range = range;
    this.rcolor = rcolor;
    this.target = null;
    this.fireCooldown = 0;
    this.isPlaced = false;
    
  }

  update() {
    this.update2();
  }
  
}



// -----------------------------------


class Bullet {
  constructor(x, y, speed, damage, direction, bulletType) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.damage = damage;
    this.direction = direction;
    this.bulletType = bulletType;
  }

  move() {
    this.x += this.speed * this.direction.x;
    this.y += this.speed * this.direction.y;
    this.checkCollision()
  }

  checkCollision() {
    
    for (let i = 0; i < enemies.length; i++) {
      let enemy = enemies[i];
      let dist = Math.sqrt((enemy.pos.x - this.x) ** 2 + (enemy.pos.y - this.y) ** 2);
      if (dist < 20) {
        //enemy.health -= this.damage;
        //bullets.splice(indexOf(this), 1);
        enemies.splice(i, 1)
        popAudio.currentTime = 0.235;
        popAudio.play();

        //return true;
        if(this.bulletType == "a"){
          bullets.splice(bullets.indexOf(this), 1)
        }

      }
    }
    //return false;
    
  }

  
}

function calculateDirection(tower, enemy) {
  // Calculate the vector from the tower to the enemy
  let dx1 = enemy.pos.x - tower.x;
  let dy1 = enemy.pos.y - tower.y;
  console.log("dx:", dx1, "dy:", dy1);
  // Normalize the vector to get a unit vector
  let length = Math.sqrt(dx1*dx1 + dy1*dy1);
  let direction = {
    x: dx1 / length,
    y: dy1 / length
  };

  return direction;
}


//-----------------------------------
var towers = []




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
/*function updateS () {
  towers.forEach(function(s){
    s.update();
  });
}*/

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
  context.lineWidth = 0.5;

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
  context.lineWidth = 1;
}

function render (){
  context.fillStyle = bgcolor;
  context.fillRect(0,0,SW,SH)
  
  renderPath();
  renderGrid();

  enemies.forEach(function(s){
    s.render();
  });

  /*towers.forEach(function(v) {
    v.draw();
  })*/

  // Draw your towers
  for (var i = 0; i < towers.length; i++) {

    context.strokeStyle = towers[i].rcolor;
    context.beginPath();
    context.arc(towers[i].x, towers[i].y, towers[i].range, 0, Math.PI*2);
    context.setLineDash([15, 5])
    context.lineWidth = 2;
    context.stroke();
    context.lineWidth = 1;
    context.strokeStyle ="black";
    
   //context.drawImage(monkey_img, towers[i].x -32, towers[i].y-32, 64, 64)
  }
  context.setLineDash([0, 0])
  // Draw the selected tower
  drawSelectedTower();
  drawCatapultMonkeys();

  
}

function changeUpgradeColor(color, firstId) {
  var upgradePath1 = document.getElementById(firstId + 0)
  var upgradePath2 = document.getElementById(firstId + 1)
  var upgradePath3 = document.getElementById(firstId + 2)
  upgradePath1.style.stroke=color;
  upgradePath2.style.stroke=color;
  upgradePath3.style.stroke=color;

}

TEST_BUTTON.addEventListener('click', function(event) { 
  /*var upgradePath1 = document.getElementById("a")
  var upgradePath2 = document.getElementById("b")
  var upgradePath3 = document.getElementById("c")
  upgradePath1.style.stroke="blue";
  upgradePath2.style.stroke="blue";
  upgradePath3.style.stroke="blue";*/
  //changeUpgradeColor("blue", 1)

  if(gold >= 100){
    gold -= 100;
    document.getElementById("gold").innerHTML = `Gold: ${gold}`;
    CatapultMonkey.placing = true;
    document.getElementById("canvas").style.cursor = "move";
    var newCatapult = new CatapultMonkey(event.clientX, event.clientY, 20, 10, 150);
    towers.push(newCatapult);
    selectedTower = newCatapult;
  }
  
  
  
  //console.log(enemies);
  //console.log(enemies[0].pos.x)
  //console.log("tx"+towers[0].x)
  //console.log("ex"+enemies[7].x + "length" + enemies.length)
});
var test = 0;
function renderBullets() {
  
  
  //if(test == 5) {return}
  //shoot()
}
function shoot() {
  /*for (let i = 0; i < towers.length; i++){
    
    console.log("created bullets: " + bullets.length)
    var direction = calculateDirection(towers[i], enemies[0]);
    var newBullet = new Bullet(towers[i].x, towers[i].y, 10, 2, direction);
    bullets.push(newBullet);   
    context.drawImage(bullet_img, newBullet.x - 16, newBullet.y - 16, 32, 32)
    bullets.move()

    for (let e = enemies.length - 1; e>= 0; e--) {
         


      
      let enemy = enemies[e];
      let dist = Math.sqrt((newBullet.x - enemy.pos.x) ** 2 + (newBullet.y - enemy.pos.y) ** 2);
      console.log("3amount of bullets: " + bullets.length)
      if (dist < 50) { // collision detection with a 10-pixel radius around the enemy
        //enemy.health -= bullet.damage;
        bullets.splice(0, 1);
        enemies.splice(e, 1)
        break;
      }
      break;
    }
    /*for (let s = bullets.length - 1; s >= 0; s--) {
      console.log("1amount of bullets: " + bullets.length)
      let bullet = bullets[s];
      bullet.move();
      context.drawImage(bullet_img, bullets[s].x - 16, bullets[s].y - 16, 32, 32)
      console.log("2amount of bullets: " + bullets.length)
      // Check for collisions with enemies
      for (let j = enemies.length - 1; j >= 0; j--) {
        let enemy = enemies[j];
        let dist = Math.sqrt((bullet.x - enemy.pos.x) ** 2 + (bullet.y - enemy.pos.y) ** 2);
        console.log("3amount of bullets: " + bullets.length)
        if (dist < 50) { // collision detection with a 10-pixel radius around the enemy
          //enemy.health -= bullet.damage;
          bullets.splice(s, 1);
          enemies.splice(j, 1)
         break; // break out of the inner loop, since a bullet can only hit one enemy
        }
        console.log("4amount of bullets: " + bullets.length)
      }
      if(towers[i].fireCooldown > 0) {
        towers[i].fireCooldown--
      }
    }
    
  }
  */
}
setInterval(shoot, 5000);

setInterval(renderBullets, 1000/60);
var bullets = []
shooting = true;
function play(){
  update();
  //updateS();
  render();
  renderBullets();
  towers.forEach(function(e){
    if(!enemies[0] && e.isPlaced){
      console.log("rotate to point")
      console.log(e)
      e.rotateTowardsPoint(startPos.x, startPos.y)
      return
    }

    if(!e.target){
      if(e.isPlaced) {
        
        e.update()
        
        e.rotateTowardsEnemy(enemies[0])
        
      }
      
    }
    if(e.target){
      
      if(e.isPlaced){
        e.update()
        //console.log("pre rotate")
        console.log(e.target)
        try{
          e.rotateTowardsEnemy(e.target)
        }catch {
          e.rotateTowardsEnemy(enemies[0])
        }
        //prevents monkey from dissapearing when target is killed
        
        //console.log("rotate")
      }
      
    }
    
    //e.draw()
    
    
  })
  bullets.forEach(function(b){
    b.move()
    b.checkCollision()
  })
  //console.log(bullets.length + "bullet length")
  for(let i = 0; i < bullets.length; i++) {
    console.log(bullets[i].bulletType)
    if(bullets[i].bulletType == "a"){
      context.drawImage(bullet_img, bullets[i].x - 24, bullets[i].y - 24, 48, 48)
      
    } else {
      context.drawImage(catapult_projectile_img, bullets[i].x - 32, bullets[i].y - 32, 64, 64)
    }
    
    bullets[i].move()
  }
  if(musicStart){
    const mainMusic = document.getElementById("main-music");
    mainMusic.volume = 1;
    mainMusic.play();
    musicStart = false;
  }
  //for(let i = 0; i < bullets.length; i++) {
  //  bullets[i].move()
  //}
  //direction = calculateDirection(towers[0], enemies[0]);
  if(gold < 50) {
    changeUpgradeColor("red", 4)
  }
  
  if (!placing){
    /*if(towers[0].fireCooldown == 0) {
      var direction = calculateDirection(towers[0], enemies[0]);
      var newBullet = new Bullet(towers[0].x, towers[0].y, 10, 2, direction);
      bullets.push(newBullet);
      towers[0].fireCooldown = 60;
    }*/
  
    /*for(let i = 0; i<bullets.length; i++){
      bullets[i].direction = direction;
      bullets[i].move()
      context.drawImage(bullet_img, bullets[i].x - 16, bullets[i].y - 16, 32, 32)
    }*/
    
    
    
    
    
    
  }
  
  //bullets[0].move();
  //console.log("x" + bullets[0].x + "y" + bullets[0].y)
  //console.log(bullets[0])
  

  //towers[0].update(enemies, bullets);
  //for (let i = bullets.length - 1; i >= 0; i--) {
  //  let bullet = bullets[i];
  //  bullet.move();}
  //console.log(towers[0].x + "--" + towers[0].y)
  /*
  let enemy = enemies[0];
  let direction = calculateDirection(towers[0], enemy);
  let newBullet = new Bullet(towers[0].x, towers[0].y, 2, 2, direction);
  bullets.push(newBullet);
  
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].move();
    console.log("bullet move ffs" + bullets.length)
  }*/
  
}

setInterval(play, 1000/60);