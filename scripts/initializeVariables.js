const swiper = document.querySelector("#swiper");
const inputElement = document.getElementById("inputField");
const cardFile = document.querySelector(".cardFile");
const textDropZone = document.getElementById("textDropZone");
const jsonCreatorBtn = document.querySelector("#jsonCreator");
const jsonEditorBtn = document.querySelector("#jsonEditor");
const startBtn = document.querySelector("#start");
const cancelForm = document.querySelector("#cancelForm");
const questionTextArea = document.querySelector("#questionTextArea");
const answerTextArea = document.querySelector("#answerTextArea");
const saveForm = document.querySelector("#saveForm");
const createForm = document.querySelector("#createForm");
const leftSelector = document.querySelector("#leftSelector");
const rightSelector = document.querySelector("#rightSelector");
const questionAmount = document.querySelector("#questionAmount");


const objectSaved = {
  questions: []
}

//let editMode = false;
let cardPosition = 0;
let limitCards = 4;
let cardsArray = [];
