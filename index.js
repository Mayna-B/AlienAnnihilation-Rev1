//Import External JS Links
import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

//Define the Game Canvas
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 850;
canvas.height = 600;

const background = new Image();
background.src = "images/space.png";

//Define the Alien Enemy Bullet and the Player Spacecraft Bullet
const playerBulletController = new BulletController(canvas, 10, "hotpink ", true);
const enemyBulletController = new BulletController(canvas, 4, "white", false);
const enemyController = new EnemyController(
  canvas,
  enemyBulletController,
  playerBulletController
);

//Establish Game Functionality
const player = new Player(canvas, 3, playerBulletController);

let isGameOver = false;
let didWin = false;

function game() {
  checkGameOver();
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  displayGameOver();
  if (!isGameOver) {
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
  }
}

//Add End Game Actions
function displayGameOver() {
  if (isGameOver) {
    let text = didWin ? "You Win" : "Game Over";
    let textOffset = didWin ? 5 : 5;     
  
    ctx.fillStyle = "white";
    ctx.font = "70px Monoton";
    ctx.fillText(text, canvas.width / 5, canvas.height / 2);
  }
}

//Add Variables that will Result in Game Over
function checkGameOver() {
  if (isGameOver) {
    return;
  }

  if (enemyBulletController.collideWith(player)) {
    isGameOver = true;
  }

  if (enemyController.collideWith(player)) {
    isGameOver = true;
  }

  //Add the Winning Game Variable
  if (enemyController.enemyRows.length === 0) {
    didWin = true;
    isGameOver = true;
  }
}

//Define the Game Interval
setInterval(game, 1000 / 60);

