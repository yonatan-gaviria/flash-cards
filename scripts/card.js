class Card{
  constructor({
    question,
    answer,
    onDismiss
  }) {
    this.question = question;
    this.answer = answer;
    this.onDismiss = onDismiss;
    this.#init();
  }

  //private properties
  #startPoint;
  #offsetX;
  #offsetY;

  //private methods
  #init = ()=> {
    const card = document.createElement("div");
    card.classList.add("card");

    const faces = document.createElement("div");
    faces.classList.add("faces");
    card.append(faces);

    const front = document.createElement("div");
    front.classList.add("face");
    front.classList.add("front");
    faces.append(front);

    const back = document.createElement("div");
    back.classList.add("face");
    back.classList.add("back");
    faces.append(back);

    const frontH3 = document.createElement("h3");
    frontH3.innerText = "QUESTION";
    front.append(frontH3);

    const backH3 = document.createElement("h3");
    backH3.innerText = "Answer";
    back.append(backH3);

    const frontText = document.createElement("p");
    frontText.innerText = this.question;
    front.append(frontText);

    const backText = document.createElement("p");
    backText.innerText = this.answer;
    back.append(backText);
    
    this.element = card;
    this.#listenToMouseEvent();
  }

  #listenToMouseEvent = ()=> {
    //mouse double click
    this.element.addEventListener("dblclick", ()=> { this.element.classList.toggle("flipped"); });

    //mousedown
    this.element.addEventListener("mousedown", (e)=> {
      const { clientX, clientY } = e;
      this.#startPoint = { x: clientX, y: clientY };
      this.element.style.transition = "";
      document.addEventListener("mousemove", this.#handleMouseMove);
    });

    //mouseup
    document.addEventListener("mouseup", this.#handleMouseUp);

    //prevent drag
    this.element.addEventListener("dragstart", (e)=> {
      e.preventDefault();
    });
  }

  #handleMouseMove = (e)=> {
    if(!this.#startPoint) return;
    const {clientX, clientY} = e;
    this.#offsetX = clientX - this.#startPoint.x;
    this.#offsetY = clientY - this.#startPoint.y;
    const rotate = this.#offsetX * 0.1;
    this.element.style.transform = `translate(${ this.#offsetX }px, ${ this.#offsetY }px) rotate(${ rotate }deg)`;

    //dismiss card when moveing too far away
    if(Math.abs(this.#offsetX) > this.element.clientWidth * 0.6) {
      const direction = this.#offsetX > 0 ? 1 : -1;
      this.#dismiss(direction);
    }
  }

  #handleMouseUp = (e)=> {
    this.#startPoint = null;
    document.removeEventListener("mousemove", this.#handleMouseMove);
    //transition when move back
    this.element.style.transform = "";
    this.element.style.transition = "transform 0.5s";
  }

  #dismiss = (direction)=> {
    this.#startPoint = null;
    document.removeEventListener("mouseup", this.#handleMouseUp);
    document.removeEventListener("mousemove", this.#handleMouseMove);

    this.element.style.transition = "transform 1s";
    this.element.style.transform = `translate(${direction * window.innerWidth}px, ${this.#offsetY}px) rotate(${90 * direction}deg)`;
    this.element.classList.add("dismissing");
    setTimeout(()=> {
      this.element.remove();
    }, 1000);

    if(typeof this.onDismiss === "function") {
      this.onDismiss();
    }
  }
}