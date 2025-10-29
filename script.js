document.getElementById("loginBtn").addEventListener("click", () => {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  if (user && pass) {
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("homePage").classList.remove("hidden");
  } else {
    alert("Please enter username and password");
  }
});
document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("homePage").classList.add("hidden");
  document.getElementById("translatorPage").classList.remove("hidden");
});
document.getElementById("logoutBtn").addEventListener("click", () => {
  document.getElementById("translatorPage").classList.add("hidden");
  document.getElementById("loginPage").classList.remove("hidden");
});
document.getElementById("translateBtn").addEventListener("click", async () => {
  const text = document.getElementById("inputText").value.trim();
  const from = document.getElementById("fromLang").value;
  const to = document.getElementById("toLang").value;
  const output = document.getElementById("outputText");
  if (!text) {
    output.textContent = "⚠️ Please enter some text.";
    return;
  }
  output.textContent = "⏳ Translating...";
  try {
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`);
    const data = await res.json();
    output.textContent = data.responseData.translatedText || "❌ Translation failed.";
  } catch (err) {
    output.textContent = "⚠️ Unable to connect to API.";
  }
});
const canvas = document.getElementById("bubbles");
const ctx = canvas.getContext("2d");
let bubbles = [];
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
for (let i = 0; i < 30; i++) {
  bubbles.push({x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 8 + 2, d: Math.random() * 1 + 0.5});
}
function drawBubbles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(88,166,255,0.3)";
  ctx.beginPath();
  bubbles.forEach((b) => {
    ctx.moveTo(b.x, b.y);
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, true);
  });
  ctx.fill();
  moveBubbles();
}
function moveBubbles() {
  bubbles.forEach((b) => {
    b.y -= b.d;
    if (b.y < 0) {
      b.y = canvas.height + b.r;
      b.x = Math.random() * canvas.width;
    }
  });
}
setInterval(drawBubbles, 50);
