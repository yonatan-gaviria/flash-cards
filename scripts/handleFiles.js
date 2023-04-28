const inputElement = document.getElementById("inputField");
inputElement.addEventListener("change", inputFileHandeler, false);

//functions
function dragOverHandler(ev) { 
  ev.preventDefault(); 
}

function dropHandler(ev) {
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    for (let i = 0; i < ev.dataTransfer.items.length; i++) {
      if (ev.dataTransfer.items[i].kind === 'file') {
        let file = ev.dataTransfer.items[i].getAsFile();
        handleFile(file);
      }
    }
  }
  //removeDragData(ev);
}

function inputFileHandeler(ev) {
  ev.preventDefault();
  const fileList = this.files;
  for(i = 0; i < fileList.length; i++) {
    handleFile(fileList[i]);
  }
}

function handleFile(file) {
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
      cardsArray.sort(()=> Math.random() - 0.5);
      renderCards();
    };
  }
}