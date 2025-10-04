import { Asset } from "expo-asset";
import { ID } from "react-native-appwrite";
import { appwriteConfig, storage, tablesDB } from "./appwrite";
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

const path = './downloaded_images';
// ensure dummyData has correct shape
const data = dummyData as DummyData;

// Create a mapping of menu item names to their image assets
const imageAssets: Record<string, any> = {
    "BBQ Bacon Burger": require("./downloaded_photos/BBQ Bacon Burger.png"),
    "Bean Burrito": require("./downloaded_photos/Bean Burrito.png"),
    "Chicken Caesar Wrap": require("./downloaded_photos/Chicken Caesar Wrap.png"),
    "Chicken Club Sandwich": require("./downloaded_photos/Chicken Club Sandwich.png"),
    "Classic Cheeseburger": require("./downloaded_photos/Classic Cheeseburger.png"),
    "Classic Margherita Pizza": require("./downloaded_photos/Classic Margherita Pizza.png"),
    "Double Patty Burger": require("./downloaded_photos/Double Patty Burger.png"),
    "Grilled Veggie Sandwich": require("./downloaded_photos/Grilled Veggie Sandwich.png"),
    "Mexican Burrito Bowl": require("./downloaded_photos/Mexican Burrito Bowl.png"),
    "Paneer Burrito": require("./downloaded_photos/Paneer Burrito.png"),
    "Paneer Tikka Wrap": require("./downloaded_photos/Paneer Tikka Wrap.png"),
    "Pepperoni Pizza": require("./downloaded_photos/Pepperoni Pizza.png"),
    "Protein Power Bowl": require("./downloaded_photos/Protein Power Bowl.png"),
    "Spicy Chicken Sandwich": require("./downloaded_photos/Spicy Chicken Sandwich.png"),
};

async function clearAll(collectionId: string): Promise<void> {
    if (!appwriteConfig.databaseId) {
        throw new Error("appwriteConfig.databaseId is undefined");
    }
    const list = await tablesDB.listRows({
        databaseId: appwriteConfig.databaseId,
        tableId: collectionId
    });

    await Promise.all(
        list.rows.map((doc) =>
            tablesDB.deleteRow({
                databaseId: appwriteConfig.databaseId!,
                tableId: collectionId,
                rowId: doc.$id
            })
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
            storage.deleteFile({
                bucketId: appwriteConfig.storageId!,
                fileId: file.$id
            })
        )
    );
}

async function uploadImageToStorage(menuItemName: string): Promise<string> {
    try {
        // Get the asset from our mapping
        const assetModule = imageAssets[menuItemName];
        if (!assetModule) {
            throw new Error(`No image asset found for: ${menuItemName}`);
        }
        
        // Create asset and download it
        const asset = Asset.fromModule(assetModule);
        await asset.downloadAsync();
        
        // Fetch the local file as blob
        const response = await fetch(asset.localUri || asset.uri);
        if (!response.ok) {
            throw new Error(`Failed to fetch asset: ${response.statusText}`);
        }
        
        const blob = await response.blob();
        const fileName = `${menuItemName.replace(/\s+/g, '_')}.png`;
        
        // Create a File object that react-native-appwrite can handle
        const file = {
            name: fileName,
            type: 'image/png',
            size: blob.size,
            uri: asset.localUri || asset.uri,
        };
        
        const uploadedFile = await storage.createFile({
            bucketId: appwriteConfig.storageId!,
            fileId: ID.unique(),
            file: file
        });
        
        console.log(`Uploaded image for ${menuItemName}`);
        return storage.getFileViewURL(appwriteConfig.storageId!, uploadedFile.$id).toString();
    } catch (error) {
        console.error(`Error uploading image for ${menuItemName}:`, error);
        throw error;
    }
}
// async function uploadImageToStorage(imageUrl: string) {
//     const response = await fetch(imageUrl);
//     const blob = await response.blob();
//     const fileName = imageUrl.split("/").pop() || `file-${Date.now()}.jpg`;

//     // No need to create fileObj manually.
//     // Use the SDK's helper instead.
//     const file = await storage.createFile({
//         bucketId: appwriteConfig.storageId!,
//         fileId: ID.unique(),
//         file: InputFile.fromBlob(blob, fileName) // This is the correct way
//     });
    
//     console.log("Uploaded image to storage");
//     return storage.getFileViewURL(appwriteConfig.storageId!, file.$id);
// }

async function seed(): Promise<void> {
    // 1. Clear all
    // await clearAll(appwriteConfig.categoriesCollectionId!);
    // await clearAll(appwriteConfig.customizationsCollectionId!);
    // await clearAll(appwriteConfig.menuCollectionId!);
    // await clearAll(appwriteConfig.menuCustomizationsCollectionId!);
    // await clearStorage();
    console.log("🧹 Cleared existing data.");
    // 2. Create Categories
    const categoryMap: Record<string, string> = {};
    for (const cat of data.categories) {
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
        const uploadedImage = await uploadImageToStorage(item.name);
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