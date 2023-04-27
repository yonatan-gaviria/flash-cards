const cardFile = document.querySelector(".cardFile");
const jsonCreator = document.querySelector("#jsonCreator");
const cancelForm = document.querySelector("#cancelForm");
const questionTextArea = document.querySelector("#questionTextArea");
const answerTextArea = document.querySelector("#answerTextArea");
const saveForm = document.querySelector("#saveForm");
const createForm = document.querySelector("#createForm");

const objectSaved = {
  questions: []
}

jsonCreator.addEventListener("click", ()=> {
  cardFile.classList.toggle("clicked");
});

cancelForm.addEventListener("click", ()=> {
  cardFile.classList.toggle("clicked");
});

saveForm.addEventListener("click", ()=> {
  const questionText = questionTextArea.value;
  const answerText = answerTextArea.value;
  objectSaved.questions.push({ question: questionText, answer: answerText });
  questionTextArea.value = "";
  answerTextArea.value = "";
  console.log(objectSaved);
});

createForm.addEventListener("click", ()=> {
  cardsArray = objectSaved.questions;
  renderCards();
});