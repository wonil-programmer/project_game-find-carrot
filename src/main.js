"use strict";
// 모든 js파일들을 import
import Field from "./field.js";
import PopUp from "./popup.js";
import Game from "./game.js";
import * as sound from "./sound.js";

// 게임의 결과를 포함하는 Popup 객체를 생성 후 gameFinishBanner 변수에 대입
const gameFinishBanner = new PopUp();
// 변수에 클릭리스너 세트
gameFinishBanner.setClickListener(() => {
  game.initGame();
});

// 게임 실행과 관련된 Game 객체를 생성 후 game 변수에 대입 (게임 실행)
const game = new Game();
// reason에 따른 메시지와 bgm 지정 후 팝업 노출 (게임 결과)
game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case "cancel":
      sound.playAlert();
      message = "REPLAY?";
      break;
    case "won":
      sound.playWin();
      message = "YOU WON!";
      break;
    case "lost":
      sound.playBug();
      message = "YOU LOST!";
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.showWithText(message);
});
