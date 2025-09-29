import { ID } from "react-native-appwrite";
import { appwriteConfig, databases, storage, tablesDB } from "./appwrite";
import dummyData from "./data";

interface Category {
    name: string;
    description: string;
}

interface Customization {
    name: string;
    price: number;
    type: "topping" | "side" | "size" | "crust" | string; // extend as needed
}

interface MenuItem {
    name: string;
    description: string;
    image_url: string;
    price: number;
    rating: number;
    calories: number;
    protein: number;
    category_name: string;
    customizations: string[]; // list of customization names
}

interface DummyData {
    categories: Category[];
    customizations: Customization[];
    menu: MenuItem[];
}

// ensure dummyData has correct shape
const data = dummyData as DummyData;

async function clearAll(collectionId: string): Promise<void> {
    if (!appwriteConfig.databaseId) {
        throw new Error("appwriteConfig.databaseId is undefined");
    }
    const list = await databases.listDocuments(
        appwriteConfig.databaseId,
        collectionId
    );

    await Promise.all(
        list.documents.map((doc) =>
            databases.deleteDocument(appwriteConfig.databaseId!, collectionId, doc.$id)
        )
    );
}

async function clearStorage(): Promise<void> {
    if (!appwriteConfig.storageId) {
        throw new Error("appwriteConfig.storageId is undefined");
    }
    const list = await storage.listFiles({ bucketId: appwriteConfig.storageId });

    await Promise.all(
        list.files.map((file) =>
            storage.deleteFile(appwriteConfig.storageId!, file.$id)
        )
    );
}

async function uploadImageToStorage(imageUrl: string) {
    const response = await fetch(imageUrl).finally(() => console.log("fetched image"));
    const blob = await response.blob().finally(() => console.log("converted to blob"));
    const fileObj = {
        name: imageUrl.split("/").pop() || `file-${Date.now()}.jpg`,
        type: blob.type,
        size: blob.size,
        uri: imageUrl,
    };

    const file = await storage.createFile(
        appwriteConfig.storageId!,
        ID.unique(),
        fileObj
    ).finally(() => console.log("uploaded image to storage"));
    return storage.getFileViewURL(appwriteConfig.storageId!, file.$id);
}

async function seed(): Promise<void> {
    // 1. Clear all
    await clearAll(appwriteConfig.categoriesCollectionId!);
    await clearAll(appwriteConfig.customizationsCollectionId!);
    await clearAll(appwriteConfig.menuCollectionId!);
    await clearAll(appwriteConfig.menuCustomizationsCollectionId!);
    await clearStorage();
    console.log("🧹 Cleared existing data.");
    // 2. Create Categories
    const categoryMap: Record<string, string> = {};
    for (const cat of data.categories) {
        // const doc = await databases.createDocument(
        //     appwriteConfig.databaseId!,
        //     appwriteConfig.categoriesCollectionId!,
        //     ID.unique(),
        //     cat
        // );
        const doc = await tablesDB.createRow({
            databaseId: appwriteConfig.databaseId!,
            tableId: appwriteConfig.categoriesCollectionId!,
            rowId: ID.unique(),
            data: cat
        });
        categoryMap[cat.name] = doc.$id;
    }
    console.log("📂 Created categories:", categoryMap)
    ;
    // 3. Create Customizations
    const customizationMap: Record<string, string> = {};
    for (const cus of data.customizations) {
        // const doc = await databases.createDocument(
        //     appwriteConfig.databaseId!,
        //     appwriteConfig.customizationsCollectionId!,
        //     ID.unique(),
        //     {
        //         name: cus.name,
        //         price: cus.price,
        //         type: cus.type,
        //     }
        // );
        const doc = await tablesDB.createRow({
            databaseId: appwriteConfig.databaseId!,
            tableId: appwriteConfig.customizationsCollectionId!,
            rowId: ID.unique(),
            data: {
                name: cus.name,
                price: cus.price,
                type: cus.type,
            }
        });
        customizationMap[cus.name] = doc.$id;
    }
    console.log("🛠 Created customizations:", customizationMap);

    // 4. Create Menu Items
    const menuMap: Record<string, string> = {};
    for (const item of data.menu) {
        const uploadedImage = await uploadImageToStorage(item.image_url);

        // const doc = await databases.createDocument(
        //     appwriteConfig.databaseId!,
        //     appwriteConfig.menuCollectionId!,
        //     ID.unique(),
        //     {
        //         name: item.name,
        //         description: item.description,
        //         image_url: uploadedImage,
        //         price: item.price,
        //         rating: item.rating,
        //         calories: item.calories,
        //         protein: item.protein,
        //         categories: categoryMap[item.category_name],
        //     }
        // );
        const doc = await tablesDB.createRow({
          databaseId: appwriteConfig.databaseId!,
          tableId: appwriteConfig.menuCollectionId!,
          rowId: ID.unique(),
          data: {
            name: item.name,
            description: item.description,
            image_url: uploadedImage,
            price: item.price,
            rating: item.rating,
            calories: item.calories,
            protein: item.protein,
            categories: categoryMap[item.category_name],
          },
        });
        console.log(`🍽 Created menu item: ${item.name} with ID ${doc.$id}`);

        menuMap[item.name] = doc.$id;

        // 5. Create menu_customizations
        for (const cusName of item.customizations) {
            // await databases.createDocument(
            //     appwriteConfig.databaseId!,
            //     appwriteConfig.menuCustomizationsCollectionId!,
            //     ID.unique(),
            //     {
            //         menu: doc.$id,
            //         customizations: customizationMap[cusName],
            //     }
            // );
            await tablesDB.createRow({
              databaseId: appwriteConfig.databaseId!,
              tableId: appwriteConfig.menuCustomizationsCollectionId!,
              rowId: ID.unique(),
              data: {
                menu: doc.$id,
                customizations: customizationMap[cusName],
              },
            });
            console.log(`   - Linked customizations: ${item.customizations.join(", ")}`);
        }
    }

    console.log("✅ Seeding complete.");
}

export default seed;