class UserServer {
  // Handles user authentication and registration
  handleAction(fxhr) {
    try {
      const key = fxhr.body.email;
      const response = fxhr.url.pathname.includes('signUp') ? this.SignUp(fxhr.body, key) : this.SignIn(fxhr.body, key);
      if (response.success) {
        fxhr.status = 200;
        fxhr.statusText = 'OK';
        fxhr.data = response.data;
        fxhr.response = `${fxhr.url.protocol}/${fxhr.url.port} ${fxhr.status} ${fxhr.statusText}\nContent-Type: application/json\n\n${JSON.stringify(response.data, null, 4)}`;
        return cables.dataServerNetwork.sendData(fxhr, 'receive');
      } else {
        throw response.messag;
      }
    } catch (error) {
      fxhr.status = fxhr.status = Math.floor(Math.random() * (100)) + 400;;
      fxhr.statusText = 'Bad Request';
      return cables.dataServerNetwork.sendData(fxhr, 'receive');
    }
  }

  SignUp(body, key) {
    const user = userDataBase.get(key);
    if (user) return { success: false, message: 'User already exists' };
    return userDataBase.createNewUser(key, { ...body, tasks: [], recycle: [] });
  }

  SignIn(body, key) {
    const user = userDataBase.get(key);
    if (!user || body.password !== user.password) return { success: false, message: 'Invalid credentials' };
    return { success: true, data: key };
  }
}