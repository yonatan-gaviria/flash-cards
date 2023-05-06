const mainCard = new MainCard();
swiper.append(mainCard.cardFile);

goBack.addEventListener("click", ()=> {
  cardPosition = 0; 
  swiper.innerHTML = "";
  swiper.append(mainCard.cardFile);
});

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

function renderCards() {
  cardPosition = 0;
  cardsArray.sort(()=> Math.random() - 0.5);
  swiper.innerHTML = "";
  for(let i = 0; i < limitCards; i++) {
    appendNewCard();
  }
}