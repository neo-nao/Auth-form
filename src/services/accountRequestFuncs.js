import { createAccount, checkDoesAccountExist } from "./accountServices";

const createAccountRequest = (accountObj) => {
  return new Promise(async (resolve, reject) => {
    const availableAccs = await checkDoesAccountExist(accountObj);

    if (availableAccs.length < 1) {
      await createAccount(accountObj);
      resolve();
    } else reject("Account already exists!");
  });
};

export { createAccountRequest };
