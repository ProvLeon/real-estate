import {
  Account,
  Avatars,
  Client,
  Databases,
  OAuthProvider,
} from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

export const config = {
  platform: "com.orlixis.restate",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,

  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,

  agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
  galleriesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
  propertiesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
  reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

export const login = async () => {
  try {
    const redirectUri = Linking.createURL("/");
    console.log("Redirect URI:", redirectUri);

    const response = account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri,
    );
    console.log("OAuth response:", response);

    if (!response) {
      console.log("No response from createOAuth2Session");
      throw new Error("Failed to Login: No OAuth response");
    }

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri,
    );
    console.log("Browser result:", browserResult);

    if (browserResult.type !== "success") {
      console.log("Browser result type:", browserResult.type);
      throw new Error("Failed to Login: Browser authentication failed");
    }

    const url = new URL(browserResult.url);
    console.log("Parsed URL:", url);

    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();
    console.log("Secret:", secret, "UserID:", userId);

    if (!secret || !userId) {
      throw new Error("Failed to Login: Missing secret or userId");
    }

    const session = await account.createSession(userId, secret);
    console.log("Session created:", session);

    if (!session) {
      throw new Error("Failed to Login: Session creation failed");
    }

    return true;
  } catch (error) {
    console.error("Login error details:", error);
    return false;
  }
};

export const logout = async () => {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await account.get();

    if (response.$id) {
      const userAvatar = avatar.getInitials(response.name);
      return { ...response, avatar: userAvatar.toString() };
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
