import { Account, Avatars, Client } from "react-native-appwrite";
import * as Linking from "expo-linking";

export const config = {
  platform: "com.orlixis.restate",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform);

export const avatar = new Avatars(client);
export const account = new Account(client);

export const login = async () => {
  try {
    const redirectUi = Linking.createURL("/");

    const response = await account.createOAuth2Session();
  } catch (error) {
    console.error(error);
    dd;
    return false;
  }
};
