import http from "./httpServices";

const accountsURL = "/accounts";

const getAccounts = (userToken = "") => {
  return http.get(accountsURL + userToken);
};

const createAccount = (accountObj) => {
  return http.post(accountsURL, accountObj);
};

export { getAccounts, createAccount };
