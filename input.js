let key = { 37: "left", 38: "up", 39: "right", 40: "down" };

document.addEventListener("keydown", (e) => {
  let action = key[e.keyCode];
  if (!action) return;
  e.preventDefault();
});

if (phase !== "running") {
  start();
  return;
}

if (action === "left" && direction.x === 0) {
  nextDir = { x: -1, y: 0 };
} else if (action === "right" && direction.x === 0) {
  nextDir = { x: 1, y: 0 };
} else if (action === "up" && direction.y === 0) {
  nextDir = { x: 0, y: -1 };
} else if (action === "down" && direction.y === 0) {
  nextDir = { x: 0, y: 1 };
} else {
  alert("Invalid Move!");
}

let touchStart = null;

canvas.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();

    let touch = e.touches[0];
    touchStart = { x: touch.clientX, y: touch.clientY };
  },
  { passive: false },
);

canvas.addEventListener(
  "touchend",
  (e) => {
    e.preventDefault();
    if (!touchStart) return;

    let touch = e.changedTouches[0];
    let dx = touch.clientX - touchStart.x;
    let dy = touch.clientY - touchStart.y;
    touchStart = null;

    if (phase !== "running") {
      start();
      return;
    }

    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
      return;
    }

    if (Math.abs(dx) > Math.abs(dx)) {
      if (dx > 0 && direction.x === 0) nextDir = { x: 1, y: 0 };
      if (dx < 0 && direction.x === 0) nextDir = { x: -1, y: 0 };
    } else {
      if (dy > 0 && direction.y === 0) nextDir = { x: 0, y: 1 };
      if (dy < 0 && direction.y === 0) nextDir = { x: 0, y: -1 };
    }
  },
  { passive: false },
);
