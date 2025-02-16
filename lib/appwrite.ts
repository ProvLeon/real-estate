import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

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

    const response = account.createOAuth2Session(
      OAuthProvider.Google,
      redirectUi,
    );

    if (!response) throw new Error("Failed to Login");

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUi,
    );

    if (browserResult.type !== "success") throw new Error("Failed to Login");

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secret || !userId) throw new Error("Failed to Login");

    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create a session");
  } catch (error) {
    console.error(error);
    return false;
  }
};
