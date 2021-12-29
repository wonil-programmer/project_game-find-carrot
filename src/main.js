"use strict";
import Field from "./field.js";
import PopUp from "./popup.js";
import Game from "./game.js";

// Make an object from Popup class. It contains the result of game
const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  game.initGame();
});

const game = new Game();
game.setGameStopListener((reason) => {
  console.log(reason);
  let message;
  switch (reason) {
    case "cancel":
      message = "REPLAY?";
      break;
    case "won":
      message = "YOU WON!";
      break;
    case "lost":
      message = "YOU LOST!";
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.showWithText(message);
});
