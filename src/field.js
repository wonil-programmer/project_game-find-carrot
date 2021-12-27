"use strict";

const bugSound = new Audio("sound/bug_pull.mp3");
const carrotSound = new Audio("sound/carrot_pull.mp3");

export default class Field {
  constructor() {
    this.field = document.querySelector(".bottom__section");
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener("click", (event) => this.onClick(event));
  }

  init(CARROT_SIZE, BUG_SIZE) {
    this.field.innerHTML = "";
    this.field.classList.remove("deact");
    this._createItems("carrot", "img/carrot.png", CARROT_SIZE);
    this._createItems("bug", "img/bug.png", BUG_SIZE);
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  _createItems(itemName, imgPath, itemSize) {
    const item = document.createElement("img");
    item.setAttribute("class", itemName);
    item.setAttribute("src", imgPath);

    const randomWidth = Math.random() * (this.fieldRect.width - itemSize);
    const randomHeight = Math.random() * (this.fieldRect.height - itemSize);
    item.style.left = `${randomWidth}px`;
    item.style.top = `${randomHeight}px`;
    return item;
  }

  onClick(event) {
    const target = event.target;
    if (target.matches(".carrot")) {
      audioPlay(carrotSound);
      target.remove();
      this.onItemClick && this.onItemClick("carrot");
    } else if (target.matches(".bug")) {
      audioPlay(bugSound);
      target.remove();
      this.onItemClick && this.onItemClick("bug");
    }
  }
}

// Play an audio
function audioPlay(sound) {
  sound.currentTime = 0;
  sound.play();
}
