"use strict";
import Field from "./field.js";
import * as sound from "./sound.js";

export const Reason = Object.freeze({
  won: "won",
  lost: "lost",
  cancel: "cancel",
});

export default class Game {
  constructor() {
    this.randomNum = 0;

    this.btnSquare = document.querySelector("#btnSquare");
    this.gameBtn = document.querySelector(".gameBtn");
    this.started = false;
    // Start or stop the game by click game button
    this.gameBtn.addEventListener("click", () => {
      if (!this.started) {
        this.randomNum = Math.ceil(Math.random() * 5 + 5);
        this.count = this.randomNum;
        this.gameDuration = this.randomNum;
        this.showStopButton();
        this.start();
      } else {
        this.stop(Reason.cancel);
      }
    });

    this.timer = undefined;
    this.gameTimer = document.querySelector(".gameTimer");
    this.gameCount = document.querySelector(".gameCount");

    this.gameField = new Field();
    this.gameField.setClickListener(this.onItemClick);
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  // Item located in bottom section clicked
  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === "carrot") {
      this.count--;
      this.gameCount.innerHTML = `${this.count}`;
      if (this.count == 0) {
        this.stop(Reason.won);
      }
    } else if (item === "bug") {
      this.stop(Reason.lost);
    }
  };

  // Initiate the game setting
  initGame() {
    this.started = false;
    this.showPlayButton();
    this.showGameButton();
    this.gameTimer.innerText = "0 : ?";
    this.gameCount.innerText = "?";
    this.gameField.initField();
  }

  start(count) {
    this.started = true;
    sound.playBg();
    this.showStopButton();
    this.startGameTimer(this.gameDuration);
    this.gameCount.innerHTML = `${this.count}`;
    this.gameField.addItems(this.count);
  }

  // Stop the game
  stop(reason) {
    this.started = false;
    sound.stopBg();
    this.hideGameButton();
    this.stopGameTimer();
    this.gameField.deact();
    this.onGameStop && this.onGameStop(reason);
  }

  // Change between play and stop
  showStopButton() {
    this.btnSquare.classList.remove("fa-play");
    this.btnSquare.classList.add("fa-square");
  }
  showPlayButton() {
    this.btnSquare.classList.remove("fa-square");
    this.btnSquare.classList.add("fa-play");
  }

  // Show or hide the game button
  hideGameButton() {
    this.gameBtn.style.visibility = "hidden";
  }
  showGameButton() {
    this.gameBtn.style.visibility = "visible";
  }

  // Start the game timer
  startGameTimer(GAME_DURATION_SEC) {
    let remainingTimeSec = GAME_DURATION_SEC;
    this.updateGameTimer(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.stop(Reason.cancel);
        return;
      }
      this.updateGameTimer(--remainingTimeSec);
    }, 1000);
  }

  updateGameTimer(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes} : ${seconds}`;
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }
}
