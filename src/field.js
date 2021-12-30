"use strict";

import * as sound from "./sound.js";

const CARROT_SIZE = 80;
const BUG_SIZE = 50;

export const ItemType = Object.freeze({
  carrot: "carrot",
  bug: "bug",
});
export default class Field {
  constructor() {
    this.field = document.querySelector(".bottom__section");
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener("click", (event) => this.onClick(event));
  }

  initField() {
    this.field.innerHTML = "";
    this.field.classList.remove("deact");
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

  // Arrange each items on game field(bottom section) using for loop
  addItems(itemCount) {
    for (let i = 0; i < itemCount; i++) {
      this.field.appendChild(this._createItems("bug", "img/bug.png", BUG_SIZE));
      this.field.appendChild(
        this._createItems("carrot", "img/carrot.png", CARROT_SIZE)
      );
    }
  }

  onClick(event) {
    const target = event.target;
    if (target.matches(".carrot")) {
      sound.playCarrot();
      target.remove();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    } else if (target.matches(".bug")) {
      sound.playBug();
      target.remove();
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  }

  deact() {
    this.field.classList.add("deact");
  }
}
