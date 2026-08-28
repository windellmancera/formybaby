const LETTER_PARAGRAPHS = [
  "You are more than beautiful enough, Your imperfections are never something you need to hide, because they’re part of what makes you so beautiful in my eyes. Even the things you’re insecure about are the same things I find beautiful and adorable about you. I wish you could see yourself the way I see you, because maybe then you’d understand just how beautiful you really are to me.",
  "I hope you learn to appreciate yourself the way I appreciate you, because you deserve to see yourself through my eyes. You’re always so good at seeing the beauty in other people, giving them kindness, understanding, and love, but I wish you could give yourself that same kindness too. You deserve the love you so freely give to everyone else.",
  "And, I hope you know just how deeply in love I am with you. It’s not just because you’re beautiful. I’m in love with the way you smile, especially when it’s genuine and you don’t even realize how much it lights up everything around you. I’m in love with the way you laugh, the way you talk, the little things you do without thinking, and even the small habits you probably don’t think are special. Somehow, they all became things I adore about you.",
  "I’m in love with the way you carry yourself through everything. The way you keep going even when things get heavy, the way you try to handle things on your own, and the way you still manage to care about other people even when you have your own battles to deal with. I admire your strength, but I also want you to know that you don’t always have to be strong. You can be tired, you can be vulnerable, you can cry, you can have bad days. You don’t have to hide any part of yourself just to be loved by me.",
  "I love you not only on the days when you feel pretty, confident, and happy, but also on the days when you look at yourself and see nothing worth loving. I’ll still see the same girl I fell so deeply in love with. I’ll still see someone beautiful, precious, and worth choosing.",
  "If you could only see yourself through my eyes, you’d understand why I love every single part of you. I love the way your smile makes my day better. I love the way your presence alone can make everything feel a little lighter. I love the way you make me feel, and most of all, I love who you are when you’re simply being yourself.",
  "You don’t have to change anything to be perfect. You don’t have to become someone else, look different, or fix every little thing you think is wrong with you. You already are enough. More than enough, actually.",
  "And if there’s one thing I hope you never doubt, it’s this: you are deeply loved. Not because of how you look, not because of what you can give, and not because of how perfect you can be, but simply because you are you. Every little thing about you has a place in my heart, even the parts you’re still learning to love yourself. And I hope someday, you’ll finally see the beautiful person I’ve been seeing all along."
];

const BLOOMS = [
  { glyph: "☾", title: "Your smile", text: "Especially the genuine one you don’t even notice." },
  { glyph: "✧", title: "Your laugh", text: "The sound that lights everything up." },
  { glyph: "♡", title: "Your kindness", text: "You give so freely. I want that for you, too." },
  { glyph: "❀", title: "Your strength", text: "You keep going — and you can rest with me." },
  { glyph: "✦", title: "Your presence", text: "You make the whole room feel lighter." },
  { glyph: "♡", title: "You, as you are", text: "Enough. More than enough." }
];

const FOREVER_LINE = "You are deeply loved, simply because you are you.";

const YT_VIDEO_ID = "rGaYGUqivA0";

const scenes = {
  intro: document.getElementById("intro"),
  envelope: document.getElementById("envelopeScene"),
  letter: document.getElementById("letterScene"),
  garden: document.getElementById("gardenScene"),
  forever: document.getElementById("foreverScene")
};

function showScene(name) {
  Object.values(scenes).forEach((el) => el.classList.remove("is-active"));
  scenes[name].classList.add("is-active");
}

document.getElementById("beginBtn").addEventListener("click", () => {
  startSound();
  showScene("envelope");
});

const envelope = document.getElementById("envelope");
envelope.addEventListener("click", () => {
  if (envelope.classList.contains("is-open")) return;
  envelope.classList.add("is-open");
  setTimeout(() => {
    showScene("letter");
    typeLetter();
  }, 1100);
});

async function typeLetter() {
  const body = document.getElementById("letterBody");
  body.innerHTML = "";
  const caret = document.createElement("span");
  caret.className = "caret";

  for (const paragraph of LETTER_PARAGRAPHS) {
    const p = document.createElement("p");
    body.appendChild(p);
    p.appendChild(caret);
    await typeInto(p, paragraph, caret);
    await wait(180);
  }

  caret.remove();
  document.querySelector(".letter-sign").classList.add("is-in");
  await wait(400);
  document.querySelector(".letter-from").classList.add("is-in");
  await wait(500);
  document.getElementById("toGardenBtn").classList.add("is-in");
}

function typeInto(p, text, caret) {
  return new Promise((resolve) => {
    let i = 0;
    const tick = () => {
      const slice = document.createTextNode(text[i]);
      p.insertBefore(slice, caret);
      i += 1;
      if (i < text.length) {
        setTimeout(tick, text[i - 1] === " " ? 8 : 12);
      } else {
        resolve();
      }
    };
    tick();
  });
}

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

document.getElementById("toGardenBtn").addEventListener("click", () => {
  showScene("garden");
  renderGarden();
});

function renderGarden() {
  const garden = document.getElementById("garden");
  garden.innerHTML = "";
  BLOOMS.forEach((item) => {
    const btn = document.createElement("button");
    btn.className = "bloom";
    btn.type = "button";
    btn.innerHTML = `<span class="glyph">${item.glyph}</span><strong>${item.title}</strong><span>${item.text}</span>`;
    btn.addEventListener("click", () => {
      btn.classList.toggle("is-open");
      burstAt(btn);
    });
    garden.appendChild(btn);
  });
  document.getElementById("toForeverBtn").classList.add("is-in");
}

document.getElementById("toForeverBtn").addEventListener("click", () => {
  showScene("forever");
  typeForever();
  celebrate();
});

async function typeForever() {
  const el = document.getElementById("foreverSub");
  el.textContent = "";
  for (const ch of FOREVER_LINE) {
    el.textContent += ch;
    await wait(36);
  }
}

document.getElementById("replayBtn").addEventListener("click", () => {
  envelope.classList.remove("is-open");
  document.querySelector(".letter-sign").classList.remove("is-in");
  document.querySelector(".letter-from").classList.remove("is-in");
  document.getElementById("toGardenBtn").classList.remove("is-in");
  document.getElementById("letterBody").innerHTML = "";
  document.getElementById("foreverSub").textContent = "";
  showScene("intro");
});

const clickLayer = document.getElementById("clickHearts");
document.addEventListener("pointerdown", (event) => {
  if (event.target.closest("button")) return;
  spawnHeart(event.clientX, event.clientY);
});

function spawnHeart(x, y) {
  const el = document.createElement("span");
  el.className = "float-heart";
  el.textContent = Math.random() > 0.5 ? "♥" : "♡";
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.color = Math.random() > 0.5 ? "#7eb8ff" : "#c9e4ff";
  clickLayer.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}

function burstAt(node) {
  const rect = node.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  for (let i = 0; i < 8; i += 1) {
    setTimeout(() => spawnHeart(x + (Math.random() - 0.5) * 80, y + (Math.random() - 0.5) * 40), i * 40);
  }
}

function celebrate() {
  const { innerWidth: w, innerHeight: h } = window;
  for (let i = 0; i < 28; i += 1) {
    setTimeout(() => spawnHeart(Math.random() * w, h * 0.55 + Math.random() * 80), i * 70);
  }
}

const petalsCanvas = document.getElementById("petals");
const sparklesCanvas = document.getElementById("sparkles");
const pctx = petalsCanvas.getContext("2d");
const sctx = sparklesCanvas.getContext("2d");

function sizeCanvases() {
  [petalsCanvas, sparklesCanvas].forEach((c) => {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
  });
}

window.addEventListener("resize", sizeCanvases);
sizeCanvases();

const petals = Array.from({ length: 42 }, () => resetPetal(true));
const sparkles = Array.from({ length: 70 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  r: Math.random() * 1.6 + 0.3,
  a: Math.random(),
  s: Math.random() * 0.02 + 0.005
}));

function resetPetal(anywhere) {
  return {
    x: Math.random() * window.innerWidth,
    y: anywhere ? Math.random() * window.innerHeight : -20,
    s: Math.random() * 10 + 8,
    v: Math.random() * 0.7 + 0.35,
    wobble: Math.random() * Math.PI * 2,
    rot: Math.random() * Math.PI,
    spin: (Math.random() - 0.5) * 0.03,
    hue: 198 + Math.random() * 28
  };
}

function drawPetal(ctx, petal) {
  ctx.save();
  ctx.translate(petal.x, petal.y);
  ctx.rotate(petal.rot);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(petal.s * 0.4, -petal.s * 0.3, petal.s * 0.5, petal.s * 0.4, 0, petal.s);
  ctx.bezierCurveTo(-petal.s * 0.5, petal.s * 0.4, -petal.s * 0.4, -petal.s * 0.3, 0, 0);
  ctx.fillStyle = `hsla(${petal.hue}, 72%, 72%, 0.72)`;
  ctx.fill();
  ctx.restore();
}

function tick() {
  pctx.clearRect(0, 0, petalsCanvas.width, petalsCanvas.height);
  petals.forEach((petal, i) => {
    petal.y += petal.v;
    petal.wobble += 0.02;
    petal.x += Math.sin(petal.wobble) * 0.55;
    petal.rot += petal.spin;
    if (petal.y > petalsCanvas.height + 30) petals[i] = resetPetal(false);
    drawPetal(pctx, petal);
  });

  sctx.clearRect(0, 0, sparklesCanvas.width, sparklesCanvas.height);
  sparkles.forEach((star) => {
    star.a += star.s;
    const alpha = (Math.sin(star.a) + 1) / 2;
    sctx.beginPath();
    sctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    sctx.fillStyle = `rgba(196, 226, 255, ${0.15 + alpha * 0.7})`;
    sctx.fill();
  });

  requestAnimationFrame(tick);
}

tick();

const bgAudio = document.getElementById("bgAudio");
const AUDIO_FILE = "minamahal.mp3";
bgAudio.src = AUDIO_FILE;

let soundOn = false;

bgAudio.addEventListener("play", () => {
  soundOn = true;
});

bgAudio.addEventListener("pause", () => {
  soundOn = false;
});

bgAudio.addEventListener("ended", () => {
  bgAudio.currentTime = 0;
  bgAudio.play();
});

document.addEventListener("pointerdown", () => {
  if (!soundOn) {
    startSound();
  }
}, { once: true });

function startSound() {
  bgAudio.play().catch(() => {
    // Browser autoplay is blocked until a user gesture; the first click on the page is required.
  });
}

function stopSound() {
  soundOn = false;
  bgAudio.pause();
}
