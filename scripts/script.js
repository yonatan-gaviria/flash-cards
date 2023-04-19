const swiper = document.querySelector("#swiper");

//variables
let cardPosition = 0;
let limitCards = 4;
let cardsArray = [];

//functions
function createNewCard(question, answer) {
  const card = new Card({
    question: question,
    answer: answer,
    onDismiss: appendNewCard
  });
  return card;
}

function appendNewCard() {
  const position = cardsArray[cardPosition];
  const card = createNewCard(position.question, position.answer);
  swiper.append(card.element);
  cardPosition++;
  if(cardPosition >= cardsArray.length) { cardPosition = 0; }
  
  const cards = swiper.querySelectorAll(".card:not(.dismissing)");
  cards.forEach((card, index)=> {
    card.style.setProperty("--i", index);
  });
}

function displayInitialCards() {
  for(let i = 0; i < limitCards; i++) {
    appendNewCard();
  }
}

function renderCards() {
  swiper.innerHTML = "";
  displayInitialCards();
}