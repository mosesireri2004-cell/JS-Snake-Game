let COLS = 20;
let ROWS = 20;
let FPS = 9;
let CELL;

let snake;
let direction;
let nextDir;
let food;
let score;
let best;
let phase;
let loopTimer;

function init() {
  snake = [
    { x: 10, y: 10 },
    { X: 9, y: 9 },
    { x: 8, y: 10 },
  ];
  direction = { x: 1, y: 0 };
  nextDir = { x: 1, y: 0 };
  score = 0;
  placeFood();
}

function placeFood() {
  do {
    food = {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS),
    };
  } while (
    snake.some((s) => {
      return s.x === food.x && s.y === food.y;
    })
  );
}

function start() {
  if (loopTimer) clearInterval(loopTimer);
  init();
  phase = "running";
  loopTimer = setInterval(tick, 1000 / FPS);
}

function tick() {
  direction = nextDir;

  let head = {
    x: (snake[0].x + direction.x + COLS) % COLS,
    y: (snake[0].y + direction.y + ROWS) % ROWS,
  };

  if (
    snake.some((s) => {
      return s.x === head.x && s.y === head.y;
    })
  ) {
    phase = "dead";
    best = Math.max(best, score);
    clearInterval(loopTimer);
    draw();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    placeFood();
  } else {
    snake.pop();
  }

  draw();
}

function resize() {
  let size = Math.min(window.innerWidth, window.innerHeight);
  CELL = Math.floor(size, COLS);
  let px = CELL * COLS;
  canvas.width = px;
  canvas.height = px;
  draw();
}

window.addEventListener("resize", resize);

best = 0;
phase = "idle";
init();
resize();
