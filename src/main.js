"use strict";
import PopUp from "./popup.js";
let timer = undefined;

const CARROT_SIZE = 80;
const BUG_SIZE = 50;
const controlBtn = document.querySelector(".controlBtn");
const playSquare = document.querySelector("#playSquare");
const gameTimer = document.querySelector(".gameTimer");
const countNum = document.querySelector(".count");
const btmSect = document.querySelector(".bottom__section");
const popUp = document.querySelector(".pop-up");
const popUpText = document.querySelector(".pop-up__message");
const popUpRefresh = document.querySelector(".pop-up__retryBtn");

let count;
let started = false;

const bgSound = new Audio("sound/bg.mp3");
const bugSound = new Audio("sound/bug_pull.mp3");
const carrotSound = new Audio("sound/carrot_pull.mp3");
const alertSound = new Audio("sound/alert.wav");
const winSound = new Audio("sound/game_win.mp3");

// Make an object from Popup class. It contains the result of game
const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  initSetting();
});

// Initiate the game setting
function initSetting() {
  started = false;
  controlBtn.classList.remove("invisible");
  playSquare.classList.remove("fa-square");
  playSquare.classList.add("fa-play");
  gameTimer.innerText = "0 : ?";
  countNum.innerText = "?";
  btmSect.classList.remove("deact");
  btmSect.innerHTML = "";
}

// Arrange each items on game field(bottom section) using for loop
function placement(count) {
  countNum.innerHTML = `${count}`;
  for (let i = 0; i < count; i++) {
    btmSect.appendChild(createItems("bug", i, "img/bug.png", BUG_SIZE));
    btmSect.appendChild(
      createItems("carrot", i, "img/carrot.png", CARROT_SIZE)
    );
  }
}

// create carrots and bugs as element
function createItems(itemName, itemNum, imgPath, itemSize) {
  const item = document.createElement("img");
  item.setAttribute("class", itemName);
  item.setAttribute("data-id", itemNum);
  item.setAttribute("src", imgPath);

  const randomWidth =
    Math.random() * (btmSect.getBoundingClientRect().width - itemSize);
  const randomHeight =
    Math.random() * (btmSect.getBoundingClientRect().height - itemSize);
  item.style.left = `${randomWidth}px`;
  item.style.top = `${randomHeight}px`;
  return item;
}

// Start or stop the game
controlBtn.addEventListener("click", () => {
  if (playSquare.classList.contains("fa-play")) {
    startGame();
  } else if (playSquare.classList.contains("fa-square")) {
    stopGame();
  }
});

// Start the game
function startGame() {
  started = true;
  audioPlay(bgSound);
  count = Math.ceil(Math.random() * 5 + 5);
  playSquare.classList.remove("fa-play");
  playSquare.classList.add("fa-square");
  startGameTimer(count);
  placement(count);
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
    timeOver();
  }
}

// Alert when time is over
function timeOver() {
  audioPlay(alertSound);
  audioStop(bgSound);
  gameFinishBanner.showWithText("RETRY?");
  btmSect.classList.add("deact");
}

// Stop the game
function stopGame() {
  stopGameTimer();
  audioPlay(alertSound);
  gameFinishBanner.showWithText("REPLAY?");
  btmSect.classList.add("deact");
  audioStop(bgSound);
}

function stopGameTimer() {
  clearInterval(timer);
}

// Item located in bottom section clicked
btmSect.addEventListener("click", onFieldClick);
function onFieldClick(event) {
  if (!started) {
    return;
  }
  const target = event.target;
  if (target.matches(".carrot")) {
    removeCarrot(target);
  } else if (target.matches(".bug")) {
    removeBug(target);
  }
}

// Remove targeted carrot
function removeCarrot(carrot) {
  carrot.classList.add("invisible");
  audioPlay(carrotSound);
  count--;
  countNum.innerHTML = `${count}`;
  if (count == 0) {
    finishGame("won");
  }
}
// Remove targeted bug
function removeBug(bug) {
  bug.classList.add("invisible");
  audioPlay(bugSound);
  finishGame("lost");
}

// finish the game
function finishGame(result) {
  if (result === "won") {
    audioPlay(winSound);
    gameFinishBanner.showWithText("YOU WON!");
  } else {
    gameFinishBanner.showWithText("YOU LOST");
  }
  stopGameTimer();
  btmSect.classList.add("deact");
  audioStop(bgSound);
}

// Play an audio
function audioPlay(sound) {
  sound.currentTime = 0;
  sound.play();
}
// Stop an audio
function audioStop(sound) {
  sound.pause();
}
