"use strict";

let timer = undefined;

const controlBtn = document.querySelector(".controlBtn");
const playSquare = document.querySelector("#playSquare");
const gameTimer = document.querySelector(".gameTimer");
const countNum = document.querySelector(".count");
const btmSect = document.querySelector(".bottom__section");
const retryBtn = document.querySelector(".retryBtn");
const result = document.querySelector(".result");
const message = document.querySelector(".message");

// Arrange each items using for loop
function placement(count) {
  countNum.innerHTML = `${count}`;
  for (let i = 0; i < count; i++) {
    btmSect.appendChild(createCarrot(i));
    btmSect.appendChild(createBug(i));
  }
  const carrots = document.querySelectorAll(".carrot");
  return carrots;
}

// Initiate the game setting
function initSetting() {
  btmSect.classList.remove("prevent");
  controlBtn.classList.remove("invisible");
  result.classList.add("invisible");
  playSquare.classList.remove("fa-square");
  playSquare.classList.add("fa-play");
  gameTimer.innerText = "0 : ?";
  countNum.innerText = "?";
  let items = document.querySelectorAll("[data-id]");
  items.forEach((item) => {
    btmSect.removeChild(item);
  });
}

// Start the game
controlBtn.addEventListener("click", () => {
  if (playSquare.classList.contains("fa-play")) {
    startGame();
  } else {
    stopGame();
  }
});

// Stop the game
function stopGame() {
  stopGameTimer();
  var winAudio = new Audio("./sound/alert.wav");
  winAudio.play();
  retryPopup();
}

function stopGameTimer() {
  clearInterval(timer);
}

// Start the game
function startGame() {
  let count = Math.ceil(Math.random() * 5 + 5);
  playSquare.classList.remove("fa-play");
  playSquare.classList.add("fa-square");
  startGameTimer(count);
  const carrotsNode = placement(count);
  removeCarrots(carrotsNode, count);
  removeBugs();
}

// Start the game timer
function startGameTimer(GAME_DURATION_SEC) {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes} : ${seconds}`;
  if (gameTimer.innerText == "0 : 0") {
    retryPopup();
    var winAudio = new Audio("./sound/alert.wav");
    winAudio.play();
  }
}

// Remove existing bugs
function removeBugs() {
  const bugs = document.querySelectorAll(".bug");
  bugs.forEach((bug) => {
    bug.addEventListener("click", () => {
      var bugPullAudio = new Audio("./sound/bug_pull.mp3");
      bugPullAudio.play();
      bug.classList.add("invisible");
      lostPopup();
      stopGameTimer();
    });
  });
}

// Remove existing carrots
function removeCarrots(carrots, count) {
  carrots.forEach((carrot) => {
    carrot.addEventListener("click", () => {
      var carrotPullAudio = new Audio("./sound/carrot_pull.mp3");
      carrotPullAudio.play();
      carrot.classList.add("invisible");
      count--;
      countNum.innerHTML = `${count}`;
      if (count == 0) {
        console.log("completed");
        var winAudio = new Audio("./sound/game_win.mp3");
        winAudio.play();
        wonPopup();
        stopGameTimer();
      }
    });
  });
}

// create bug items
function createBug(bugNum) {
  const bug = document.createElement("img");
  bug.setAttribute("class", "bug");
  bug.setAttribute("data-id", bugNum);
  bug.setAttribute("src", "img/bug.png");

  const randomWidth =
    Math.random() * (btmSect.getBoundingClientRect().width - bug.width);
  const randomHeight =
    Math.random() * (btmSect.getBoundingClientRect().height - bug.height);
  bug.style.left = `${randomWidth}px`;
  bug.style.top = `${randomHeight}px`;
  return bug;
}

// create carrot items
function createCarrot(carrotNum) {
  const carrot = document.createElement("img");
  carrot.setAttribute("class", "carrot");
  carrot.setAttribute("data-id", carrotNum);
  carrot.setAttribute("src", "img/carrot.png");

  const randomWidth =
    Math.random() * (btmSect.getBoundingClientRect().width - carrot.width);
  const randomHeight =
    Math.random() * (btmSect.getBoundingClientRect().height - carrot.height);
  carrot.style.left = `${randomWidth}px`;
  carrot.style.top = `${randomHeight}px`;
  return carrot;
}

// retry the game
retryBtn.addEventListener("click", () => {
  initSetting();
});

// Notify user won or lost or retry the game
function wonPopup() {
  result.classList.remove("invisible");
  controlBtn.classList.add("invisible");
  message.innerText = "YOU WON!";
}
function lostPopup() {
  result.classList.remove("invisible");
  controlBtn.classList.add("invisible");
  message.innerText = "YOU LOST";
}
function retryPopup() {
  result.classList.remove("invisible");
  message.innerText = "RETRY?";
}
