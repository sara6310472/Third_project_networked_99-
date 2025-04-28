class UserDataBase {
    // Manages user data in local storage
    createNewUser(key, value) {
        this.set(key, value);
        return { success: true, data: key };
    }

    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    get(key) {
        return JSON.parse(localStorage.getItem(key));
    }
}