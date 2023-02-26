let timer;
export default {
  async login(context, payload) {
    context.dispatch("auth", {
      ...payload,
      url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA_6BJerMhwflkhtFmIPABNOOh9BS-EjmU",
    });
  },
  async auth(context, payload) {
    let url = payload.url;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      //
      console.log(responseData);
      const error = new Error(
        responseData.message || `Failed to auth`
      );
      throw error;
    }
    // const tokenExpiration = +responseData.expiresIn * 1000;
    const tokenExpiration = +responseData.expiresIn * 1000;

    const expirationDate =
      new Date().getTime() + tokenExpiration;
    // expirationDate:过期时间.
    console.log(expirationDate);
    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("expiration", expirationDate);
    timer = setTimeout(() => {
      context.dispatch("autoLogout");
    }, tokenExpiration);
    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const tokenExpirationDate =
      localStorage.getItem("expiration");
    const expirationIn =
      +tokenExpirationDate - new Date().getTime();
    console.log(expirationIn);
    timer = setTimeout(() => {
      context.dispatch("autoLogout");
    }, expirationIn);
    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
      });
    }
  },
  async signup(context, payload) {
    context.dispatch("auth", {
      ...payload,
      url: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA_6BJerMhwflkhtFmIPABNOOh9BS-EjmU",
    });
  },
  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("userId");
    clearTimeout(timer);
    context.commit("setUser", {
      token: null,
      userId: null,
      tokenExpiration: null,
    });
  },
  autoLogout(context) {
    context.dispatch("logout");
    context.commit("autoLogout");
  },
};
