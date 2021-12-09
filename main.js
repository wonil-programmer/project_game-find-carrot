"use strict";

const startBtn = document.querySelector(".start");
const carrot = document.querySelector(".carrot");
const btmSect = document.querySelector(".bottom__section");

startBtn.addEventListener("click", () => {
  console.log(btmSect.getBoundingClientRect());
  createBug();
});

function createBug() {
  btmSect.innerHTML = `
  <img class="bug" id="bug1" src="img/bug.png" alt="bug" />
  `;
  const randomWidth = Math.random() * btmSect.getBoundingClientRect().width;
  const randomHeight = Math.random() * btmSect.getBoundingClientRect().height;
  const bug = document.querySelector("#bug1");
  bug.style.left = `${randomWidth}px`;
  bug.style.top = `${randomHeight}px`;
}

// for (i = 0; i <= 10; i++) {

// }
