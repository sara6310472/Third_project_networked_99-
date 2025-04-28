class User {
    // Handles user-related operations on the client side
    constructor() {
        this.baseUrl = "https://192.168.1.100:8080/user/";
    }

    signUp(e) {
        this.handleUserAction(e, 'signUp');
    }

    signIn(e) {
        this.handleUserAction(e, 'signIn');
    }

    handleUserAction(e, action) {
        e.preventDefault();
        const body = {
            name: document.querySelector('#name')?.value,
            email: document.querySelector('#email').value,
            password: document.querySelector('#password').value
        };
        this.sendRequest('POST', `${this.baseUrl}${action}`, body, (fxhr) => {
            currentUser = fxhr.data;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            app.goToMainPage();
        });
    }

    sendRequest(method, url, body = null, callback = null) {
        let fxhr = new FXMLHttpRequest();
        fxhr.addEventListener('load', (fxhr) => {
            if (fxhr.status >= 200 && fxhr.status < 300) {
                callback(fxhr);
            } else {
                alert('Sorry, we could not load data. Please try again later.');
            }
        });
        fxhr.addEventListener('error', () => alert('An error occurred. Please try again later.'));
        fxhr.open(method, url);
        fxhr.send(body);
    }
}