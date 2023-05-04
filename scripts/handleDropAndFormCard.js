questionTextArea.addEventListener("keyup", haveText);
answerTextArea.addEventListener("keyup", haveText);
saveForm.addEventListener("click", handlerSaveObject);
leftSelector.addEventListener("click", ()=> moveingSelector(-1));
rightSelector.addEventListener("click", ()=> moveingSelector(1));

jsonCreatorBtn.addEventListener("click", ()=> {
  cardFile.classList.toggle("onEdit");
  questionTextArea.focus();
});

jsonEditorBtn.addEventListener("click", ()=> {
  cardFile.classList.toggle("onEdit");
  cardPosition = 0;
});

cancelForm.addEventListener("click", ()=> {
  cardFile.classList.toggle("onEdit");
  /* questionTextArea.value = "";
  answerTextArea.value = ""; */
  cardsArray = [];
  updateFacesInfo();
});

createForm.addEventListener("click", ()=> {
  handlerSaveObject();
  
  objectSaved.questions = cardsArray;
  const jsonString = JSON.stringify(objectSaved);
  const theBlob = new Blob([jsonString], { type: "application/json" });
  const theURL = URL.createObjectURL(theBlob);
  
  const link = document.createElement("a");
  link.href = theURL;
  link.download = "question cards.json";
  link.click();
  URL.revokeObjectURL(link.href);
  
  updateFacesInfo();
  cardFile.classList.toggle("onEdit");
});

startBtn.addEventListener("click", ()=> {
  renderCards();
});

function haveText() {
  if(questionTextArea.value.length !== 0 && answerTextArea.value.length !== 0) { 
    saveForm.disabled = false; 
  } else {
    saveForm.disabled = true;
  }
}

function handlerSaveObject() {
  const questionText = questionTextArea.value;
  const answerText = answerTextArea.value;

  if(questionTextArea.value.length !== 0 && answerTextArea.value.length !== 0) {
    return;
  } else if(cardPosition >= cardsArray.length) { 
    cardsArray.push({ question: questionText, answer: answerText });
  } else {
    cardsArray[cardPosition] = { question: questionText, answer: answerText }
  }
  questionTextArea.value = "";
  answerTextArea.value = "";
  questionTextArea.focus();
  cardPosition++;

  updateFacesInfo();
}

function moveingSelector(value) {
  cardPosition += value;
  if(cardPosition < 0) { 
    cardPosition = 0 
  } else if(cardPosition >= cardsArray.length) {
    cardPosition = cardsArray.length 
  }

  updateFacesInfo();
}

function updateFacesInfo() {
  if(cardsArray.length !== 0) {
    createForm.disabled = false;
    startBtn.disabled = false;
    jsonEditorBtn.disabled = false;
    textDropZone.innerText = `this file has ${ cardsArray.length } questions`;
  } else {
    createForm.disabled = true;
    startBtn.disabled = true;
    jsonEditorBtn.disabled = true;
    textDropZone.innerText = "click here or drop your JSON file";
  }

  if(cardPosition >= cardsArray.length) {
    questionTextArea.value = "";
    answerTextArea.value = "";
    questionTextArea.focus();
  } else {
    questionTextArea.value = cardsArray[cardPosition].question;
    answerTextArea.value = cardsArray[cardPosition].answer;
  }

  questionAmount.innerHTML = `${ cardPosition + 1 } / ${ cardsArray.length }`;
}