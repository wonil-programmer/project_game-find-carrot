"use strict";

// PopUp 클래스 선언
export default class PopUp {
  // 생성자 정의
  constructor() {
    // html로부터 팝업창 관련 요소들을 가져와 변수들에 저장 
    this.popUp = document.querySelector(".pop-up");
    this.popUpText = document.querySelector(".pop-up__message");
    this.popUpRefresh = document.querySelector(".pop-up__retryBtn");
    // 재시작 버튼에 이벤트 리스너 등록
    this.popUpRefresh.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  // setClickListener: onClick 인자
  setClickListener(onClick) {
    this.onClick = onClick;
  }

  // showWithText: 팝업 텍스트에 인자로 넘어온 텍스트 대입
  showWithText(text) {
    this.popUpText.innerText = text;
    this.popUp.classList.remove("pop-up--hide");
  }

  // hide: 팝업 숨김
  hide() {
    this.popUp.classList.add("pop-up--hide");
  }
}
