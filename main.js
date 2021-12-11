"use strict";

const controlBtn = document.querySelector(".playBtn");
const playIcon = document.querySelector("#playIcon");
const countNum = document.querySelector(".count");
const btmSect = document.querySelector(".bottom__section");

const initSum = Math.ceil(Math.random() * 10);
console.log(initSum);
// initiate the Game Setting
function initSetting() {
  countNum.innerHTML = `${initSum}`;
  console.log(countNum);
  controlBtn.addEventListener("click", () => {
    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-square");
    for (let i = 0; i < initSum; i++) {
      btmSect.appendChild(createBug(i));
      btmSect.appendChild(createCarrot(i));
    }

    const bugs = document.querySelectorAll(".bug");
    console.log(bugs.length);

    bugs.forEach((bug) => {
      bug.addEventListener("click", () => {
        bug.classList.add("invisible");
      });
    });
  });
}

// function btnStat() {}

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

initSetting();
