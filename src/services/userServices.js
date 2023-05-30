const createUserToken = (length = 15) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const userAccount = () => {
  const storageKey = "user-account";
  const getUserAccount = () => JSON.parse(localStorage.getItem(storageKey));
  const setUserAccount = (value) =>
    localStorage.setItem(storageKey, JSON.stringify(value));

  return { getUserAccount, setUserAccount };
};

export { createUserToken, userAccount };
