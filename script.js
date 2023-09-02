let isRunning = false;
let startTime;
let interval;
let elapsedTime = 0;

const circle = document.querySelector(".circle");
const timeDisplay = document.querySelector(".time");
const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsList = document.getElementById("laps");

function updateTime() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    const totalMilliseconds = elapsedTime;
    const hours = String(Math.floor(totalMilliseconds / 3600000)).padStart(2, "0");
    const minutes = String(Math.floor((totalMilliseconds % 3600000) / 60000)).padStart(2, "0");
    const seconds = String(Math.floor((totalMilliseconds % 60000) / 1000)).padStart(2, "0");
    const milliseconds = String(totalMilliseconds % 1000).padStart(3, "0");
    const formattedTime = `${hours}:${minutes}:${seconds}.${milliseconds}`;
    
    timeDisplay.textContent = formattedTime;

    const percentage = (totalMilliseconds/10 % 1000) / 10;
    const currentAngle = (percentage / 100) * 360;
    circle.style.background = `conic-gradient(#3498db ${currentAngle}deg, transparent ${currentAngle}deg)`;
}

startStopButton.addEventListener("click", function () {
    if (isRunning) {
        clearInterval(interval);
        startStopButton.textContent = "Start";
        lapButton.disabled = true;
    } else {
        startTime = Date.now() - (elapsedTime || 0);
        interval = setInterval(updateTime, 19);
        startStopButton.textContent = "Stop";
        lapButton.disabled = false;
    }
    isRunning = !isRunning;
});

resetButton.addEventListener("click", function () {
    clearInterval(interval);
    isRunning = false;
    startStopButton.textContent = "Start";
    lapButton.disabled = true;
    timeDisplay.textContent = "00:00:00.000";
    elapsedTime = 0;
    circle.style.background = "conic-gradient(#3498db 0deg, transparent 0deg)";
    lapsList.innerHTML = "";
});

lapButton.addEventListener("click", function () {
    const lapTime = timeDisplay.textContent;
    const lapItem = document.createElement("li");
    lapItem.textContent = lapTime;
    lapsList.appendChild(lapItem);
});

resetButton.click();
