class RecycleComponent extends HTMLElement {
  // Custom element for displaying recycled tasks
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <link rel="stylesheet" href="../fontawesome/css/fontawesome.css">
      <link rel="stylesheet" href="../fontawesome/css/brands.css">
      <link rel="stylesheet" href="../fontawesome/css/solid.css">
      <link rel="stylesheet" href="../css/RcycleComponent.css">
  
      <div id="${this.getAttribute("data-id")}" >     
        <div class="taskHeader">
            <h4 class="taskTitle">title: ${this.getAttribute("data-title")}</h4>
            <h5 class="taskContent">content: ${this.getAttribute("data-content")}</h5>
            <p>date: ${this.getAttribute("data-date")} </p>
            <div class="taskActions">
              <button class="delete" ><i class="fa-solid fa-xmark" id="delete/${this.getAttribute("data-id")}"></i></button>
              <button class="return" ><i class="fa-solid fa-arrow-rotate-right" id="return/${this.getAttribute("data-id")}"></i></button>  
            </div>
          </div>
        </div>`;

    shadow.querySelector('.delete').addEventListener('click', data.finalDelete.bind(data));
    shadow.querySelector('.return').addEventListener('click', data.return.bind(data));
  }
}
customElements.define('recycle-component', RecycleComponent);