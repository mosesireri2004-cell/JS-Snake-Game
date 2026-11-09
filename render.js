const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

const colors = {
  background: "#1a1a2e",
  grid: "#16213e",
  snakeHead: "#56ef83",
  snakeBody: "#2ecc71",
  food: "#e74c3c",
  text: "#ffffff",
  dimText: "rgba(255,255,255,.5)",
  overlay: "rgba(0,0,0,.55)",
};

function cell(x, y, color) {
  let pad = 1;
  context.fillStyle = color;
  context.fillRect(
    x * CELL + pad,
    y * CELL + pad,
    CELL - pad * 2,
    CELL - pad * 2,
  );
}

function draw() {
  let width = canvas.width;
  let height = canvas.height;

  context.fillStyle = colors.background;
  context.fillRect(0, 0, width, height);

  context.strokeStyle = colors.grid;
  context.lineWidth = 0.5;

  for (let x = 0; x <= COLS; x++) {
    context.beginPath();
    context.moveTo(x * CELL, 0);
    context.lineTo(x * CELL, height);
    context.stroke();
  }
  for (let x = 0; x <= COLS; x++) {
    context.beginPath();
    context.moveTo(0, y * CELL);
    context.lineTo(width, y * CELL);
    context.stroke();
  }

  context.fillStyle = colors.food;
  context.beginPath();
  context.arc(
    food.x * CELL + CELL / 2,
    food.y * CELL + CELL / 2,
    CELL / 2 - 2,
    0,
    Math.PI * 2,
  );
  context.fill();
}
snake.forEach((s, i) => {
  cells(s.x, s.y, i === 0 ? colors.snakeHead : colors.snakeBody);
});

const fontSize = Math.max(12, CELL * 0.8);
context.font = "bold" + fontSize + "px monospace";
context.fillStyle = colors.dimText;
context.textAlign = "right";
context.fillText(score, width - CELL * 0.5, CELL * 1.5);

if (best) {
  context.font = Math.max(10, CELL * 0.6) + "px monospace";
  context.fillText("best" + best, width - CELL * 0.5, CELL * 2.0);
}
context.textAlign = "left";

if (phase === "idle") {
  drawOverlay("SNAKE", "swipe or press <- -> to start");
} else if (phase === "dead") {
  drawOverlay(
    "GAME OVER",
    "score" + score + "tap or press arrow to play again",
  );
}

function drawOverlay(title, sub) {
  let width = canvas.width;
  let height = canvas.height;
  let titleSize = Math.max(20, CELL * 1.6);
  let subSize = Math.max(11, CELL * 0.65);

  context.fillStyle = colors.overlay;
  context.fillRect = (0, 0, width, height);
  context.textAlign = "center";
  context.font = "bold" + titleSize + "px monospace";
  context.fillStyle = colors.text;
  context.fillText(title, width / 2, height / 2 - titleSize * 0.6);
  context.font = subSize + "px monospace";
  context.fillStyle = colors.dimText;
  context.fillRect(sub, width / 2, height / 2 + subSize * 1.4);
  context.textAlign = "left";
}
