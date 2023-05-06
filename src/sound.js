"use strict";
// Audio 객체 생성 후 변수에 대입
const bgSound = new Audio("sound/bg.mp3");
const bugSound = new Audio("sound/bug_pull.mp3");
const carrotSound = new Audio("sound/carrot_pull.mp3");
const alertSound = new Audio("sound/alert.wav");
const winSound = new Audio("sound/game_win.mp3");

// 각 사운드들을 재생 및 종료하는 함수들
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

// audioPlay: 오디오를 재생
function audioPlay(sound) {
  sound.currentTime = 0;
  sound.play();
}
// audioStop: 오디오 중지
function audioStop(sound) {
  sound.pause();
}
