import { getAccounts, createAccount } from "./accountServices";

const createAccountRequest = (accountObj) => {
  return new Promise(async (resolve, reject) => {
    const queryString = `?${
      accountObj.selectedMethod === "email" && accountObj.email === ""
        ? `email=${accountObj.email}`
        : `number=${accountObj.number}`
    }`;

    const availableAccs = await getAccounts(queryString);

    if (availableAccs.data.length < 1) {
      await createAccount(accountObj);
      resolve();
    } else reject("Account already exists!");
  });
};

export { createAccountRequest };
