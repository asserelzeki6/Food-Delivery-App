// lib/appwrite.ts
import { CreateUserParams, SignInParams } from '@/type';
import { Alert } from 'react-native';
import { Account, Avatars, Client, Databases, ID, TablesDB } from 'react-native-appwrite';
export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT, // Your Appwrite endpoint
  Platform: "com.fis.foodordering",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID, // Your project ID
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID, // Your database ID
  usersCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID, // Your users collection ID
  ordersCollectionId: process.env.EXPO_PUBLIC_APPWRITE_ORDERS_COLLECTION_ID, // Your orders collection ID
};

export const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint!) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId!) // Your project ID
  .setPlatform(appwriteConfig.Platform); // Your project Platform

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);
export const tablesDB = new TablesDB(client);

export const createUser = async ({  email, password, name }: CreateUserParams) => {
  try {
    
    const newAccount = await account.create({
      userId: ID.unique(),
      email: email,
      password: password,
      name: name,
    });
    if (!newAccount) throw new Error('Failed to create user');

    await signIn({ email, password });

    const avatarURL = avatars.getInitialsURL(name);

    return await tablesDB.createRow({
      databaseId: appwriteConfig.databaseId!,
      tableId: appwriteConfig.usersCollectionId!,
      rowId: newAccount.$id,
      data: {
        email,
        name,
        avatar: avatarURL,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error((error as string) + ' Failed to create user');
  }
};


export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession({ 
      email, 
      password,
    });
  } catch (error) {
    console.error(error);
    throw new Error((error as string) + ' Failed to sign in');
  }
};


export const getCurrentUser = async () => {
  try {
      const user = await account.get();
      if (!user) throw new Error('No user logged in');
      const currentUser = await tablesDB.getRow({
        databaseId: appwriteConfig.databaseId!,
        tableId: appwriteConfig.usersCollectionId!,
        rowId: user.$id,
      });
      if (!currentUser) throw new Error('User not found');

      return {
        $id: currentUser.$id,
        name: currentUser.name,
        email: currentUser.email,
      };
  } catch (error) {
    Alert.alert('Error', error as string || 'Failed to get user');
    throw new Error('Failed to get user');
  }
};