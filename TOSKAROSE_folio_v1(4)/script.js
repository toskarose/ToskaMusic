const tracks = [
  { title: "COZY DIARIES", subtitle: "CHAPTER 01", year: "2025", file: "assets/cozy-diaries-ch1.m4a" },
  { title: "COZY DIARIES", subtitle: "CHAPTER 02", year: "2025", file: "assets/cozy-diaries-ch2.m4a" },
  { title: "SADDLE UP", subtitle: "", year: "2024", file: "assets/saddle-up.mp3" },
  { title: "OBSESSED", subtitle: "", year: "2024", file: "assets/obsessed.mp3" },
  { title: "BREAKIN DOWN UR DOOR", subtitle: "", year: "2024", file: "assets/breakin-down-ur-door.mp3" },
  { title: "ALICE IN WONDERLAND", subtitle: "", year: "2023", file: "assets/alice-in-wonderland.mp3" },
  { title: "SPECIAL", subtitle: "", year: "2023", file: "assets/special.mp3" },
  { title: "DELULU", subtitle: "", year: "2023", file: "assets/delulu.mp3" }
];

const enterBtn = document.getElementById("enterBtn");
const soundToggle = document.querySelector(".sound-toggle");
const audio = document.getElementById("audio");
const player = document.getElementById("player");
const playBtn = document.getElementById("playBtn");
const playerIndex = document.getElementById("playerIndex");
const playerTitle = document.getElementById("playerTitle");
const playerYear = document.getElementById("playerYear");
const progressBar = document.getElementById("progressBar");
const playerTime = document.getElementById("playerTime");
const trackButtons = [...document.querySelectorAll(".track")];

let current = 0;

enterBtn.addEventListener("click", () => {
  document.getElementById("sound").scrollIntoView({ behavior: "smooth" });
});

trackButtons.forEach((button) => {
  button.addEventListener("click", () => {
    current = Number(button.dataset.track);
    loadTrack(current, true);
  });
});

function loadTrack(index, autoplay = false) {
  const t = tracks[index];
  current = index;
  audio.src = t.file;
  audio.load();

  playerIndex.textContent = String(index + 1).padStart(2, "0");
  playerTitle.textContent = t.title;
  playerYear.textContent = `${t.year}${t.subtitle ? " · " + t.subtitle : ""}`;
  player.classList.add("show");

  trackButtons.forEach((b, i) => b.classList.toggle("active", i === index));

  if (autoplay) {
    audio.play().then(() => playBtn.textContent = "PAUSE").catch(() => {
      playBtn.textContent = "PLAY";
    });
  }
}

playBtn.addEventListener("click", () => {
  if (!audio.src) loadTrack(current, false);
  if (audio.paused) {
    audio.play().then(() => playBtn.textContent = "PAUSE").catch(() => {});
  } else {
    audio.pause();
    playBtn.textContent = "PLAY";
  }
});

audio.addEventListener("play", () => playBtn.textContent = "PAUSE");
audio.addEventListener("pause", () => playBtn.textContent = "PLAY");
audio.addEventListener("ended", () => {
  playBtn.textContent = "PLAY";
  if (current < tracks.length - 1) loadTrack(current + 1, true);
});
audio.addEventListener("timeupdate", () => {
  progressBar.style.width = audio.duration ? `${(audio.currentTime / audio.duration) * 100}%` : "0%";
  playerTime.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
});

function formatTime(value) {
  if (!Number.isFinite(value)) return "00:00";
  const minutes = Math.floor(value / 60).toString().padStart(2, "0");
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
  el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
});

const cursor = document.querySelector(".cursor-dot");
window.addEventListener("pointermove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

let soundOn = true;
soundToggle.addEventListener("click", () => {
  soundOn = !soundOn;
  soundToggle.innerHTML = `SOUND <span>${soundOn ? "ON" : "OFF"}</span>`;
});

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  const pink = document.querySelector(".forest-pink");
  const blue = document.querySelector(".forest-blue");
  if (pink) pink.style.backgroundPosition = `center ${y * -0.025}px`;
  if (blue) blue.style.backgroundPosition = `center ${y * -0.05}px`;
});
