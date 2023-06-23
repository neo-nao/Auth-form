const checkUserCookie = () => {
  const allAvailableCookies = document.cookie.replace(/\s/g, "").split(";");

  const tokenCookieName = allAvailableCookies.find((cookie) =>
    cookie.match("userToken")
  );

  let token = "";

  if (tokenCookieName) token = tokenCookieName.slice(-15);

  return { doesTokenExist: token ? true : false, token };
};

class Cookie {
  #_isCookieEnabled;
  #_cookieObject;

  constructor(cookieObj = { cookieName: "", expire: 1, cookieValue: "" }) {
    this.#_isCookieEnabled = checkUserCookie().doesTokenExist;
    this.#_cookieObject = cookieObj;
  }

  get cookieEnabled() {
    return this.#_isCookieEnabled;
  }

  set cookieEnabled(val) {
    this.#_isCookieEnabled = val;
  }

  createTokenCookie = ({
    cookieName = this.#_cookieObject.cookieName,
    cookiePassedValue = this.#_cookieObject.cookieValue,
    expire = this.#_cookieObject.expire,
  }) => {
    const date = new Date();

    date.setTime(
      date.getTime() + date.getTime() + expire * 24 * 60 * 60 * 1000
    );

    let expires = "expires=" + date.toUTCString();

    document.cookie =
      cookieName + "=" + cookiePassedValue + ";" + expires + ";path=/";
  };

  deleteCookie = () => {
    document.cookie = `${this.#_cookieObject.cookieName}=;expires=${new Date(
      0
    )};path=/`;
  };
}

const tokenCookie = new Cookie({ cookieName: "userToken", expire: 30 });

export { checkUserCookie, tokenCookie };
export default Cookie;
