"use strict";

let timer = undefined;

const CARROT_SIZE = 80;
const BUG_SIZE = 50;
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
    btmSect.appendChild(createItems("bug", i, "img/bug.png", BUG_SIZE));
    btmSect.appendChild(
      createItems("carrot", i, "img/carrot.png", CARROT_SIZE)
    );
  }
  const carrots = document.querySelectorAll(".carrot");
  return carrots;
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

// Initiate the game setting
function initSetting() {
  controlBtn.classList.remove("invisible");
  playSquare.classList.remove("fa-square");
  playSquare.classList.add("fa-play");
  gameTimer.innerText = "0 : ?";
  countNum.innerText = "?";
  btmSect.classList.remove("deact");
  btmSect.innerHTML = "";
  result.classList.add("invisible");
}

// Start or stop the game
controlBtn.addEventListener("click", () => {
  if (playSquare.classList.contains("fa-play")) {
    startGame();
  } else {
    stopGame();
  }
});

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
    timeOver();
  }
}

// Alert when time is over
function timeOver() {
  popUp("retry");
  var winAudio = new Audio("./sound/alert.wav");
  btmSect.classList.add("deact");
}

// Stop the game
function stopGame() {
  stopGameTimer();
  audioPlay("sound/alert.wav");
  popUp("retry");
  btmSect.classList.add("deact");
}

function stopGameTimer() {
  clearInterval(timer);
}

// Remove existing carrots
function removeCarrots(carrots, count) {
  carrots.forEach((carrot) => {
    carrot.addEventListener("click", () => {
      carrot.classList.add("invisible");
      audioPlay("sound/carrot_pull.mp3");
      count--;
      countNum.innerHTML = `${count}`;
      if (count == 0) {
        audioPlay("sound/game_win.mp3");
        popUp("won");
        stopGameTimer();
        btmSect.classList.add("deact");
      }
    });
  });
}

// Remove existing bugs
function removeBugs() {
  const bugs = document.querySelectorAll(".bug");
  bugs.forEach((bug) => {
    bug.addEventListener("click", () => {
      bug.classList.add("invisible");
      audioPlay("sound/bug_pull.mp3");
      popUp("lost");
      stopGameTimer();
      btmSect.classList.add("deact");
    });
  });
}

// Retry the game
retryBtn.addEventListener("click", () => {
  initSetting();
});

// Play an audio
function audioPlay(audioPath) {
  var audio = new Audio(audioPath);
  audio.play();
}

// Popup contain the result
function popUp(outcome) {
  result.classList.remove("invisible");
  if (outcome == "won") {
    controlBtn.classList.add("invisible");
    message.innerText = "YOU WON!";
  } else if (outcome == "lost") {
    controlBtn.classList.add("invisible");
    message.innerText = "YOU LOST";
  } else if (outcome == "retry") {
    message.innerText = "RETRY?";
  }
}
