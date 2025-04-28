class App {
    // Main application class
    constructor() {
        this.main = document.querySelector("main");

        this.pages = {
            mainPage: document.querySelector(".mainPage"),
            signInPage: document.querySelector(".signInPage"),
            signUpPage: document.querySelector(".signUpPage"),
        };
        this.currentPage = null;
        this.back = false;

        window.addEventListener("popstate", this.handlePopState.bind(this));
    }

    init() {
        currentUser = JSON.parse(localStorage.getItem('currentUser'));
        currentUser ? this.goToMainPage() : this.goToSignInPage();
    }

    goToPage(pageName) {
        const page = this.pages[pageName];
        if (page) {
            while (this.main.firstChild) {
                this.main.removeChild(this.main.lastChild);
            }
            this.currentPage = page.content.cloneNode(true);
            this.main.append(this.currentPage);

            if (!this.back) {
                history.pushState({}, pageName, `#${pageName}`);
            }
            this.back = false;

            this.setupPageHandlers(pageName);
        }
    }

    setupPageHandlers(pageName) {
        switch (pageName) {
            case "mainPage":
                document.querySelector('#create').addEventListener('click', data.create.bind(data));
                document.querySelector('#logOut').addEventListener('click', this.logout);
                document.querySelector('#searchBtn').addEventListener('click', data.search.bind(data));
                document.querySelector('.recycle').addEventListener('click', data.recycle.bind(data));
                document.querySelector('.task').addEventListener('click', data.read.bind(data));
                document.querySelector('.done').addEventListener('click', data.done.bind(data));
                data.read();
                break;
            case "signInPage":
                document.querySelector('.container').addEventListener('submit', user.signIn.bind(user));
                document.querySelector('.link').addEventListener('click', this.goToSignUpPage.bind(this));
                break;
            case "signUpPage":
                document.querySelector('.container').addEventListener('submit', user.signUp.bind(user));
                document.querySelector('.link').addEventListener('click', this.goToSignInPage.bind(this));
                break;
        }
    }

    goToMainPage() {
        this.goToPage("mainPage");
    }

    goToSignInPage() {
        this.goToPage("signInPage");
    }

    goToSignUpPage() {
        this.goToPage("signUpPage");
    }

    logout() {
        localStorage.removeItem('currentUser');
        location.reload();
        this.goToSignInPage();
    }

    handlePopState() {
        const hash = location.hash.replace("#", '');
        this.back = true;
        if (hash in this.pages) {
            this.goToPage(hash);
        }
    }
}