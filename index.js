const gameBoard = document.querySelector('.gameContainer .gameBoard');
const scoreContainer = document.querySelector('.gameContainer .btns :nth-child(1) span');
const restBtn = document.querySelector('.gameContainer .btns :nth-child(3)');
const leftBtn = document.querySelector('.gameContainer .btns :nth-child(4)');
const rightBtn = document.querySelector('.gameContainer .btns :nth-child(6)');
const downBtn = document.querySelector('.gameContainer .btns :nth-child(5)');
const upBtn = document.querySelector('.gameContainer .btns :nth-child(2)');
const ctx = gameBoard.getContext('2d');
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const unitSize = gameWidth / 20;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX, foodY;
let score = 0;
let snake = [
  {x: unitSize * 2, y:0},
  {x: unitSize, y:0},
  {x: 0, y:0}
];


window.addEventListener('keydown', changeDirction);
restBtn.addEventListener('click', () => {location.reload()});
leftBtn.addEventListener('click', (event) => {
 changeDirction(event, 37)
});
rightBtn.addEventListener('click', (event) => {
 changeDirction(event, 39)
});
upBtn.addEventListener('click', (event) => {
 changeDirction(event, 38)
});
downBtn.addEventListener('click', (event) => {
 changeDirction(event, 40)
});

function gameStart(){
  running = true;
  scoreContainer.textContent = 0;
  createFood();
  drawFood();
  nextFrame();
}
function createFood(){
  const randNum = (max) => Math.round(Math.random() * max / unitSize) * unitSize;
  foodX = randNum(gameWidth - unitSize);
  foodY = randNum(gameHeight - unitSize);
}
function drawFood(){
  ctx.fillStyle = 'red';
  ctx.fillRect(foodX, foodY, unitSize, unitSize);
}
function nextFrame(){
    if (running) {
        setTimeout(() => {
          clearBoard();
          drawFood();
          moveSnake();
          drawSnake();
          checkGameOver();
          nextFrame();
      }, 100);
    } else displayGameOver();
}
function clearBoard(){
  ctx.fillStyle = 'white';
  ctx.fillRect(0,0,gameWidth, gameHeight);
}
function moveSnake(){
  const head = {x: snake[0].x + xVelocity,
                y: snake[0].y + yVelocity};
  snake.unshift(head);
  if (snake[0].x >= 400){snake[0].x = 0}
  if (snake[0].x < 0){snake[0].x = 380}
  if (snake[0].y >= 400){snake[0].y = 0}
  if (snake[0].y < 0){snake[0].y = 380}
  if (snake[0].x == foodX && snake[0].y == foodY) {
    score++
    scoreContainer.textContent = score;
    createFood()
  } else {
    snake.pop()
  }
}
function drawSnake(){
  ctx.fillStyle = 'lightgreen';
  ctx.strokeStyle = 'black';
  snake.forEach(snakePart => {
    ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  })
}
function changeDirction(event, btnPress) {
  const key = !btnPress? event.keyCode: btnPress;
  const left = 37, up = 38, right = 39, down = 40;
  const goingLeft = xVelocity == -unitSize;
  const goingRight = xVelocity == unitSize;
  const goingUp = yVelocity == -unitSize;
  const goingDown = yVelocity == unitSize;
  switch(true){
    case (key == left && !goingRight):
      xVelocity = -unitSize;
      yVelocity = 0;
      break;
    case (key == right && !goingLeft):
      xVelocity = unitSize;
      yVelocity = 0;
      break;
    case (key == up && !goingDown):
      xVelocity = 0;
      yVelocity = -unitSize;
      break;
    case (key == down && !goingUp):
      xVelocity = 0;
      yVelocity = unitSize;
      break;
  }
}
function checkGameOver(){
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) running = false;
  }
}
function displayGameOver() {
  ctx.font = '36px MV boli';
  ctx.fillStyle = "black";
  ctx.textAlign = 'center';
  ctx.fillText("GAME OVER!", gameWidth/2, gameHeight/2);
}

gameStart();