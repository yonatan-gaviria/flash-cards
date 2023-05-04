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
  cardPosition = 0;
  cardsArray.sort(()=> Math.random() - 0.5);
  swiper.innerHTML = "";
  displayInitialCards();
}