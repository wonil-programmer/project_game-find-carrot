"use strict";

const controlBtn = document.querySelector(".playBtn");
const playIcon = document.querySelector("#playIcon");
const countNum = document.querySelector(".count");
const btmSect = document.querySelector(".bottom__section");

// Initiate the game setting
let initSum = Math.ceil(Math.random() * 10 + 5);
function initAssem(initSum) {
  countNum.innerHTML = `${initSum}`;
  for (let i = 0; i < initSum; i++) {
    btmSect.appendChild(createCarrot(i));
    btmSect.appendChild(createBug(i));
  }
  const carrots = document.querySelectorAll(".carrot");
  return carrots;
}

// Start the game
controlBtn.addEventListener("click", () => {
  playIcon.classList.remove("fa-play");
  playIcon.classList.add("fa-square");
  const carrotsNode = initAssem(initSum);
  removeCarrots(carrotsNode);
  removeBugs();
});

// Remove existing bugs
function removeBugs() {
  const bugs = document.querySelectorAll(".bug");
  bugs.forEach((bug) => {
    bug.addEventListener("click", () => {
      var bugPullAudio = new Audio("./sound/bug_pull.mp3");
      bugPullAudio.play();
      bug.classList.add("invisible");
    });
  });
}

// Remove existing carrots
function removeCarrots(carrotsNode) {
  carrotsNode.forEach((carrot) => {
    carrot.addEventListener("click", () => {
      var carrotPullAudio = new Audio("./sound/carrot_pull.mp3");
      carrotPullAudio.play();
      carrot.classList.add("invisible");
      initSum--;
      countNum.innerHTML = `${initSum}`;
      if (initSum == 0) {
        console.log("completed");
        var winAudio = new Audio("./sound/game_win.mp3");
        winAudio.play();
      }
    });
  });
}

// create bug icons
function createBug(bugNum) {
  const bug = document.createElement("img");
  bug.setAttribute("class", "bug");
  // bug.setAttribute("class", "invisible");
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

// create carrot icons
function createCarrot(carrotNum) {
  const carrot = document.createElement("img");
  carrot.setAttribute("class", "carrot");
  // carrot.setAttribute("class", "invisible");
  carrot.setAttribute("data-id", carrotNum);
  carrot.setAttribute("src", "img/carrot.png");

  const randomWidth =
    Math.random() * (btmSect.getBoundingClientRect().width - carrot.width);
  // console.log(btmSect.getBoundingClientRect().width - carrot.width);
  const randomHeight =
    Math.random() * (btmSect.getBoundingClientRect().height - carrot.height);

  carrot.style.left = `${randomWidth}px`;
  carrot.style.top = `${randomHeight}px`;
  return carrot;
}
