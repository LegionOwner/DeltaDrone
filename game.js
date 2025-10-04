const canvas = document.getElementById("radar");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let targets = [];
let score = 0;
let running = false;

// создать цель
function spawnTarget() {
  targets.push({
    x: Math.random() * canvas.width,
    y: 0,
    speed: 1 + Math.random() * 3
  });
}

// цикл игры
function update() {
  if (!running) return;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // радарный круг
  ctx.strokeStyle = "lime";
  ctx.beginPath();
  ctx.arc(canvas.width/2, canvas.height, 150, 0, Math.PI*2);
  ctx.stroke();

  // цели
  for (let t of targets) {
    t.y += t.speed;
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(t.x, t.y, 6, 0, Math.PI*2);
    ctx.fill();

    if (t.y > canvas.height - 10) {
      log("⚠️ Цель достигла города!");
      targets.splice(targets.indexOf(t),1);
    }
  }

  requestAnimationFrame(update);
}

// лог
function log(msg) {
  const logBox = document.getElementById("log");
  logBox.innerHTML += msg + "<br>";
  logBox.scrollTop = logBox.scrollHeight;
}

// обработка клика — выстрел
canvas.addEventListener("click", e => {
  for (let t of targets) {
    let dx = e.offsetX - t.x;
    let dy = e.offsetY - t.y;
    if (Math.sqrt(dx*dx + dy*dy) < 10) {
      log("🎯 Цель сбита!");
      targets.splice(targets.indexOf(t), 1);
      score++;
      document.getElementById("score").innerText = "Очки: " + score;
      break;
    }
  }
});

// старт
document.getElementById("startBtn").addEventListener("click", () => {
  running = true;
  score = 0;
  targets = [];
  document.getElementById("score").innerText = "Очки: 0";
  document.getElementById("log").innerHTML = "";
  setInterval(spawnTarget, 2000);
  update();
});
