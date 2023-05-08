const swiper = document.querySelector("#swiper");
const goBack = document.querySelector("#goBack");

const objectSaved = {
  questions: []
}

let onInfinite = false;
let onRandom = false;
let mainCardAdded = false;

let cardPosition = 0;
let limitCards = 4;
let limitRenderCards;
let cardsArray = [];
let temporalCardsArray = [];
let arraySelected = [];
