class MainCard{
  constructor() {
    this.#init();
  }

  #init = ()=> {
    const cardFile = document.createElement("div");
    cardFile.classList.add("cardFile");
    cardFile.classList.add("card");

    const faces = document.createElement("div");
    faces.classList.add("faces");
    cardFile.append(faces);

    const frontFace = document.createElement("div");
    frontFace.classList.add("face");
    frontFace.classList.add("front");
    faces.append(frontFace);

    const dropZone = document.createElement("div");
    dropZone.id = "dropZone";
    frontFace.append(dropZone);

    const frontLabel = document.createElement("label");
    frontLabel.htmlFor = "inputField";
    dropZone.append(frontLabel);

    const textDropZone = document.createElement("p");
    textDropZone.id = "textDropZone";
    textDropZone.innerText = "click here or drop your JSON file";
    frontLabel.append(textDropZone);

    const inputField = document.createElement("input");
    inputField.type = "file";
    inputField.id = "inputField";
    inputField.multiple = true;
    inputField.hidden = true;
    frontLabel.append(inputField);

    const fronH4 = document.createElement("h4");
    fronH4.innerText = "Or";
    frontFace.append(fronH4);

    const buttonsContainer = document.createElement("div");
    frontFace.append(buttonsContainer);

    const jsonCreator = document.createElement("button");
    jsonCreator.id = "jsonCreator";
    jsonCreator.innerText = "New JSON";
    buttonsContainer.append(jsonCreator);

    const jsonEditor = document.createElement("button");
    jsonEditor.id = "jsonEditor";
    jsonEditor.innerText = "Edit";
    jsonEditor.disabled = true;
    buttonsContainer.append(jsonEditor);

    const start = document.createElement("button");
    start.id = "start";
    start.innerText = "Start";
    start.disabled = true;
    buttonsContainer.append(start);

    const backFace = document.createElement("div");
    backFace.classList.add("face");
    backFace.classList.add("back");
    faces.append(backFace);

    const questionSelector = document.createElement("div");
    questionSelector.classList.add("questionSelector");
    backFace.append(questionSelector);

    const leftSelector = document.createElement("p");
    leftSelector.id = "leftSelector";
    leftSelector.innerText = "◀";
    questionSelector.append(leftSelector);

    const questionAmount = document.createElement("h2");
    questionAmount.id = "questionAmount";
    questionAmount.innerText = "1 / 0";
    questionSelector.append(questionAmount);

    const rightSelector = document.createElement("p");
    rightSelector.id = "rightSelector";
    rightSelector.innerText = "▶";
    questionSelector.append(rightSelector);

    const questionArea = document.createElement("div");
    questionArea.classList.add("questionArea");
    backFace.append(questionArea);

    const questionAreaH2 = document.createElement("h2");
    questionAreaH2.innerText = "question";
    questionArea.append(questionAreaH2);

    const questionTextArea = document.createElement("textarea");
    questionTextArea.id = "questionTextArea";
    questionTextArea.rows = 6;
    questionArea.append(questionTextArea);

    const answerArea = document.createElement("div");
    answerArea.classList.add("answerArea");
    backFace.append(answerArea);

    const answeAreaH2 = document.createElement("h2");
    answeAreaH2.innerText = "answer";
    answerArea.append(answeAreaH2);

    const answerTextArea = document.createElement("textarea");
    answerTextArea.id = "answerTextArea";
    answerTextArea.rows = 6;
    answerArea.append(answerTextArea);

    const formButtons = document.createElement("div");
    formButtons.classList.add("formButtons");
    backFace.append(formButtons);

    const cancelForm = document.createElement("button");
    cancelForm.id = "cancelForm";
    cancelForm.innerText = "Cancel";
    formButtons.append(cancelForm);

    const saveForm = document.createElement("button");
    saveForm.id = "saveForm";
    saveForm.innerText = "Save";
    saveForm.disabled = true;
    formButtons.append(saveForm);

    const createForm = document.createElement("button");
    createForm.id = "createForm";
    createForm.innerText = "Create";
    createForm.disabled = true;
    formButtons.append(createForm);
    
    this.cardFile = cardFile;
    this.dropZone = dropZone;
    this.textDropZone = textDropZone;
    this.inputElement = inputField;
    this.jsonCreatorBtn = jsonCreator;
    this.jsonEditorBtn = jsonEditor;
    this.startBtn = start;
    this.cancelForm = cancelForm;
    this.questionTextArea = questionTextArea;
    this.answerTextArea = answerTextArea;
    this.saveForm = saveForm;
    this.createForm = createForm;
    this.leftSelector = leftSelector;
    this.rightSelector = rightSelector;
    this.questionAmount = questionAmount;

    this.#createAddEventListeners(); 
  }

  #createAddEventListeners = ()=> {
    this.dropZone.addEventListener("drop", this.#dropHandler);
    this.dropZone.addEventListener("dragover", this.#dragOverHandler);
    this.inputElement.addEventListener("change", this.#inputFileHandeler);

    this.questionTextArea.addEventListener("keyup", this.#haveText);
    this.answerTextArea.addEventListener("keyup", this.#haveText);
    this.saveForm.addEventListener("click", this.#handlerSaveObject);
    this.leftSelector.addEventListener("click", ()=> this.#moveingSelector(-1));
    this.rightSelector.addEventListener("click", ()=> this.#moveingSelector(1));

    this.jsonCreatorBtn.addEventListener("click", ()=> {
      cardsArray = [];
      cardPosition = 0;
      this.#updateFacesInfo();
      this.cardFile.classList.toggle("flipped");
      this.questionTextArea.focus();
    });

    this.jsonEditorBtn.addEventListener("click", ()=> {
      temporalCardsArray = cardsArray;
      cardPosition = 0;
      this.cardFile.classList.toggle("flipped");
      this.#updateFacesInfo();
    });

    this.startBtn.addEventListener("click", ()=> {
      renderCards();
    });

    this.cancelForm.addEventListener("click", ()=> {
      cardsArray = temporalCardsArray;
      this.cardFile.classList.toggle("flipped");
      this.#updateFacesInfo();
    });

    this.createForm.addEventListener("click", ()=> {
      this.#handlerSaveObject();
      
      objectSaved.questions = cardsArray;
      const jsonString = JSON.stringify(objectSaved);
      const theBlob = new Blob([jsonString], { type: "application/json" });
      const theURL = URL.createObjectURL(theBlob);
      
      const link = document.createElement("a");
      link.href = theURL;
      link.download = "question cards.json";
      link.click();
      URL.revokeObjectURL(link.href);
      
      this.#updateFacesInfo();
      this.cardFile.classList.toggle("flipped");
    });
  }

  #dragOverHandler = (ev)=> { 
    ev.preventDefault(); 
  }

  #dropHandler = (ev)=> {
    ev.preventDefault();
  
    if(ev.dataTransfer.items) {
      for(let i = 0; i < ev.dataTransfer.items.length; i++) {
        if(ev.dataTransfer.items[i].kind === 'file') {
          let file = ev.dataTransfer.items[i].getAsFile();
          this.#handleFile(file);
        }
      }
    }
  }

  #inputFileHandeler = (ev)=> {
    ev.preventDefault();
    const fileList = ev.target.files;
    if(fileList) {
      this.#handleFile(fileList[0]);
      /* for(i = 0; i < fileList.length; i++) {
        this.#handleFile(fileList[i]);
      } */
    }
  }

  #handleFile = (file)=> {
    const validExt = /(.json|.JSON)$/i;
  
    if(!validExt.test(file.name)) {
      alert("invalid file");
      return;
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = ()=> {
        const result = reader.result;
        const array = atob(result.slice(29));
        const obj = JSON.parse(array);
        cardsArray = obj.questions;
  
        this.#updateFacesInfo();
      };
    }
  }

  #haveText = ()=> {
    if(this.questionTextArea.value.length !== 0 && this.answerTextArea.value.length !== 0) { 
      this.saveForm.disabled = false; 
    } else {
      this.saveForm.disabled = true;
    }
  }

  #handlerSaveObject = ()=> {
    const questionText = this.questionTextArea.value;
    const answerText = this.answerTextArea.value;

    if(this.questionTextArea.value.length === 0 && this.answerTextArea.value.length === 0) {
      return;
    } else if(cardPosition >= cardsArray.length) { 
      cardsArray.push({ question: questionText, answer: answerText });
    } else {
      cardsArray[cardPosition] = { question: questionText, answer: answerText }
    }
    this.questionTextArea.value = "";
    this.answerTextArea.value = "";
    this.questionTextArea.focus();
    cardPosition++;

    this.#updateFacesInfo();
  }

  #moveingSelector = (value)=> {
    cardPosition += value;
    if(cardPosition < 0) { 
      cardPosition = 0 
    } else if(cardPosition >= cardsArray.length) {
      cardPosition = cardsArray.length 
    }

    this.#updateFacesInfo();
  }

  #updateFacesInfo = ()=> {
    if(cardsArray.length !== 0) {
      this.createForm.disabled = false;
      this.startBtn.disabled = false;
      this.jsonEditorBtn.disabled = false;
      this.textDropZone.innerText = `this file has ${ cardsArray.length } questions`;
    } else {
      this.createForm.disabled = true;
      this.saveForm.disabled = true;
      this.startBtn.disabled = true;
      this.jsonEditorBtn.disabled = true;
      this.textDropZone.innerText = "click here or drop your JSON file";
    }

    if(this.questionTextArea.value.length !== 0 && this.answerTextArea.value.length !== 0) { 
      this.saveForm.disabled = false; 
    } else {
      this.saveForm.disabled = true;
    }

    if(cardPosition >= cardsArray.length) {
      this.questionTextArea.value = "";
      this.answerTextArea.value = "";
      this.questionTextArea.focus();
    } else {
      this.questionTextArea.value = cardsArray[cardPosition].question;
      this.answerTextArea.value = cardsArray[cardPosition].answer;
    }

    this.questionAmount.innerHTML = `${ cardPosition + 1 } / ${ cardsArray.length }`;
  }
}