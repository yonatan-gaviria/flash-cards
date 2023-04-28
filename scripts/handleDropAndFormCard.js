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
  questionTextArea.value = "";
  answerTextArea.value = "";
  objectSaved.questions = [];
});

saveForm.addEventListener("click", ()=> {
  const questionText = questionTextArea.value;
  const answerText = answerTextArea.value;
  objectSaved.questions.push({ question: questionText, answer: answerText });
  questionTextArea.value = "";
  answerTextArea.value = "";
});

createForm.addEventListener("click", ()=> {
  const jsonString = JSON.stringify(objectSaved);
  const theBlob = new Blob([jsonString], {type: "application/json"});
  const theURL = URL.createObjectURL(theBlob);

  const link = document.createElement("a");
  link.href = theURL;
  link.download = "sample.json";
  link.click();
  URL.revokeObjectURL(link.href);

  cardsArray = objectSaved.questions;
  renderCards();
});