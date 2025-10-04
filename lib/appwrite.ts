// lib/appwrite.ts
import { CreateUserParams, GetMenuParams, SignInParams } from '@/type';
import { Account, Avatars, Client, Databases, ID, Query, Storage, TablesDB } from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT, // Your Appwrite endpoint
  Platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID, // Your project ID
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID, // Your database ID
  storageId: process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID, // Your storage ID
  usersCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID, // Your users collection ID
  ordersCollectionId: process.env.EXPO_PUBLIC_APPWRITE_ORDERS_COLLECTION_ID, // Your orders collection ID
  categoriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID, // Your categories collection ID
  menuCollectionId: process.env.EXPO_PUBLIC_APPWRITE_MENU_COLLECTION_ID, // Your menu collection ID
  customizationsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_CUSTOMIZATIONS_COLLECTION_ID, // Your customization collection ID
  menuCustomizationsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_MENU_CUSTOMIZATIONS_COLLECTION_ID, // Your menu customization collection ID
};

export const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint!) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId!) // Your project ID
  .setPlatform(appwriteConfig.Platform!); // Your project Platform

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);
export const tablesDB = new TablesDB(client);
export const storage = new Storage(client);

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
    // console.error(error);
    throw new Error((error as string) + ' Failed to create user');
  }
};


export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession({ 
      email, 
      password,
    });
    if (!session) throw new Error('Failed to sign in');
    
  } catch (error) {
    // console.error(error);
    throw new Error((error as string) + ' Failed to sign in');
  }
};

export const signOut = async () => {
  try {
    await account.deleteSession({
      sessionId: 'current'
  });
    // router.replace('/');
  } catch (error) {
    console.error(error);
    throw new Error((error as string) + ' Failed to sign out');
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
        avatar: currentUser.avatar,
      };
  } catch (error) {
    // Alert.alert('Error', error as string || 'Failed to get user');
    console.error(error);
    throw new Error('Failed to get user');
  }
};

export const getMenu = async ({ category, query }: GetMenuParams) => {
    try {
        const queries: string[] = [];
        console.log(category, query);
        if(category) queries.push(Query.equal('categories', category));
        if(query) queries.push(Query.search('name', query));

        const menus = await tablesDB.listRows({
            databaseId: appwriteConfig.databaseId!,
            tableId: appwriteConfig.menuCollectionId!,
            queries: queries,
        })
        console.log(menus);

        return menus.rows;
    } catch (e) {
        throw new Error(e as string);
    }
}

export const getCategories = async () => {
    try {
        const categories = await tablesDB.listRows({
            databaseId: appwriteConfig.databaseId!,
            tableId: appwriteConfig.categoriesCollectionId!,
        })

        return categories.rows;
    } catch (e) {
        throw new Error(e as string);
    }
}
