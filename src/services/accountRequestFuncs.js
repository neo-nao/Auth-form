import { createAccount } from "./accountServices";

const createAccountRequest = async (accountObj) => {
  await createAccount(accountObj);
};

export { createAccountRequest };
