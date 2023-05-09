const mainCard = new MainCard();
swiper.append(mainCard.cardFile);

goBack.addEventListener("click", ()=> {
  goBack.hidden = true;
  cardPosition = 0; 
  swiper.innerHTML = "";
  mainCard.cardFile.style = "";
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
  if(cardPosition >= arraySelected.length) {
    if(onInfinite) {
      cardPosition = 0; 
      createCard();
    } else if(!onInfinite && !mainCardAdded) {
      mainCardAdded = true;
      swiper.append(mainCard.cardFile);
    }
  } else {
    createCard();
  }

  function createCard() {
    const position = arraySelected[cardPosition];
    const card = createNewCard(position.question, position.answer);
    swiper.append(card.element);
  }

  cardPosition++;
  if(cardPosition >= limitRenderCards + arraySelected.length) { goBack.hidden = true; }
  
  const cards = swiper.querySelectorAll(".card:not(.dismissing)");
  cards.forEach((card, index)=> {
    card.style.setProperty("--i", index);
  });
}

function renderCards() {
  cardPosition = 0;
  temporalCardsArray.sort(()=> Math.random() - 0.5);
  swiper.innerHTML = "";

  if(onRandom) {
    arraySelected = temporalCardsArray;
  } else {
    arraySelected = cardsArray;
  }

  if(arraySelected.length < limitCards) {
    limitRenderCards = arraySelected.length + 1 
  } else {
    limitRenderCards = limitCards;
  }

  for(let i = 0; i < limitRenderCards; i++) {
    appendNewCard();
  }
}