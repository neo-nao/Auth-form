import http from "./httpServices";

const accountsURL = "/accounts";

const getAccounts = (userToken = "") => {
  return http.get(accountsURL + userToken);
};

const createAccount = (accountObj) => {
  return http.post(accountsURL, accountObj);
};

const checkDoesAccountExist = async (accountObjValues) => {
  const queryString = `?${
    accountObjValues.selectedMethod === "email" && accountObjValues.email !== ""
      ? `email=${accountObjValues.email.toLowerCase()}`
      : `number=${accountObjValues.number}`
  }`;

  const { data } = await getAccounts(queryString);

  return data;
};

export { getAccounts, createAccount, checkDoesAccountExist };
