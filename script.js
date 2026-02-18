/* ===== Notes (localStorage) ===== */
const NOTES_KEY = "dawn_notes";
const notesInput = document.getElementById("notesInput");
const notesDisplay = document.getElementById("notesDisplay");
const saveNotesBtn = document.getElementById("saveNotes");

function loadNotes() {
  try {
    const saved = localStorage.getItem(NOTES_KEY);
    if (saved) {
      notesDisplay.textContent = saved;
    } else {
      notesDisplay.textContent = "No notes yet. Write something for each other above and click Save.";
    }
  } catch (e) {
    notesDisplay.textContent = "Couldn't load notes.";
  }
}

function saveNotes() {
  const text = notesInput.value.trim();
  if (!text) return;
  try {
    const existing = localStorage.getItem(NOTES_KEY) || "";
    const updated = existing ? existing + "\n\n---\n\n" + text : text;
    localStorage.setItem(NOTES_KEY, updated);
    notesInput.value = "";
    loadNotes();
  } catch (e) {
    notesDisplay.textContent = "Couldn't save. Try again.";
  }
}

if (notesInput) notesInput.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); saveNotes(); } });
if (saveNotesBtn) saveNotesBtn.addEventListener("click", saveNotes);
loadNotes();

/* ===== Pomodoro Timer ===== */
const POMODORO_MIN = 25;
const SHORT_BREAK_MIN = 5;
const LONG_BREAK_MIN = 15;

const modes = [
  { name: "Focus", minutes: POMODORO_MIN },
  { name: "Short break", minutes: SHORT_BREAK_MIN },
  { name: "Long break", minutes: LONG_BREAK_MIN },
];

let currentMode = 0;
let secondsLeft = POMODORO_MIN * 60;
let timerId = null;
let isRunning = false;
let pomodoroCount = 0;

const displayEl = document.getElementById("pomodoroDisplay");
const modeEl = document.getElementById("pomodoroMode");
const messageEl = document.getElementById("pomodoroMessage");
const startBtn = document.getElementById("pomodoroStart");
const resetBtn = document.getElementById("pomodoroReset");

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function setMode(modeIndex) {
  currentMode = modeIndex;
  const m = modes[currentMode];
  secondsLeft = m.minutes * 60;
  if (modeEl) modeEl.textContent = m.name;
  updateDisplay();
  setRandomMessage();
}

function updateDisplay() {
  if (displayEl) displayEl.textContent = formatTime(secondsLeft);
}

function tick() {
  if (secondsLeft <= 0) {
    clearInterval(timerId);
    timerId = null;
    isRunning = false;
    if (startBtn) startBtn.textContent = "Start";
    if (currentMode === 0) {
      pomodoroCount++;
      if (pomodoroCount >= 4) {
        pomodoroCount = 0;
        setMode(2);
      } else {
        setMode(1);
      }
    } else {
      setMode(0);
    }
    return;
  }
  secondsLeft--;
  updateDisplay();
}

function startPause() {
  if (isRunning) {
    clearInterval(timerId);
    timerId = null;
    isRunning = false;
    if (startBtn) startBtn.textContent = "Start";
  } else {
    isRunning = true;
    if (startBtn) startBtn.textContent = "Pause";
    timerId = setInterval(tick, 1000);
  }
}

function resetTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  isRunning = false;
  if (startBtn) startBtn.textContent = "Start";
  setMode(currentMode);
}

if (startBtn) startBtn.addEventListener("click", startPause);
if (resetBtn) resetBtn.addEventListener("click", resetTimer);

const motivationMessages = [
  "You're going to crush this. چای بعد از مطالعه؟",
  "One more chapter and you're a legend.",
  "Your brain is literally getting bigger rn. No cap.",
  "Study now, chai and cuddles later. Worth it.",
  "DDLJ was 3 hours. You can do 25 minutes.",
  "Rumi said keep going. I'm saying it too.",
  "Future you is already proud. Prove them right.",
  "Pyaar mein tum strong, studies mein bhi strong.",
  "Khana khaya? Now focus. You've got this.",
  "Tum hi ho meri study motivation.",
  "Afghan mountains don't quit. Neither do you.",
  "Short break = chai time. You've earned it.",
  "Inshallah you're gonna ace this.",
  "Bollywood hero energy: dramatic but successful.",
  "دل به دل راه داره — so does your brain to that degree.",
  "Take a breath. Then one more page.",
  "This is your main character moment.",
];

function setRandomMessage() {
  if (!messageEl) return;
  const msg = motivationMessages[Math.floor(Math.random() * motivationMessages.length)];
  messageEl.textContent = msg;
}

setMode(0);

/* ===== Motivation cards (study section) ===== */
const motivationGrid = document.getElementById("motivationGrid");
if (motivationGrid) {
  const showMessages = [
    "You're going to crush this. چای بعد از مطالعه؟",
    "One more chapter and you're a legend.",
    "Study now, chai and cuddles later.",
    "DDLJ was 3 hours. You can do 25 minutes.",
    "Pyaar mein tum strong, studies mein bhi strong.",
    "Afghan mountains don't quit. Neither do you.",
    "Inshallah you're gonna ace this.",
    "This is your main character moment.",
  ];
  showMessages.forEach((text) => {
    const card = document.createElement("div");
    card.className = "motivation-card";
    card.textContent = text;
    motivationGrid.appendChild(card);
  });
}

/* ===== Smooth scroll for nav (optional enhancement) ===== */
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
