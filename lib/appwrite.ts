import { Platform } from "react-native";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT, // Your Appwrite endpoint
  Platform: "com.fis.foodordering",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID, // Your project ID
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID, // Your database ID
  usersCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID, // Your users collection ID
  ordersCollectionId: process.env.EXPO_PUBLIC_APPWRITE_ORDERS_COLLECTION_ID, // Your orders collection ID
};