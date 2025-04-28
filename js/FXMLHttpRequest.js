class FXMLHttpRequest {
    // Simulates XMLHttpRequest for the fake server setup
    constructor() {
        this.readyState = 0;
        this.status = 0;
        this.statusText = '';
        this.response = null;
        this.request = null;
        this.data;
        this.onload = null;
        this.onerror = null;
    }

    open(method, url) {
        this.onreadystatechange();
        this.method = method;
        this.url = new URL(url);
    }

    send(body = null) {
        this.onreadystatechange();
        this.body = body;
        this.onreadystatechange();
        this.request = `${this.method} ${this.url.pathname} ${this.url.protocol}/${this.url.port}\nHost: ${this.url.host}\nAccept: application/json\n`;
        if (['POST', 'PUT'].includes(this.method)) {
            this.request += `Content-Type: application/json\n\n${JSON.stringify(this.body, null, 4)}`;
        }

        setTimeout(() => {
            cables.clientNetwork.sendData(this);
           // this.onreadystatechange();
        }, 1000);
    }

    addEventListener(type, callback) {
        if (type === 'load') this.onload = callback;
        else if (type === 'error') this.onerror = callback;
    }

    onreadystatechange() {
        this.readyState += 1;
    }
}