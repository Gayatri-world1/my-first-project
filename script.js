let workDuration = 25 * 60; // 25 minutes
let breakDuration = 5 * 60; // 5 minutes
let timeLeft = workDuration;
let isWorkInterval = true;
let timerInterval = null;

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById("time-display").textContent =
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
  if (timerInterval) return;

  timerInterval = setInterval(() => {
    timeLeft--;
    console.log("Time left:", timeLeft);
    console.log("Is work interval:", isWorkInterval);
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      playAlertSound();
      switchInterval();
      startTimer();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timeLeft = isWorkInterval ? workDuration : breakDuration;
  updateDisplay();
}

function onPomodoroComplete() {
  incrementBreak();
}

function onBreakComplete() {
  incrementSession();
}

function switchInterval() {
  isWorkInterval = !isWorkInterval;
  timeLeft = isWorkInterval ? workDuration : breakDuration;

  if (isWorkInterval) {
    onBreakComplete();
  } else {
    onPomodoroComplete();
  }
}
const soundSelect = document.getElementById('sound-select');
const savedSound = localStorage.getItem('selectedSound');
if (savedSound) {
  soundSelect.value = savedSound;
}
soundSelect.addEventListener('change', () => {
  localStorage.setItem('selectedSound', soundSelect.value);
});
function playAlertSound() {
  const selectedSound = localStorage.getItem('selectedSound') || 'bell';
  const audio = document.getElementById(selectedSound);
  if (audio) {
    audio.play();
  }
}
updateDisplay();

document.getElementById("start-btn").addEventListener("click", startTimer);
document.getElementById("pause-btn").addEventListener("click", pauseTimer);
document.getElementById("reset-btn").addEventListener("click", resetTimer);

// Initialize counts from localStorage
let sessionCount = localStorage.getItem('sessionCount') || 0;
let breakCount = localStorage.getItem('breakCount') || 0;
// Update UI
document.getElementById('sessionCount').textContent = sessionCount;
document.getElementById('breakCount').textContent = breakCount;
// Increment session count
function incrementSession() {
  sessionCount++;
  localStorage.setItem('sessionCount', sessionCount);
  document.getElementById('sessionCount').textContent = sessionCount;
}
// Increment break count
function incrementBreak() {
  breakCount++;
  localStorage.setItem('breakCount', breakCount);
  document.getElementById('breakCount').textContent = breakCount;
}
// Reset progress manually
document.getElementById('resetProgress').addEventListener('click', () => {
  sessionCount = 0;
  breakCount = 0;
  localStorage.setItem('sessionCount', sessionCount);
  localStorage.setItem('breakCount', breakCount);
  document.getElementById('sessionCount').textContent = sessionCount;
  document.getElementById('breakCount').textContent = breakCount;
});

const toggleBtn = document.getElementById('themeToggle');
toggleBtn.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark-theme');
});
