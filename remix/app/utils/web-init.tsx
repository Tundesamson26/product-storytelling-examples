import { Client, Account } from "appwrite";

export const client = new Client();
client
  .setEndpoint("http://localhost/v1") // Your API Endpoint
  .setProject("6386be1b38722a42059a"); // Your project ID

export const createAnonymousSession = async () => {
  const account = new Account(client);
   try {
     await account.createAnonymousSession();
   } catch (err) {
     console.log(err);
   }
};