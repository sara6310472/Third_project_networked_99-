class Data {
    // Handles data-related operations on the client side
    constructor() {
        this.baseUrl = "https://192.168.1.100:8081/todo.list.com/";
    }

    create() {
        const body = {
            value: {
                title: document.querySelector('#taskTitle').value,
                content: document.querySelector('#taskContent').value
            },
            date: new Date().toLocaleDateString(),
            done: false,
            id: null,
        };
        document.querySelector('#taskTitle').value = "";
        document.querySelector('#taskContent').value = "";
        this.sendRequest('POST', `${this.baseUrl}create`, body, (fxhr) => {
            let task = fxhr.data;
            if (document.querySelector('#taskList').querySelector('p')) {
                document.querySelector('#taskList').innerHTML = ' ';
            }
            let taskElement = `<task-component id="${task.id}" data-id=${task.id} data-title=${task.value.title} data-content=${task.value.content} data-date=${task.date} data-done=${task.done}></task-component>`;
            document.querySelector('#taskList').insertAdjacentHTML('afterbegin', taskElement);
        });
    }

    read() {
        this.sendRequest('GET', `${this.baseUrl}read/`, null, (fxhr) => {
            document.querySelector('.task-form').style.display = 'block'
            if (fxhr.data.length == 0) {
                document.querySelector('#taskList').innerHTML = '<p>you not have Task yet</p>';
            } else {
                document.querySelector('#taskList').innerHTML = ' ';
                fxhr.data.forEach(task => {
                    let taskElement = `<task-component id="${task.id}" data-id=${task.id} data-title=${task.value.title} data-content=${task.value.content} data-date=${task.date} data-done=${task.done}></task-component>`;
                    document.querySelector('#taskList').insertAdjacentHTML('afterbegin', taskElement);
                });
            }
        });
    }

    delete(e) {
        const id = e.target.id.split('/')[1];
        this.sendRequest('DELETE', `${this.baseUrl}delete/${id}`, null, (fxhr) => {
            let element = document.getElementById(fxhr.data);
            element.remove();
        });
    }

    search() {
        const searchItem = document.querySelector('#searchInput').value;
        this.sendRequest('GET', `${this.baseUrl}search/?title=${searchItem}`, null, (fxhr) => {
            if (fxhr.data.length == 0) {
                document.querySelector('#taskList').innerHTML = 'serch not found';
                return;
            }
            document.querySelector('#taskList').innerHTML = ' ';
            fxhr.data.forEach(task => {
                let taskElement = `<task-component id="${task.id}" data-id=${task.id} data-title=${task.value.title} data-content=${task.value.content} data-date=${task.date} data-done=${task.done}></task-component>`;
                document.querySelector('#taskList').insertAdjacentHTML('afterbegin', taskElement);
            });
        });
    }

    recycle() {
        this.sendRequest('GET', `${this.baseUrl}recycle`, null, (fxhr) => {
            document.querySelector('#taskList').innerHTML = ' ';
            document.querySelector('.task-form').style.display = 'none'
            fxhr.data.forEach(task => {
                let taskElement = `<recycle-component id="${task.id}" data-id=${task.id} data-title=${task.value.title} data-content=${task.value.content} data-date=${task.date} data-done=${task.done}></recycle-component>`;
                document.querySelector('#taskList').insertAdjacentHTML('afterbegin', taskElement);
            });
        });
    }

    finalDelete(e) {
        const id = e.target.id.split('/')[1];
        this.sendRequest('DELETE', `${this.baseUrl}finalDelete/${id}`, null, (fxhr) => {
            let element = document.getElementById(fxhr.data);
            element.remove();
        });
    }

    return(e) {
        const id = e.target.id.split('/')[1];
        this.sendRequest('GET', `${this.baseUrl}return/${id}`, null, (fxhr) => {
            let element = document.getElementById(id);
            element.remove();
        });
    }

    done() {
        this.sendRequest('GET', `${this.baseUrl}done/?done=true`, null, (fxhr) => {
            document.querySelector('.task-form').style.display = 'block'
            if (fxhr.data.length == 0) {
                document.querySelector('#taskList').innerHTML = 'you not have done Task yet';
            } else {
                document.querySelector('#taskList').innerHTML = ' ';
                fxhr.data.forEach(task => {
                    let taskElement = `<task-component id="${task.id}" data-id=${task.id} data-title=${task.value.title} data-content=${task.value.content} data-date=${task.date} data-done=${task.done}></task-component>`;
                    document.querySelector('#taskList').insertAdjacentHTML('afterbegin', taskElement);
                });
            }
        });
    }

    sendRequest(method, url, body, callback) {
        let fxhr = new FXMLHttpRequest();
        fxhr.addEventListener('load', (fxhr) => {
            if (fxhr.status >= 200 && fxhr.status < 300) {
                callback(fxhr);
            } else {
                alert('Sorry, we could not load data. Please try again later.');
            }
        });
        fxhr.addEventListener('error', () => {
            alert('An error occurred. Please try again later.');
        });
        fxhr.open(method, url);
        fxhr.send(body);
    }
}