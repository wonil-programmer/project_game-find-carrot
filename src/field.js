"use strict";

import * as sound from "./sound.js";

// 당근과 벌레 이미지 크기를 상수에 저장
const CARROT_SIZE = 80;
const BUG_SIZE = 50;

// 당근과 벌레 아이템 상수 정의
export const ItemType = Object.freeze({
  carrot: "carrot",
  bug: "bug",
});

// Field 클래스 정의
export default class Field {
  // 생성자
  constructor() {
    this.field = document.querySelector(".bottom__section"); // html로부터 게임필드 영역을 가져와 field 변수에 저장
    this.fieldRect = this.field.getBoundingClientRect(); // field의 사이즈를 가져와서 fieldRect 변수에 저장
    this.field.addEventListener("click", (event) => this.onClick(event)); // field에 클릭이벤트 등록
  }

  // initField: 게임필드 초기화 - 내부 html을 비우고 deact 클래스 제거
  initField() {
    this.field.innerHTML = "";
    this.field.classList.remove("deact");
  }

  // 클릭리스너 등록
  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  // createItems: 아이템 속성 및 위치 지정 후 반환
  _createItems(itemName, imgPath, itemSize) {
    // img 태그를 생성 후 인자값으로 클래스와 이미지소스를 지정
    const item = document.createElement("img");
    item.setAttribute("class", itemName);
    item.setAttribute("src", imgPath);

    // 게임필드 내 아이템의 랜덤 위치 값을 계산 후 대입
    const randomWidth = Math.random() * (this.fieldRect.width - itemSize);
    const randomHeight = Math.random() * (this.fieldRect.height - itemSize);
    item.style.left = `${randomWidth}px`;
    item.style.top = `${randomHeight}px`;
    return item;
  }

  // addItems: 반복문을 사용하여 아이템들(벌레, 당근)을 배치 - createItems로 받아온 item을 인자로 하는 appendChild 활용
  addItems(itemCount) {
    for (let i = 0; i < itemCount; i++) {
      this.field.appendChild(this._createItems("bug", "img/bug.png", BUG_SIZE));
      this.field.appendChild(
        this._createItems("carrot", "img/carrot.png", CARROT_SIZE)
      );
    }
  }

  // onClick: 클릭된 아이템에 따른 처리
  onClick(event) {
    const target = event.target;
    // 당근인 경우
    if (target.matches(".carrot")) {
      sound.playCarrot();
      target.remove();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    // 벌레인 경우
    } else if (target.matches(".bug")) {
      sound.playBug();
      target.remove();
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  }

  // deact: field 비활성화
  deact() {
    this.field.classList.add("deact");
  }
}
