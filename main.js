"use strict";

const startBtn = document.querySelector(".start");
const btmSect = document.querySelector(".bottom__section");

startBtn.addEventListener("click", () => {
  for (let i = 0; i < 8; i++) {
    btmSect.appendChild(createCarrot(i));
    btmSect.appendChild(createBug(i));
  }
});

function createBug(bugNum) {
  let bug = document.createElement("img");
  bug.setAttribute("class", "bug");
  bug.setAttribute("data-id", bugNum);
  bug.setAttribute("src", "img/bug.png");

  const randomWidth = Math.random() * btmSect.getBoundingClientRect().width;
  const randomHeight = Math.random() * btmSect.getBoundingClientRect().height;

  bug.style.left = `${randomWidth}px`;
  bug.style.top = `${randomHeight}px`;
  return bug;
}

function createCarrot(carrotNum) {
  let carrot = document.createElement("img");
  carrot.setAttribute("class", "carrot");
  carrot.setAttribute("data-id", carrotNum);
  carrot.setAttribute("src", "img/carrot.png");

  const randomWidth = Math.random() * btmSect.getBoundingClientRect().width;
  const randomHeight = Math.random() * btmSect.getBoundingClientRect().height;

  carrot.style.left = `${randomWidth}px`;
  carrot.style.top = `${randomHeight}px`;
  return carrot;
}
