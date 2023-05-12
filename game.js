var canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
var context = canvas.getContext("2d");

const SW = canvas.width;
const SH = canvas.height;
const DART_BUTTON = document.getElementById("dart-monkey-button");
const CATAPULT_BUTTON = document.getElementById("catapult-monkey-button");
const RESTART_BUTTON = document.getElementById("restart-button");
const UPGRADE_MONKEY_BUTTON = document.getElementById("upgrade-monkey-button");
const START_BUTTON = document.getElementById("start-button");
const TILE_W = 25;
const SWING_AUDIO = document.getElementById("swing-audio");
const POP_AUDIO = document.getElementById("pop-audio");
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
  const balloons = [
    { type: RedBalloon, count: 5 },
    { type: BlueBalloon, count: 3 },
  ];

  spawnBalloons(balloons);
}

function wave2() {
  const balloons = [
    { type: RedBalloon, count: 10 },
    { type: GreenBalloon, count: 3 },
  ];

  spawnBalloons(balloons);
}

function wave3() {
  const balloons = [
    { type: BlueBalloon, count: 5 },
    { type: GreenBalloon, count: 2 },
    { type: YellowBalloon, count: 2 },
  ];

  spawnBalloons(balloons);
}

function wave4() {
  const balloons = [
    { type: BlueBalloon, count: 3 },
    { type: GreenBalloon, count: 5 },
    { type: YellowBalloon, count: 4 },
  ];

  spawnBalloons(balloons);
}

function wave5() {
  const balloons = [
    { type: PinkBalloon, count: 3 },
    { type: GreenBalloon, count: 5 },
    { type: YellowBalloon, count: 4 },
  ];

  spawnBalloons(balloons);
}

function wave6() {
  const balloons = [
    { type: PinkBalloon, count: 3 },
    { type: GreenBalloon, count: 0 },
    { type: YellowBalloon, count: 4 },
  ];

  spawnBalloons(balloons);
}

function wave7() {
  const balloons = [
    { type: PinkBalloon, count: 10 },
    { type: GreenBalloon, count: 0 },
    { type: YellowBalloon, count: 0 },
  ];

  spawnBalloons(balloons);
}

function wave8() {
  const balloons = [
    { type: PinkBalloon, count: 4 },
    { type: GreenBalloon, count: 4 },
    { type: YellowBalloon, count: 4 },
  ];

  spawnBalloons(balloons);
}

function wave9() {
  const balloons = [
    { type: BlueBalloon, count: 10 },
    { type: GreenBalloon, count: 5 },
    { type: YellowBalloon, count: 0 },
  ];

  spawnBalloons(balloons);
}

function wave10() {
  const balloons = [
    { type: GreenBalloon, count: 3 },
    { type: YellowBalloon, count: 5 },
    { type: PinkBalloon, count: 15 },
  ];

  spawnBalloons(balloons);
}

function infiniteWaves() {
  const balloons = [
    { type: RedBalloon, count: 0 },
    { type: BlueBalloon, count: Math.floor(round - 2 ** 1.1) },
    { type: GreenBalloon, count: Math.floor(round - 2 ** 1.06) },
    { type: YellowBalloon, count: Math.floor(round - 2 ** 1.04) },
    { type: PinkBalloon, count: Math.floor(round - 2 ** 1.02) },
  ];

  console.log(balloons);
  spawnBalloons(balloons);
}

function spawnBalloons(balloons) {
  enemies = [];
  BalloonStart.y = 0;

  balloons.forEach((balloon) => {
    for (let i = 0; i < balloon.count; i++) {
      enemies.push(new balloon.type());
      BalloonStart.y -= enemies[enemies.length - 1].spawnOffset;
    }
  });
}

function generateWave() {
  if (!roundStart) {
    return;
  }
  switch (round) {
    case 1:
      wave1();
      break;
    case 2:
      wave2();
      break;
    case 3:
      wave3();
      break;
    case 4:
      wave4();
      break;
    case 5:
      wave5();
      break;
    case 6:
      wave6();
      break;
    case 7:
      wave7();
      break;
    case 8:
      wave8();
      break;
    case 9:
      wave9();
      break;
    case 10:
      wave10();
      break;
    default:
      infiniteWaves();
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
var BalloonStart = new Vector(125, 0);
var startPos = new Vector(125, 0);

//breaking up pathData so I can update whos in first easily
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

class Balloon {
  constructor(pos, color, health, speed) {
    this.pos = pos;
    this.color = color;
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
    }

    this.currentTarget = this.targets[0];
    this.dir = new Vector(0, 0);
    this.speed = speed;
    this.minTargetDist = 2;
  }

  update() {
    if (this.currentTarget == null) return;

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
      POP_AUDIO.volume = 0.5;
      POP_AUDIO.currentTime = 0.235;
      POP_AUDIO.play();

      if (hp <= 0) {
        document.getElementById("death-screen").style.display = "block";
        started = false;
      }
    }
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

class RedBalloon extends Balloon {
  constructor(spawnOffset) {
    super(new Vector(BalloonStart.x, BalloonStart.y), "red", 1, 1);
    this.spawnOffset = 30;
  }
}

class BlueBalloon extends Balloon {
  constructor(spawnOffset) {
    super(new Vector(BalloonStart.x, BalloonStart.y), "blue", 2, 2);
    this.spawnOffset = 60;
  }
}

class GreenBalloon extends Balloon {
  constructor(spawnOffset) {
    super(new Vector(BalloonStart.x, BalloonStart.y), "green", 3, 3);
    this.spawnOffset = 80;
  }
}

class YellowBalloon extends Balloon {
  constructor(spawnOffset) {
    super(new Vector(BalloonStart.x, BalloonStart.y), "yellow", 4, 4);
    this.spawnOffset = 50;
  }
}

class PinkBalloon extends Balloon {
  constructor(spawnOffset) {
    super(new Vector(BalloonStart.x, BalloonStart.y), "pink", 5, 5);
    this.spawnOffset = 100;
  }
}

function updateBalloonSpeed(health) {
  switch (health) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 3:
      return 3;
    case 4:
      return 4;
    case 5:
      return 5;
  }
}

DART_BUTTON.addEventListener("click", function (event) {
  if (gold >= 50) {
    //console.log("start placing")
    gold -= 50;
    document.getElementById("gold").innerHTML = `Gold: ${gold}`;
    DartMonkey.placing = true;
    DART_BUTTON.style.pointerEvents = "none";
    CATAPULT_BUTTON.style.pointerEvents = "none";
    document.getElementById("canvas").style.cursor = "move";
    var newTower = new DartMonkey(
      event.clientX - canvas.getBoundingClientRect().left,
      event.clientY - canvas.getBoundingClientRect().top,
      100,
    );
    towers.push(newTower);
    selectedTower = newTower;
  }
});

CATAPULT_BUTTON.addEventListener("click", function (event) {
  if (gold >= 500) {
    gold -= 500;
    document.getElementById("gold").innerHTML = `Gold: ${gold}`;
    CatapultMonkey.placing = true;
    document.getElementById("canvas").style.cursor = "move";
    var newCatapult = new CatapultMonkey(
      event.clientX,
      event.clientY,
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
      document.getElementById("dart-upgrade-cost").innerHTML = "MAX";
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

RESTART_BUTTON.addEventListener("click", function (event) {
  //location.reload();
  restart();
});

function restart() {
  hp = 100;
  round = 0;
  dartMonkeyLevel = 1;
  document.getElementById("death-screen").style.display = "none";
  towers = [];
  enemies = [];
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
  START_BUTTON.style.display = "none";
  console.log(canvas.clientWidth);
  if (canvas.clientWidth < 800) {
    openFullscreen();
  }
});

var elem = document.documentElement;

function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}

function controlButtons() {
  if (started == false) {
    DART_BUTTON.disabled = true;
    UPGRADE_MONKEY_BUTTON.disabled = true;
    CATAPULT_BUTTON.disabled = true;
    UPGRADE_MONKEY_BUTTON.style.pointerEvents = "none";
  } else {
    DART_BUTTON.disabled = false;
    UPGRADE_MONKEY_BUTTON.disabled = false;
    CATAPULT_BUTTON.disabled = false;
    UPGRADE_MONKEY_BUTTON.style.pointerEvents = "all";
  }
}

canvas.addEventListener("mousemove", function (event) {
  if (DartMonkey.placing || CatapultMonkey.placing) {
    //console.log(this.clientWidth + "clientw");
    //console.log(canvas.width + "canbasww");

    var scaledX = 800 / this.clientWidth;
    var scaledY = 600 / this.clientHeight;

    // Update the position of the selected tower to follow the user's mouse pointer
    //console.log(this.clientWidth + "width");
    selectedTower.x = (event.clientX - canvas.getBoundingClientRect().left) * scaledX;
    selectedTower.y = (event.clientY - canvas.getBoundingClientRect().top) * scaledY;

    //console.log(event.clientX + "client");
    //console.log(event.clientX - canvas.getBoundingClientRect().left + "client - rect");
    //console.log(selectedTower.x + "canvas");
    //console.log(event.clientX - 143 + "true client");

    isTowerOnPath(selectedTower);
    isMonkeyOnAnotherMonkey(selectedTower);
  }
});

canvas.addEventListener("click", function (event) {
  if (DartMonkey.placing) {
    if (!(selectedTower.rcolor == "red")) {
      DartMonkey.placing = false;
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
  DART_BUTTON.style.pointerEvents = "all";
  CATAPULT_BUTTON.style.pointerEvents = "all";
});


function isMonkeyOnAnotherMonkey(monkey) {
  towers.forEach((tower) => {
    var dist = Math.sqrt((tower.x - selectedTower.x) ** 2 + (tower.y - selectedTower.y) ** 2);
    //console.log(dist);

    if (dist < 35 && towers.length > 1 && dist > 0) {
      selectedTower.rcolor = "red";
    }
  });
}

function isTowerOnPath(tower) {

  const pathValues = [
    { x: 100, y: 0, width: 50, height: 225 },
    { x: 100, y: 175, width: 600, height: 50 },
    { x: 100, y: 375, width: 600, height: 50 },
    { x: 650, y: 175, width: 50, height: 250 },
    { x: 100, y: 375, width: 50, height: 225 },
  ];

  const overlaps = pathValues.some((pos) => {
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

function drawSelectedMonkey() {
  if (DartMonkey.placing) {
    DartMonkey.placing = true;
    context.drawImage(
      monkey_img,
      selectedTower.x - 32,
      selectedTower.y - 32,
      64,
      64
    );
  }
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

  updateMonkey() {
    let closestDist = Infinity;
    let closestBalloon = null;
    let leadingBalloon = null;
    let lastBalloonInRange = null;

    for (let i = 0; i < enemies.length; i++) {
      let dist = Math.sqrt((enemies[i].pos.x - this.x) ** 2 + (enemies[i].pos.y - this.y) ** 2);
      if (dist < this.range) {
        leadingBalloon = enemies[i];
        break;
      }
    }

    for (let i = enemies.length - 1; i >= 0; i--) {
      let dist = Math.sqrt((enemies[i].pos.x - this.x) ** 2 + (enemies[i].pos.y - this.y) ** 2);
      if (dist < this.range) {
        lastBalloonInRange = enemies[i];
        break;
      }
    }

    // Set the towers target 
    if (this.monkeyType == "dart") {
      this.target = leadingBalloon;
    }
    if (this.monkeyType == "catapult") {
      this.target = lastBalloonInRange;
    }

    // Fire a bullet at the target if the tower is not on cooldown
    if (this.target && this.fireCooldown === 0) {
      let direction = calculateDirection(this, this.target);
      //console.log(direction)
      var newBullet = new Bullet(
        this.x,
        this.y,
        12,
        1,
        direction,
        this.bulletType
      );
      //console.log(newBullet)
      bullets.push(newBullet);
      SWING_AUDIO.volume = 0.3;
      SWING_AUDIO.currentTime = 0;
      SWING_AUDIO.play();

      if (this.monkeyType == "dart") {
        this.fireCooldown = 60;
      }
      if (this.monkeyType == "catapult") {
        this.fireCooldown = 100;
      }
    }
    // Update the fire cooldown
    if (this.fireCooldown > 0) {
      this.fireCooldown--;
    }
  }

  rotateTowardsBalloon(Balloon) {
    // Calculate the vector from the tower to the Balloon
    let dx = Balloon.pos.x - this.x;
    let dy = Balloon.pos.y - this.y;
    // Calculate the angle between the tower and the Balloon
    let angle = Math.atan2(dy, dx);
    context.save();
    // Set the origin point to the center of the tower
    context.translate(this.x, this.y);
    //console.log(this.x + " : " + this.y)

    // Rotate the tower towards the Balloon
    context.rotate(angle + Math.PI / 2);
    context.drawImage(
      this.image,
      -this.imageSizeX / 2,
      -this.imageSizeY / 2,
      this.imageSizeX,
      this.imageSizeY
    );
    context.restore();
  }

  rotateTowardsPoint(x, y) {
    let dx = x - this.x;
    let dy = y - this.y;
    // Calculate the angle between the tower and the point
    let angle = Math.atan2(dy, dx);
    context.save();
    // Set the origin point to the center of the tower
    context.translate(this.x, this.y);
    // Rotate the tower towards the point
    context.rotate(angle + Math.PI / 2);
    context.drawImage(
      this.image,
      -this.imageSizeX / 2,
      -this.imageSizeY / 2,
      this.imageSizeX,
      this.imageSizeY
    );
    context.restore();
  }
}

class DartMonkey extends Monkeys {
  constructor(x, y, range) {
    super(monkey_img, 64, 64, "a", "dart");
    this.x = x;
    this.y = y;
    this.range = range;
    this.rcolor = "black";
    this.target = null;
    this.fireCooldown = 0;
    this.isPlaced = false;
  }
  update() {
    this.updateMonkey();
  }
}

class CatapultMonkey extends Monkeys {
  constructor(x, y, range) {
    super(catapult_img, 100, 100, "b", "catapult");
    this.x = x;
    this.y = y;
    this.range = range;
    this.rcolor = "black";
    this.target = null;
    this.fireCooldown = 0;
    this.isPlaced = false;
  }

  update() {
    this.updateMonkey();
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
      let Balloon = enemies[i];
      let dist = Math.sqrt(
        (Balloon.pos.x - this.x) ** 2 + (Balloon.pos.y - this.y) ** 2
      );
      if (dist < 25) {
        //console.log("prethit hp " + enemies[i].health);

        // Making so the balloons hit by catapult dont get instantly deleted by checking if the bullet that hit them is the same object and if it is it
        // will not do damage to the balloon since it already did damage to it
        // This isnt a problem with the dart monkey because the bullet gets deleted right after a hit
        // also makes so it wont give gold for multiple collissions when spike travels over balloon
        if (!Balloon.hitBy.includes(this) || this.bulletType == "a") {
          if (Balloon.health < this.damage) {
            gold += 3 * Balloon.health;
            Balloon.health -= this.damage;
          } else {
            Balloon.health -= this.damage;
            Balloon.speed = updateBalloonSpeed(Balloon.health);
            Balloon.hitBy.push(this);
            gold += 3 * this.damage;
          }
        }

        //console.log("posthit hp " + enemies[i].health);
        POP_AUDIO.volume = 0.5;
        POP_AUDIO.currentTime = 0.235;
        POP_AUDIO.play();

        if (Balloon.health <= 0) {
          enemies.splice(i, 1);
        }

        updateGold(gold);

        if (this.bulletType == "a") {
          bullets.splice(bullets.indexOf(this), 1);
        }

      }
    }
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

function calculateDirection(tower, Balloon) {
  // Calculate the vector from the tower to the Balloon
  let dx1 = Balloon.pos.x - tower.x;
  let dy1 = Balloon.pos.y - tower.y;
  //console.log("dx:", dx1, "dy:", dy1);
  // Normalize the vector to get a unit vector
  let length = Math.sqrt(dx1 * dx1 + dy1 * dy1);
  let direction = {
    x: dx1 / length,
    y: dy1 / length,
  };

  return direction;
}

function updateBalloons() {
  enemies.forEach(function (e) {
    e.update();
  });
}

function updateBullets() {
  bullets.forEach(function (b) {
    if (b.bulletType == "a") {
      context.drawImage(
        bullet_img,
        b.x - 24,
        b.y - 24,
        48,
        48
      );
    } else {
      context.drawImage(
        catapult_projectile_img,
        b.x - 32,
        b.y - 32,
        64,
        64
      );
    }
    b.move();
  });
}

function startMusic() {
  if (musicStart) {
    const mainMusic = document.getElementById("main-music");
    mainMusic.volume = 0.2;
    mainMusic.play();
    musicStart = false;
  }
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
      let x = drawPos.x - TILE_W;
      let y = drawPos.y - TILE_W;
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

function getBalloonIndicesByHealth() {
  // Create an array of indices for the enemies array
  const BalloonIndices = enemies.map((Balloon, index) => index);

  // Comparison function for sorting the Balloon indices by hp
  const compareIndicesByHP = (index1, index2) => {
    return enemies[index1].health - enemies[index2].health;
  };

  BalloonIndices.sort(compareIndicesByHP);

  // Render enemies in ascending order of HP based on the sorted indices
  BalloonIndices.forEach((index) => {
    enemies[index].render();
  });
}

function renderMonkeys() {
  towers.forEach(function (t) {
    if (!enemies[0] && t.isPlaced) {
      t.rotateTowardsPoint(startPos.x, startPos.y);
      return;
    }

    if (!t.target) {
      if (t.isPlaced) {
        t.update();
        t.rotateTowardsBalloon(enemies[0]);
      }
    }

    if (t.target) {
      if (t.isPlaced) {
        t.update();
        //console.log("pre rotate")
        //console.log(e.target)
        try {
          t.rotateTowardsBalloon(t.target);
        } catch {
          t.rotateTowardsBalloon(enemies[0]);
        }
        //prevents monkey from dissapearing when target is killed
        //console.log("rotate")
      }
    }

    // render tower ranges
    context.strokeStyle = t.rcolor;
    context.beginPath();
    context.arc(t.x, t.y, t.range, 0, Math.PI * 2);
    context.setLineDash([15, 5]);
    context.lineWidth = 2;
    context.stroke();
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.setLineDash([0, 0]);
  });

  // Draw the selected tower if any exist
  drawSelectedMonkey();
}

function render() {
  context.fillStyle = bgcolor;
  context.fillRect(0, 0, SW, SH);

  renderPath();
  renderGrid();
  getBalloonIndicesByHealth();
  renderMonkeys();
}

function changeUpgradeColor(color, firstId) {
  var upgradePath1 = document.getElementById(firstId + 0);
  var upgradePath2 = document.getElementById(firstId + 1);
  var upgradePath3 = document.getElementById(firstId + 2);
  upgradePath1.style.stroke = color;
  upgradePath2.style.stroke = color;
  upgradePath3.style.stroke = color;
}

function checkForRoundStart() {
  if (!enemies[0] && hp > 0) {
    roundStart = true;
    round += 1;
    document.getElementById("current-round").innerHTML = `Round: ${round}`;
    generateWave();
  }
}

function checkUpdateButtonColor() {
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
}

function updateOrder() {
  enemies.sort(function (a, b) {
    return a.targets.length - b.targets.length;
  });
}

function play() {
  controlButtons();
  render();
  
  if (!started) {return;}

  updateOrder();
  checkForRoundStart();
  checkUpdateButtonColor();
  updateBalloons();
  updateBullets();
  startMusic();
}

setInterval(play, 1000 / 60);