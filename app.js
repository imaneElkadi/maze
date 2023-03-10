// get canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// game variables
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;
let paddle1Y = canvas.height / 2 - 50;
let paddle2Y = canvas.height / 2 - 50;
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;
const BALL_RADIUS = 10;
let player1Score = 0;
let player2Score = 0;

// event listener for mouse movement
canvas.addEventListener("mousemove", function (event) {
  const rect = canvas.getBoundingClientRect();
  const root = document.documentElement;
  paddle1Y = event.clientY - rect.top - root.scrollTop - PADDLE_HEIGHT / 2;
});

// function to draw net
function drawNet() {
  for (let i = 0; i < canvas.height; i += 40) {
    ctx.fillStyle = "white";
    ctx.fillRect(canvas.width / 2 - 1, i, 2, 20);
  }
}

// function to draw ball
function drawBall() {
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(ballX, ballY, BALL_RADIUS, 0, Math.PI * 2, true);
  ctx.fill();
}

// function to draw paddle 1
function drawPaddle1() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT);
}

// function to draw paddle 2
function drawPaddle2() {
  ctx.fillStyle = "white";
  ctx.fillRect(
    canvas.width - PADDLE_WIDTH,
    paddle2Y,
    PADDLE_WIDTH,
    PADDLE_HEIGHT
  );
}

// function to move ball
function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // check if ball hits left paddle
  if (ballX <= PADDLE_WIDTH && ballY >= paddle1Y && ballY <= paddle1Y + PADDLE_HEIGHT) {
    ballSpeedX = -ballSpeedX;
  }

  // check if ball hits right paddle
  if (ballX >= canvas.width - PADDLE_WIDTH - BALL_RADIUS && ballY >= paddle2Y && ballY <= paddle2Y + PADDLE_HEIGHT) {
    ballSpeedX = -ballSpeedX;
  }

  // check if ball hits top or bottom of screen
  if (ballY <= BALL_RADIUS || ballY >= canvas.height - BALL_RADIUS) {
    ballSpeedY = -ballSpeedY;
  }

  // check if ball goes out of bounds on left or right side
  if (ballX <= 0) {
    player2Score++;
    resetBall();
  } else if (ballX >= canvas.width) {
    player1Score++;
    resetBall();
  }
}

// function to reset ball to center of screen
