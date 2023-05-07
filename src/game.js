"use strict";
import Field from "./field.js";
import * as sound from "./sound.js";

// Reason 상수 정의
export const Reason = Object.freeze({
  won: "won",
  lost: "lost",
  cancel: "cancel",
});

// Game 클래스 선언
export default class Game {
  constructor() {
    // 난수 선언
    this.randomNum = 0;

    // html로부터 게임시작 버튼 가져와서 변수에 저장
    this.btnSquare = document.querySelector("#btnSquare");
    this.gameBtn = document.querySelector(".gameBtn");
    // start 플래그
    this.started = false;
    // Start or stop the game by click game button
    // 시작 및 정지 버튼에 클릭 이벤트 리스너 등록
    this.gameBtn.addEventListener("click", () => {
      // 게임 시작 전 세팅
      if (!this.started) {
        // 난수(0~9)를 생성하여 카운트 및 타이머에 대입
        this.randomNum = Math.ceil(Math.random() * 5 + 5);
        this.count = this.randomNum;
        this.gameDuration = this.randomNum;
        // 정지버튼으로 변환
        this.showStopButton();
        // 게임 시작
        this.start();
      // 게임 시작시
      } else {
        this.stop(Reason.cancel);
      }
    });

    // 타이머 선언 및 초기화
    this.timer = undefined;
    // html로부터 타이머 및 카운터를 가져와서 변수에 저장
    this.gameTimer = document.querySelector(".gameTimer");
    this.gameCount = document.querySelector(".gameCount");
    // Field 클래스로 gameField 객체 생성 후 클릭리스너 등록
    this.gameField = new Field();
    this.gameField.setClickListener(this.onItemClick);
  }

  // GameStop 리스너 등록
  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  // Item located in bottom section clicked
  // 아이템 
  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    // 당근 클릭시
    if (item === "carrot") {
      // 카운트 감소 후 적용
      this.count--;
      this.gameCount.innerHTML = `${this.count}`;
      // 카운트가 0이 되면 게임 정지(성공)
      if (this.count == 0) {
        this.stop(Reason.won);
      }
    // 벌레 클릭시
    } else if (item === "bug") {
      // 게임 정지(실패)
      this.stop(Reason.lost);
    }
  };

  // initGame: 게임 세팅 초기화
  initGame() {
    this.started = false; // 시작플래그 초기화
    this.showPlayButton(); // 재생버튼 노출
    this.showGameButton(); // 게임버튼 노출
    this.gameTimer.innerText = "0 : ?"; // 타이머 초기화
    this.gameCount.innerText = "?"; // 카운트 초기화
    this.gameField.initField(); // 게임필드 초기화
  }

  // start: 게임 시작
  start(count) {
    this.started = true; // 시작플래그 초기화
    sound.playBg(); // bgm 재생
    this.showStopButton(); // 정지버튼 노출
    this.startGameTimer(this.gameDuration); // 타이머 재생
    this.gameCount.innerHTML = `${this.count}`; // 게임카운트 초기화
    this.gameField.addItems(this.count); // 게임필드에 카운트에 맞는 아이템 배치
  }

  // stop: 게임 정지
  stop(reason) {
    this.started = false; // 시작플래그 초기화
    sound.stopBg(); // bgm 정지
    this.hideGameButton(); // 게임버튼 숨기기
    this.stopGameTimer(); // 타이머 정지
    this.gameField.deact(); // 게임필드 비활성화
    this.onGameStop && this.onGameStop(reason);
  }

  
  // Start the game timer
  startGameTimer(GAME_DURATION_SEC) {
    let remainingTimeSec = GAME_DURATION_SEC;
    this.updateGameTimer(remainingTimeSec);
    // setInterval 함수로 1초마다의 동작을 타이머에 지정
    this.timer = setInterval(() => {
      // 타이머 종료시 게임종료 처리
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.stop(Reason.cancel);
        return;
      }
      // updateGameTimer 함수에 인자 대입
      this.updateGameTimer(--remainingTimeSec);
    }, 1000);
  }
  // updateGameTimer: 타이머 업데이트 및 적용
  updateGameTimer(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes} : ${seconds}`;
  }

  // stopGameTimer: 타이머 초기화 - clearInterval 함수 사용
  stopGameTimer() {
    clearInterval(this.timer);
  }

  // css 변환
  // showStopButton, showPlayButton: 정지버튼 및 시작버튼으로 변환
  showStopButton() {
    this.btnSquare.classList.remove("fa-play");
    this.btnSquare.classList.add("fa-square");
  }
  showPlayButton() {
    this.btnSquare.classList.remove("fa-square");
    this.btnSquare.classList.add("fa-play");
  }

  // hideGameButton, showGameButton: 게임버튼 숨기기 및 보여주기
  hideGameButton() {
    this.gameBtn.style.visibility = "hidden";
  }
  showGameButton() {
    this.gameBtn.style.visibility = "visible";
  }
}
