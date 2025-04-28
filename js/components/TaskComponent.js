class TaskComponent extends HTMLElement {
  // Custom element for displaying tasks
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
    <link rel="stylesheet" href="../fontawesome/css/fontawesome.css">
    <link rel="stylesheet" href="../fontawesome/css/brands.css">
    <link rel="stylesheet" href="../fontawesome/css/solid.css">
    <link rel="stylesheet" href="../css/TaskComponent.css">

    <div id="${this.getAttribute("data-id")}" >     
      <div class="taskHeader">
      <div class="taskActions">
          <button class="update"><i class="fa-solid fa-thumbs-up" id="update/${this.getAttribute("data-id")}"></i></button>
          </div>
          <h4 class="taskTitle">title:${this.getAttribute("data-title")}</h4>
          <h5 class="taskContent">content:${this.getAttribute("data-content")}</h5>
          <p>date: ${this.getAttribute("data-date")} </p>
          <div class="taskActions">
            <button class="delete" ><i class="fas fa-trash" id="delete/${this.getAttribute("data-id")}"></i></button>
          </div>
        </div>
      </div>`;
    this.shadowRoot.querySelector('.update').addEventListener('click', this.update.bind(this));
    this.shadowRoot.querySelector('.delete').addEventListener('click', data.delete.bind(data));

    if (this.getAttribute("data-done") === "true") {
      this.shadowRoot.getElementById(`update/${this.getAttribute("data-id")}`).style.color = '#FF69B4';
    }
  }

  update(e) {
    const body = {
      id: e.target.id,
    };
    data.sendRequest('PUT', `https://192.168.1.100:8081/todo.list.com/update/done/${body.id}`, body, () => {
      let element = this.shadowRoot.getElementById(`${body.id}`);
      element.style.color = (element.style.color === "rgb(255, 105, 180)" ? '#000000' : '#FF69B4');
    });
  }
}
customElements.define('task-component', TaskComponent);