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
  constructor(cookieObj = { cookieName: "", expire: 1, cookieValue: "" }) {
    this.isCookieEnabled = checkUserCookie().doesTokenExist;
    this.cookieObj = cookieObj;
  }

  get cookieEnabled() {
    return this.isCookieEnabled;
  }

  set cookieEnabled(val) {
    this.isCookieEnabled = val;
  }

  createTokenCookie = ({
    cookieName = this.cookieObj.cookieName,
    cookiePassedValue = this.cookieObj.cookiePassedValue,
    expire = this.cookieObj.expire,
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
    document.cookie = `${this.cookieObj.cookieName}=;expires=${new Date(
      0
    )};path=/`;
  };
}

const tokenCookie = new Cookie({ cookieName: "userToken", expire: 30 });

export { checkUserCookie, tokenCookie };
export default Cookie;
