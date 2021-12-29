"use strict";

const bgSound = new Audio("sound/bg.mp3");
const bugSound = new Audio("sound/bug_pull.mp3");
const carrotSound = new Audio("sound/carrot_pull.mp3");
const alertSound = new Audio("sound/alert.wav");
const winSound = new Audio("sound/game_win.mp3");

export function playCarrot() {
  audioPlay(carrotSound);
}

export function playBug() {
  audioPlay(bugSound);
}

export function playAlert() {
  audioPlay(alertSound);
}

export function playWin() {
  audioPlay(winSound);
}

export function playBg() {
  audioPlay(bgSound);
}

export function stopBg() {
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
