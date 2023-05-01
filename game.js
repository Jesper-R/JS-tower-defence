var canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
var context = canvas.getContext("2d");

const SW = canvas.width;
const SH = canvas.height;
const SOLDIER_BUTTON = document.getElementById("dart-monkey-button");
const TEST_BUTTON = document.getElementById("catapult-monkey-button");

const RESTART_BUTTON = document.getElementById("restart-button");
const UPGRADE_MONKEY_BUTTON = document.getElementById("upgrade-monkey-button");
const START_BUTTON = document.getElementById("start-button")
const TILE_W = 25;
const swingAudio = document.getElementById("swing-audio");
const popAudio = document.getElementById("pop-audio");
const NUM_ENEMIES = 10;

var monkey_img = new Image();
monkey_img.src = "sprites/default-monkeys/dart-monkey.png";

var catapult_img = new Image();
catapult_img.src = "sprites/default-monkeys/catapult-monkey.png";

var bullet_img = new Image();
bullet_img.src = "sprites/bullets/stone.png";

var catapult_projectile_img = new Image();
catapult_projectile_img.src = "sprites/bullets/spike.svg";

var balloon_img = new Image();
balloon_img.src = "sprites/balloons/balloon-lvl-1.png";

var balloon_img_2 = new Image();
balloon_img_2.src = "sprites/balloons/balloon-lvl-2.png";

var balloon_img_3 = new Image();
balloon_img_3.src = "sprites/balloons/balloon-lvl-3.png";

var balloon_img_4 = new Image();
balloon_img_4.src = "sprites/balloons/balloon-lvl-4.png";

var balloon_img_5 = new Image();
balloon_img_5.src = "sprites/balloons/balloon-lvl-5.png";

var bgcolor = "green";
var target = 1;
var hp = 100;
var gold = 100;
var placing = false;
var musicStart = true;
var dartMonkeyLevel = 1;
var enemies = [];
var selectedTower = null;
var towers = [];
var canUpgrade = true;
var upgradeCost = 50;
var bullets = [];
var roundStart = true;
var round = 0;
var started = false;

function wave1() {
  enemies = [];
  enemyStart.y = 0;
  
  const balloons = [
    { type: RedBalloon, count: 5 },
    { type: BlueBalloon, count: 3 },
  ];
  
  balloons.forEach(balloon => {
    for (let i = 0; i < balloon.count; i++) {
      enemies.push(new balloon.type());
      enemyStart.y -= enemies[enemies.length - 1].spawnOffset;
    }
  });
}

function wave2() {
  enemies = [];
  enemyStart.y = 0;

  const balloons = [
    { type: RedBalloon, count: 10},
    { type: GreenBalloon, count: 3 },
  ];

  balloons.forEach(balloon => {
    for (let i = 0; i < balloon.count; i++) {
      enemies.push(new balloon.type());
      enemyStart.y -= enemies[enemies.length - 1].spawnOffset;
    }
  });
}

function wave3() {
  enemies = [];
  enemyStart.y = 0;

  const balloons = [
    { type: BlueBalloon, count: 5},
    { type: GreenBalloon, count: 2 },
    { type: YellowBalloon, count: 2 },
  ];

  balloons.forEach(balloon => {
    for (let i = 0; i < balloon.count; i++) {
      enemies.push(new balloon.type());
      enemyStart.y -= enemies[enemies.length - 1].spawnOffset;
    }
  });
}

function wave4() {
  enemies = [];
  enemyStart.y = 0;

  const balloons = [
    { type: BlueBalloon, count: 3},
    { type: GreenBalloon, count: 5 },
    { type: YellowBalloon, count: 4 },
  ];

  balloons.forEach(balloon => {
    for (let i = 0; i < balloon.count; i++) {
      enemies.push(new balloon.type());
      enemyStart.y -= enemies[enemies.length - 1].spawnOffset;
    }
  });
}

function wave5() {
  enemies = [];
  enemyStart.y = 0;

  const balloons = [
    { type: PinkBalloon, count: 3},
    { type: GreenBalloon, count: 5 },
    { type: YellowBalloon, count: 4 },
  ];

  balloons.forEach(balloon => {
    for (let i = 0; i < balloon.count; i++) {
      enemies.push(new balloon.type());
      enemyStart.y -= enemies[enemies.length - 1].spawnOffset;
    }
  });
}

function wave6() {
  enemies = [];
  enemyStart.y = 0;

  const balloons = [
    { type: PinkBalloon, count: 3},
    { type: GreenBalloon, count: 0 },
    { type: YellowBalloon, count: 4 },
  ];

  balloons.forEach(balloon => {
    for (let i = 0; i < balloon.count; i++) {
      enemies.push(new balloon.type());
      enemyStart.y -= enemies[enemies.length - 1].spawnOffset;
    }
  });
}

function wave7() {
  enemies = [];
  enemyStart.y = 0;

  const balloons = [
    { type: PinkBalloon, count: 10},
    { type: GreenBalloon, count: 0 },
    { type: YellowBalloon, count: 0 },
  ];

  balloons.forEach(balloon => {
    for (let i = 0; i < balloon.count; i++) {
      enemies.push(new balloon.type());
      enemyStart.y -= enemies[enemies.length - 1].spawnOffset;
    }
  });
}

function wave8() {
  enemies = [];
  enemyStart.y = 0;

  const balloons = [
    { type: PinkBalloon, count: 4},
    { type: GreenBalloon, count: 4 },
    { type: YellowBalloon, count: 4 },
  ];

  balloons.forEach(balloon => {
    for (let i = 0; i < balloon.count; i++) {
      enemies.push(new balloon.type());
      enemyStart.y -= enemies[enemies.length - 1].spawnOffset;
    }
  });
}

function wave9() {
  enemies = [];
  enemyStart.y = 0;

  const balloons = [
    { type: BlueBalloon, count: 10},
    { type: GreenBalloon, count: 5 },
    { type: YellowBalloon, count: 0 },
  ];

  balloons.forEach(balloon => {
    for (let i = 0; i < balloon.count; i++) {
      enemies.push(new balloon.type());
      enemyStart.y -= enemies[enemies.length - 1].spawnOffset;
    }
  });
}

function wave10() {
  enemies = [];
  enemyStart.y = 0;

  const balloons = [
    { type: GreenBalloon, count: 3 },
    { type: YellowBalloon, count: 5 },
    { type: PinkBalloon, count: 15},
  ];

  balloons.forEach(balloon => {
    for (let i = 0; i < balloon.count; i++) {
      enemies.push(new balloon.type());
      enemyStart.y -= enemies[enemies.length - 1].spawnOffset;
    }
  });
}

function infiniteWaves() {
  enemies = [];
  enemyStart.y = 0;

  const balloons = [
    { type: RedBalloon, count: 0},
    { type: BlueBalloon, count: Math.floor(round-2 ** 1.10)},
    { type: GreenBalloon, count: Math.floor(round-2 ** 1.06)},
    { type: YellowBalloon, count: Math.floor(round-2 ** 1.04)},
    { type: PinkBalloon, count: Math.floor(round-2 ** 1.02)},
  ];
  console.log(balloons)
  balloons.forEach(balloon => {
    for (let i = 0; i < balloon.count; i++) {
      enemies.push(new balloon.type());
      enemyStart.y -= enemies[enemies.length - 1].spawnOffset;
    }
  });
}

function generateWave() {
  if (!roundStart) {return;}
  switch (round) {
    case 1:
      wave1()
      break;
    case 2:
      wave2()
      break;
    case 3:
      wave3()
      break;
    case 4:
      wave4()
      break;
    case 5:
      wave5()
      break;
    case 6:
      wave6()
      break;
    case 7:
      wave7()
      break;
    case 8:
      wave8()
      break;
    case 9:
      wave9()
      break;
    case 10:
      wave10()
      break;
    default:
      infiniteWaves()
      break;
  }
  roundStart = false;
}

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
var enemyStart = new Vector(125, 0);
var startPos = new Vector(125, 0);
//bryter upp så jag kan uppdatera vilken ballong som ligger först
var pathData = [
  new Vector(0, 50),
  new Vector(0, 50),
  new Vector(0, 50),
  new Vector(0, 50),

  new Vector(110, 0),
  new Vector(110, 0),
  new Vector(110, 0),
  new Vector(110, 0),
  new Vector(110, 0),

  new Vector(0, 50),
  new Vector(0, 50),
  new Vector(0, 50),
  new Vector(0, 50),

  new Vector(-110, 0),
  new Vector(-110, 0),
  new Vector(-110, 0),
  new Vector(-110, 0),
  new Vector(-110, 0),
  
  new Vector(0, 50),
  new Vector(0, 50),
  new Vector(0, 50),
  new Vector(0, 50),
];

class Enemy {
  constructor(pos, color, r, health, speed) {
    this.pos = pos;
    this.color = color;
    this.r = r;
    this.health = health;
    this.x;
    this.y;
    this.hitBy = [];
    this.targets = [];
    this.targets[0] = new Vector(
      startPos.x + pathData[0].x,
      startPos.y + pathData[0].y
    );

    for (let i = 1; i < pathData.length; i++) {
      let prevTarget = this.targets[i - 1];
      let path = pathData[i];
      let newTarget = new Vector(prevTarget.x + path.x, prevTarget.y + path.y);
      this.targets[i] = newTarget;
      //console.log(newTarget);
    }
    this.currentTarget = this.targets[0];
    this.dir = new Vector(0, 0);
    this.speed = speed;
    this.minTargetDist = 2;
  }

  update() {
    if (this.currentTarget == null) return;
    //calculates direction enemy has to go
    let dir = new Vector(
      this.currentTarget.x - this.pos.x,
      this.currentTarget.y - this.pos.y
    );
    //pythagorean theorum
    let distance = (dir.x ** 2 + dir.y ** 2) ** (1 / 2);
    if (distance == 0) return;

    dir.x /= distance;
    dir.y /= distance;

    this.pos.x += dir.x * this.speed;
    this.pos.y += dir.y * this.speed;

    let xDist = Math.abs(this.pos.x - this.currentTarget.x);
    let yDist = Math.abs(this.pos.y - this.currentTarget.y);

    if (xDist <= this.minTargetDist && yDist <= this.minTargetDist) {
      this.targets.splice(0, 1);

      if (this.targets.length == 0) {
        this.currentTarget == null;
      } else {
        this.currentTarget = this.targets[0];
      }
    }
    //console.log(this.pos.x)
    //console.log(this.pos.y)


    if (599 < this.pos.y) {
      //console.log('delete balloon and remove hp')
      document.getElementById("lives").innerHTML = `HP: ${(hp -= enemies[enemies.indexOf(this)].health)}`;
      enemies.splice(enemies.indexOf(this), 1);
      popAudio.volume = 0.5;
      popAudio.currentTime = 0.235;
      popAudio.play();
      
      if (hp <= 0) {
        document.getElementById("death-screen").style.display = "block";
        started = false;
      }
      
    }
    //console.log("Ballooon color check with" + this.health + "health")
  }

  setBalloonColor(health) {
    //console.log(this.health + "health");

    switch (health) {
      case 1:
        this.image = balloon_img;
        break;
      case 2:
        this.image = balloon_img_2;
        break;
      case 3:
        this.image = balloon_img_3;
        break;
      case 4:
        this.image = balloon_img_4;
        break;
      case 5:
        this.image = balloon_img_5;
        break;
      default:
        this.image = balloon_img;
    }

    context.drawImage(this.image, this.pos.x - 28, this.pos.y - 32, 56, 64);
    //console.log(this.image.src)
  }

  render() {
    this.setBalloonColor(this.health);
  }
}

class RedBalloon extends Enemy {
  constructor(spawnOffset) {
    super(new Vector(enemyStart.x, enemyStart.y), "red", 2, 1, 1);
    this.spawnOffset = 30;
  }
}

class BlueBalloon extends Enemy {
  constructor(spawnOffset) {
    super(new Vector(enemyStart.x, enemyStart.y), "blue", 2, 2, 2);
    this.spawnOffset = 60;
  }
}

class GreenBalloon extends Enemy {
  constructor(spawnOffset) {
    super(new Vector(enemyStart.x, enemyStart.y), "green", 2, 3, 3);
    this.spawnOffset = 80;
  }
}

class YellowBalloon extends Enemy {
  constructor(spawnOffset) {
    super(new Vector(enemyStart.x, enemyStart.y), "yellow", 2, 4, 4);
    this.spawnOffset = 50;
  }
}

class PinkBalloon extends Enemy {
  constructor(spawnOffset) {
    super(new Vector(enemyStart.x, enemyStart.y), "pink", 2, 5, 5);
    this.spawnOffset = 100;
  }
}

function updateBalloonSpeed(health) {
  switch(health) {
    case 1: return 1;
    case 2: return 2;
    case 3: return 3 ;
    case 4: return 4;
    case 5: return 5;
  }
}


SOLDIER_BUTTON.addEventListener("click", function (event) {
  if (gold >= 50) {
    //console.log("start placing")
    gold -= 50;
    document.getElementById("gold").innerHTML = `Gold: ${gold}`;
    Soldier.placing = true;
    document.getElementById("canvas").style.cursor = "move";
    var newTower = new Soldier(
      event.clientX - canvas.getBoundingClientRect().left,
      event.clientY - canvas.getBoundingClientRect().top,
      20,
      10,
      100,
      monkey_img
    );
    towers.push(newTower);
    selectedTower = newTower;
  }
});

RESTART_BUTTON.addEventListener("click", function (event) {
  //location.reload();
  restart();
});
var elem = document.documentElement;


function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

function restart() {
  hp = 100;
  round = 0;
  dartMonkeyLevel = 1;
  document.getElementById("death-screen").style.display = "none";
  towers = []
  enemies = []
  started = true;
  gold = 100;
  updateGold(gold);
  updateHealth(hp);
  updateRound(round);
  target = 1;
  placing = false;
  selectedTower = null;
  canUpgrade = true;
  upgradeCost = 50;
  bullets = [];
  roundStart = true;
  updateUpgradeCost();
  monkey_img.src = "sprites/default-monkeys/dart-monkey.png";
}

START_BUTTON.addEventListener("click", function (event) {
  started = true;
  START_BUTTON.style.display = "none"
  console.log(canvas.clientWidth)
  if (canvas.clientWidth <= 400) {
    openFullscreen();
  }
});

canvas.addEventListener("mousemove", function (event) {
  // Check if the user has selected a tower to place
    // Get the scaled canvas size
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  // Get the actual viewport size
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Calculate the scaling factor
  const scaleX = canvasWidth / viewportWidth;
  const scaleY = canvasHeight / viewportHeight;

  // Get the mouse/touch coordinates
  const x = event.clientX || event.touches[0].clientX;
  const y = event.clientY || event.touches[0].clientY;

  // Convert the coordinates to the unscaled canvas coordinates
  const unscaledX = x * scaleX;
  const unscaledY = y * scaleY;
  
  if (Soldier.placing || CatapultMonkey.placing) {

    var rect = canvas.getBoundingClientRect();
    var sx = canvas.scrollWidth / 480;
    var sy = canvas.scrollHeight / 460;
      
      
    xll = (event.clientX - rect.left) / sx
    yll = (event.clientY - rect.top) / sy
    //winX: evt.clientX
    //winY: evt.clientY
    // Update the position of the selected tower to follow the user's mouse pointer
    console.log(this.clientWidth + "width")
    if (this.clientWidth <= 400) {
      selectedTower.x = (event.clientX - canvas.getBoundingClientRect().left) * 2;
      selectedTower.y = (event.clientY - canvas.getBoundingClientRect().top) * 2;
    } else {
      selectedTower.x = (event.clientX - canvas.getBoundingClientRect().left);
      selectedTower.y = (event.clientY - canvas.getBoundingClientRect().top);
    }
    
    console.log(event.clientX + "client")
    console.log(event.clientX - canvas.getBoundingClientRect().left + "client - rect")
    console.log(selectedTower.x + "canvas")
    console.log(event.clientX - 143 + "true client")
    //console.log("phoneX: " + event.touches[0].clientX)
    
    
    isTowerOnPath(selectedTower);
    isMonkeyOnAnotherMonkey(selectedTower)
  }
});

canvas.addEventListener("click", handleClick, true);

function handleClick() {
 
  if (Soldier.placing) {
    if (!(selectedTower.rcolor == "red")) {
      Soldier.placing = false;
      selectedTower.isPlaced = true;
      document.getElementById("canvas").style.cursor = "default";
    }
  }
  if (CatapultMonkey.placing) {
    if (!(selectedTower.rcolor == "red")) {
      CatapultMonkey.placing = false;
      selectedTower.isPlaced = true;
      document.getElementById("canvas").style.cursor = "default";
    }
  }
}

function isMonkeyOnAnotherMonkey(monkey) {
  towers.forEach(tower => {
    var dist = Math.sqrt(
      (tower.x - selectedTower.x) ** 2 + (tower.y - selectedTower.y) ** 2
    );
    console.log(dist)
    
    if (dist < 25 && towers.length > 1 && dist > 0) {
      selectedTower.rcolor = "red";
    } 
    
  });

  
  
  /*for (let i = 0; i < towers.length; i++) {

    let dist = Math.sqrt(
      (towers[i].x - selectedTower.x) ** 2 + (towers[i].y - selectedTower.y) ** 2
    );
    console.log(monkey.x + "mx")
    console.log(towers[i].x + "tx")
    console.log(towers)
    console.log(dist)
    if (dist < 25 && towers.length > 1 ) {
      selectedTower.rcolor = "red";
      console.log("MONKEY")
      return true;
    } else {
      return false;
    }
  }*/
  
}

function isTowerOnPath(tower) {
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
      pos.x < tower.x &&
      tower.x < pos.x + pos.width &&
      pos.y < tower.y &&
      tower.y < pos.y + pos.height
    );
  });

  if (overlaps) {
    selectedTower.rcolor = "red";
    return true;
  } else {
    selectedTower.rcolor = "black";
    return false;
  }
}

function drawSelectedTower() {
  if (Soldier.placing) {
    Soldier.placing = true;
    context.drawImage(
      monkey_img,
      selectedTower.x - 32,
      selectedTower.y - 32,
      64,
      64
    );
  }
}

function drawCatapultMonkeys() {
  if (CatapultMonkey.placing) {
    CatapultMonkey.placing = true;
    context.drawImage(
      catapult_img,
      selectedTower.x - 50,
      selectedTower.y - 50,
      100,
      100
    );
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

  update2() {
    let closestDist = Infinity;
    let closestEnemy = null;
    let leadingEnemy = null;
    let lastEnemyInRange = null;

    for (let i = 0; i < enemies.length; i++) {
      let dist = Math.sqrt(
        (enemies[i].pos.x - this.x) ** 2 + (enemies[i].pos.y - this.y) ** 2
      );
      if (dist < this.range) {
        leadingEnemy = enemies[i];
        break;
      }
    }

    for (let i = enemies.length - 1; i >= 0; i--) {
      let dist = Math.sqrt(
        (enemies[i].pos.x - this.x) ** 2 + (enemies[i].pos.y - this.y) ** 2
      );
      if (dist < this.range) {
        lastEnemyInRange = enemies[i];
        break;
      }
    }

    // Set the tower's target to the closest enemy within range
    if (this.monkeyType == "dart") {
      this.target = leadingEnemy;
    }
    if (this.monkeyType == "catapult") {
      this.target = lastEnemyInRange;
    }

    // Fire a bullet at the target if the tower is not on cooldown
    if (this.target && this.fireCooldown === 0) {
      let direction = calculateDirection(this, this.target);
      //console.log(direction)
      var newBullet = new Bullet(
        this.x,
        this.y,
        6,
        1,
        direction,
        this.bulletType
      );
      //console.log(newBullet)
      bullets.push(newBullet);
      swingAudio.volume = 0.3;
      swingAudio.currentTime = 0;
      swingAudio.play();
      //enemies.splice(0, 1)
      if (this.monkeyType == "dart") {
        this.fireCooldown = 60; // 60 frames between shots
      }
      if (this.monkeyType == "catapult") {
        this.fireCooldown = 100; // 120 frames between shots
      }
    }
    // Update the fire cooldown
    if (this.fireCooldown > 0) {
      this.fireCooldown--;
    }
  }

  rotateTowardsEnemy(enemy) {
    // Calculate the vector from the tower to the enemy
    let dx = enemy.pos.x - this.x;
    let dy = enemy.pos.y - this.y;
    // Calculate the angle between the tower and the enemy
    let angle = Math.atan2(dy, dx);
    //console.log("3")
    context.save();
    // Set the origin point to the center of the tower
    context.translate(this.x + 5, this.y);
    //console.log(this.x + " : " + this.y)

    // Rotate the tower towards the enemy
    context.rotate(angle + Math.PI / 2);
    context.drawImage(
      this.image,
      -this.imageSizeX / 2,
      -this.imageSizeY / 2,
      this.imageSizeX,
      this.imageSizeY
    );
    // Reset the origin point to the top-left corner of the tower

    //context.translate(-this.x, -this.y);
    context.restore();
  }

  rotateTowardsPoint(x, y) {
    let dx = x - this.x;
    let dy = y - this.y;
    //console.log("2")
    // Calculate the angle between the tower and the enemy
    let angle = Math.atan2(dy, dx);
    //console.log("3")
    context.save();
    // Set the origin point to the center of the tower
    context.translate(this.x, this.y);

    // Rotate the tower towards the enemy
    context.rotate(angle + Math.PI / 2);
    context.drawImage(
      this.image,
      -this.imageSizeX / 2,
      -this.imageSizeY / 2,
      this.imageSizeX,
      this.imageSizeY
    );
    // Reset the origin point to the top-left corner of the tower

    //context.translate(-this.x, -this.y);
    context.restore();
  }
}

class Soldier extends Monkeys {
  constructor(x, y, r, attack, range, rcolor) {
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
  update() {
    this.update2();
  }
}

class CatapultMonkey extends Monkeys {
  constructor(x, y, r, attack, range, rcolor) {
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

class Bullet {
  constructor(x, y, speed, damage, direction, bulletType) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.damage = damage;
    this.direction = direction;
    this.bulletType = bulletType;
    this.cooldown = 0;
  }

  move() {
    this.x += this.speed * this.direction.x;
    this.y += this.speed * this.direction.y;
    this.checkCollision();
  }

  checkCollision() {
    for (let i = 0; i < enemies.length; i++) {
      if (this.bulletType == "a") {
        this.damage = dartMonkeyLevel;
      }
      if (this.bulletType == "b") {
        this.damage = 1;
      }
      
      //console.log("hp" + enemies[i].health);
      let enemy = enemies[i];
      let dist = Math.sqrt(
        (enemy.pos.x - this.x) ** 2 + (enemy.pos.y - this.y) ** 2
      );
      if (dist < 25) {
        //console.log("prethit hp " + enemies[i].health);

        // Making so the balloons hit by catapult dont get instantly deleted by checking if the bullet that hit them is the same object and if it is it
        // will not do damage to the balloon since it already did damage to it
        // This isnt a problem with the dart monkey because the bullet gets deleted right after a hit
        // also makes so it wont give gold for multiple collissions when spike travels over balloon
        if (!enemy.hitBy.includes(this) || this.bulletType == "a") {
          if(enemy.health < this.damage) {
            gold += 3 * enemy.health
            enemy.health -= this.damage;
          } else {
            enemy.health -= this.damage;
            enemy.speed = updateBalloonSpeed(enemy.health)
            enemy.hitBy.push(this)
            gold += 3 * this.damage;
          }
        }
        

        //console.log("posthit hp " + enemies[i].health);
        popAudio.volume = 0.5;
        popAudio.currentTime = 0.235;
        popAudio.play();

        if (enemy.health <= 0) {
          enemies.splice(i, 1);
        }
        updateGold(gold);

        //return true;
        if (this.bulletType == "a") {
          bullets.splice(bullets.indexOf(this), 1);
        }

        /*if (this.cooldown >= 0) {
          this.cooldown--;
        }*/
      }
    }
    //return false;
  }
}
function updateGold(gold) {
  document.getElementById("gold").innerHTML = `Gold: ${gold}`;
}
function updateHealth(health) {
  document.getElementById("lives").innerHTML = `HP: ${health}`;
}
function updateRound(round) {
  document.getElementById("current-round").innerHTML = `Round: ${round}`;
}
function updateUpgradeCost() {
  document.getElementById("dart-upgrade-cost").innerHTML = `${
    50 * dartMonkeyLevel
  }g`;
}

function calculateDirection(tower, enemy) {
  // Calculate the vector from the tower to the enemy
  let dx1 = enemy.pos.x - tower.x;
  let dy1 = enemy.pos.y - tower.y;
  //console.log("dx:", dx1, "dy:", dy1);
  // Normalize the vector to get a unit vector
  let length = Math.sqrt(dx1 * dx1 + dy1 * dy1);
  let direction = {
    x: dx1 / length,
    y: dy1 / length,
  };

  return direction;
}

function update() {
  enemies.forEach(function (e) {
    e.update();
  });
}

function renderPath() {
  let drawPos = new Vector(startPos.x, startPos.y);
  context.fillStyle = "#873e23";

  pathData.forEach(function (path) {
    if (path.x == 0) {
      let x = drawPos.x - TILE_W;
      let y = drawPos.y - TILE_W;
      let w = TILE_W * 2;
      let h = path.y + TILE_W * 2;

      context.fillRect(x, y, w, h);
    }

    if (path.x > 0) {
      let x = drawPos.x - TILE_W;
      let y = drawPos.y - TILE_W;
      let w = path.x + TILE_W * 2;
      let h = TILE_W * 2;

      context.fillRect(x, y, w, h);
    }

    if (path.x < 0) {
      let x = drawPos.x - 25;
      let y = drawPos.y - 25;
      let w = path.x;
      let h = TILE_W * 2;

      context.fillRect(x, y, w, h);
    }

    drawPos.x += path.x;
    drawPos.y += path.y;
  });
}

function renderGrid() {
  context.fillStyle = "black";
  context.lineWidth = 0.5;

  let x = 0;
  for (let i = 0; i < SW / TILE_W; i++) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, 600);
    context.stroke();

    x += TILE_W;
  }

  y = 0;
  for (let i = 0; i < SH / TILE_W; i++) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(800, y);
    context.stroke();

    y += TILE_W;
  }
  context.lineWidth = 1;
}

function render() {
  context.fillStyle = bgcolor;
  context.fillRect(0, 0, SW, SH);
  
  renderPath();
  renderGrid();

  // Create an array of indices for the enemies array
  const enemyIndices = enemies.map((enemy, index) => index);

  // Custom comparison function for sorting the enemy indices by hp
  const compareIndicesByHP = (index1, index2) => {
    return enemies[index1].health - enemies[index2].health;
  };

  // Sort the enemyIndices array using the custom comparison function
  enemyIndices.sort(compareIndicesByHP);

  // Render enemies in ascending order of HP based on the sorted indices
  enemyIndices.forEach(index => {
   enemies[index].render();
  });
 

  // Draw your towers
  for (var i = 0; i < towers.length; i++) {
    context.strokeStyle = towers[i].rcolor;
    context.beginPath();
    context.arc(towers[i].x, towers[i].y, towers[i].range, 0, Math.PI * 2);
    context.setLineDash([15, 5]);
    context.lineWidth = 2;
    context.stroke();
    context.lineWidth = 1;
    context.strokeStyle = "black";

    //context.drawImage(monkey_img, towers[i].x -32, towers[i].y-32, 64, 64)
  }
  context.setLineDash([0, 0]);
  // Draw the selected tower

  drawSelectedTower();

  drawCatapultMonkeys();
}

function changeUpgradeColor(color, firstId) {
  var upgradePath1 = document.getElementById(firstId + 0);
  var upgradePath2 = document.getElementById(firstId + 1);
  var upgradePath3 = document.getElementById(firstId + 2);
  upgradePath1.style.stroke = color;
  upgradePath2.style.stroke = color;
  upgradePath3.style.stroke = color;
}

TEST_BUTTON.addEventListener("click", function (event) {
  if (gold >= 500) {
    gold -= 500;
    document.getElementById("gold").innerHTML = `Gold: ${gold}`;
    CatapultMonkey.placing = true;
    document.getElementById("canvas").style.cursor = "move";
    var newCatapult = new CatapultMonkey(
      event.clientX,
      event.clientY,
      20,
      10,
      150
    );
    towers.push(newCatapult);
    selectedTower = newCatapult;
  }
});

UPGRADE_MONKEY_BUTTON.addEventListener("click", function (event) {
  console.log("level" + dartMonkeyLevel);
  console.log(canUpgrade);

  if (!canUpgrade) {
    return;
  }

  switch (dartMonkeyLevel) {
    case 1:
      monkey_img.src = "sprites/upgrades/dart-monkey-upgrade-2.png";
      break;

    case 2:
      monkey_img.src = "sprites/upgrades/dart-monkey-upgrade-3.png";
      break;

    case 3:
      monkey_img.src = "sprites/upgrades/dart-monkey-upgrade-4.png";
      break;

    case 4:
      monkey_img.src = "sprites/upgrades/dart-monkey-upgrade-5.png";
      document.getElementById("dart-upgrade-cost").innerHTML = "MAX"
      dartMonkeyLevel += 1;
      return;

    default: 
      return;
  }
  gold -= upgradeCost;
  dartMonkeyLevel += 1;
  upgradeCost = 50 * dartMonkeyLevel;
  document.getElementById("gold").innerHTML = `Gold: ${gold}`;
  document.getElementById("dart-upgrade-cost").innerHTML = `${
    50 * dartMonkeyLevel
  }g`;
  console.log("gold" + gold);
  console.log("upgradecost" + upgradeCost);
});

var test = 0;
function renderBullets() {}
function shoot() {}

setInterval(shoot, 5000);

setInterval(renderBullets, 1000 / 60);

shooting = true;

function updateOrder() {
  enemies.sort(function(a,b){return a.targets.length - b.targets.length});
}
function controlButtons() {
  if(started == false) {
    SOLDIER_BUTTON.disabled = true;
    UPGRADE_MONKEY_BUTTON.disabled = true;
    TEST_BUTTON.disabled = true;
    UPGRADE_MONKEY_BUTTON.style.pointerEvents = "none"
  } else {
    SOLDIER_BUTTON.disabled = false;
    UPGRADE_MONKEY_BUTTON.disabled = false;
    TEST_BUTTON.disabled = false;
    UPGRADE_MONKEY_BUTTON.style.pointerEvents = "all"
  }
}
function play() {
  controlButtons();
  render();
  towers.forEach(function (e) {
    if (!enemies[0] && e.isPlaced) {
      //console.log("rotate to point")
      //console.log(e)
      e.rotateTowardsPoint(startPos.x, startPos.y);
      return;
    }

    if (!e.target) {
      if (e.isPlaced) {
        e.update();
        e.rotateTowardsEnemy(enemies[0]);
      }
    }

    if (e.target) {
      if (e.isPlaced) {
        e.update();
        //console.log("pre rotate")
        //console.log(e.target)
        try {
          e.rotateTowardsEnemy(e.target);
        } catch {
          e.rotateTowardsEnemy(enemies[0]);
        }
        //prevents monkey from dissapearing when target is killed
        //console.log("rotate")
      }
    }
  });
  if (!started) {return}
  updateOrder()
  enemies.forEach(enemy => {
    //console.log(enemy.pos.x + ";;;" + enemy.pos.y)
    //console.log(enemy.targets.length)
  });

  if (!enemies[0] && hp > 0) {
    roundStart = true;
    
    round += 1;
    document.getElementById("current-round").innerHTML = `Round: ${round}`
    generateWave();
  }

  if (gold >= upgradeCost) {
    canUpgrade = true;
  } else {
    canUpgrade = false;
  }
  if (canUpgrade && dartMonkeyLevel < 5) {
    changeUpgradeColor("green", 4);
  } else {
    changeUpgradeColor("red", 4);
  }

  update();
  
  renderBullets();

  

  bullets.forEach(function (b) {
    b.move();
  });

  //console.log(bullets.length + "bullet length")
  for (let i = 0; i < bullets.length; i++) {
    //console.log(bullets[i].bulletType)
    if (bullets[i].bulletType == "a") {
      context.drawImage(
        bullet_img,
        bullets[i].x - 24,
        bullets[i].y - 24,
        48,
        48
      );
    } else {
      context.drawImage(
        catapult_projectile_img,
        bullets[i].x - 32,
        bullets[i].y - 32,
        64,
        64
      );
    }

    bullets[i].move();
  }

  if (musicStart) {
    const mainMusic = document.getElementById("main-music");
    mainMusic.volume = 0.2;
    mainMusic.play();
    musicStart = false;
  }

  if (gold < 50) {
    changeUpgradeColor("red", 4);
  }

  
}

setInterval(play, 1000 / 60);
