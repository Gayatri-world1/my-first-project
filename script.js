let workDuration = 25 * 60; // 25 minutes
let breakDuration = 5 * 60; // 5 minutes
let timeLeft = workDuration;
let isWorkInterval = true;
let timerInterval = null;

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById("timer").textContent =
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
  if (timerInterval) return;

  timerInterval = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
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

function switchInterval() {
  isWorkInterval = !isWorkInterval;
  timeLeft = isWorkInterval ? workDuration : breakDuration;
}