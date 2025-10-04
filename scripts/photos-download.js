import fs from 'fs';
import http from 'http';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const menu = [
        // {
        //     /*id: "1",*/
        //     name: "Classic Cheeseburger",
        //     description: "Beef patty, cheese, lettuce, tomato",
        //     image_url:
        //         "https://static.vecteezy.com/system/resources/previews/044/844/600/large_2x/homemade-fresh-tasty-burger-with-meat-and-cheese-classic-cheese-burger-and-vegetable-ai-generated-free-png.png",
        // },
        // {
        //     /*id: "2",*/
        //     name: "Pepperoni Pizza",
        //     description: "Loaded with cheese and pepperoni slices",
        //     image_url:
        //         "https://static.vecteezy.com/system/resources/previews/023/742/417/large_2x/pepperoni-pizza-isolated-illustration-ai-generative-free-png.png",
        // },
        // {
        //     /*id: "3",*/
        //     name: "Bean Burrito",
        //     description: "Stuffed with beans, rice, salsa",
        //     image_url:
        //         "https://static.vecteezy.com/system/resources/previews/055/133/581/large_2x/deliciously-grilled-burritos-filled-with-beans-corn-and-fresh-vegetables-served-with-lime-wedge-and-cilantro-isolated-on-transparent-background-free-png.png",
        // },
        {
            /*id: "4",*/
            name: "BBQ Bacon Burger",
            description: "Smoky BBQ sauce, crispy bacon, cheddar",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/060/236/245/large_2x/a-large-hamburger-with-cheese-onions-and-lettuce-free-png.png",
        },
        // {
        //     /*id: "5",*/
        //     name: "Chicken Caesar Wrap",
        //     description: "Grilled chicken, lettuce, Caesar dressing",
        //     image_url:
        //         "https://static.vecteezy.com/system/resources/previews/048/930/603/large_2x/caesar-wrap-grilled-chicken-isolated-on-transparent-background-free-png.png",
        // },
        {
            /*id: "6",*/
            name: "Grilled Veggie Sandwich",
            description: "Roasted veggies, pesto, cheese",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/047/832/012/large_2x/grilled-sesame-seed-bread-veggie-sandwich-with-tomato-and-onion-free-png.png",

        },
        {
            /*id: "7",*/
            name: "Double Patty Burger",
            description: "Two juicy beef patties and cheese",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/060/359/627/large_2x/double-cheeseburger-with-lettuce-tomatoes-cheese-and-sesame-bun-free-png.png",

        },
        {
            /*id: "8",*/
            name: "Paneer Tikka Wrap",
            description: "Spicy paneer, mint chutney, veggies",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/057/913/530/large_2x/delicious-wraps-a-tantalizing-array-of-wraps-filled-with-vibrant-vegetables-succulent-fillings-and-fresh-ingredients-artfully-arranged-for-a-mouthwatering-culinary-experience-free-png.png",

        },
        {
            /*id: "9",*/
            name: "Mexican Burrito Bowl",
            description: "Rice, beans, corn, guac, salsa",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/057/466/374/large_2x/healthy-quinoa-bowl-with-avocado-tomato-and-black-beans-ingredients-free-png.png",
            
        },
        {
            /*id: "10",*/
            name: "Spicy Chicken Sandwich",
            description: "Crispy chicken, spicy sauce, pickles",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/051/814/008/large_2x/a-grilled-chicken-sandwich-with-lettuce-and-tomatoes-free-png.png",
            
        },
        {
            /*id: "11",*/
            name: "Classic Margherita Pizza",
            description: "Tomato, mozzarella, fresh basil",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/058/700/845/large_2x/free-isolated-on-transparent-background-delicious-pizza-topped-with-fresh-tomatoes-basil-and-melted-cheese-perfect-for-food-free-png.png",
            
        },
        {
            /*id: "12",*/
            name: "Protein Power Bowl",
            description: "Grilled chicken, quinoa, veggies",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/056/106/379/large_2x/top-view-salad-with-chicken-avocado-tomatoes-and-lettuce-free-png.png",
            
        },
        {
            /*id: "13",*/
            name: "Paneer Burrito",
            description: "Paneer cubes, spicy masala, rice, beans",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/056/565/254/large_2x/burrito-with-cauliflower-and-vegetables-free-png.png",
            
        },
        {
            /*id: "14",*/
            name: "Chicken Club Sandwich",
            description: "Grilled chicken, lettuce, cheese, tomato",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/060/364/135/large_2x/a-flavorful-club-sandwich-with-turkey-bacon-and-fresh-vegetables-sliced-and-isolated-on-a-transparent-background-free-png.png",
           
        },
    ];


const downloadFolder = path.join(__dirname, 'downloaded_photos');
if (!fs.existsSync(downloadFolder)) {
    fs.mkdirSync(downloadFolder);
}

// ...existing code...

function downloadPhoto(photo) {
    // Add debugging to see what we're getting
    console.log('Photo object:', photo);
    
    if (!photo || !photo.image_url) {
        console.error('Invalid photo object or missing URL:', photo);
        return;
    }

    const fileName = `${photo.name || 'unnamed'}${path.extname(photo.image_url)}`;
    const filePath = path.join(downloadFolder, fileName);

    const protocol = photo.image_url.startsWith('https') ? https : http;
    protocol.get(photo.image_url, (res) => {
        if (res.statusCode !== 200) {
            console.error(`Failed to download ${photo.image_url}: ${res.statusCode}`);
            return;
        }
        const fileStream = fs.createWriteStream(filePath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
            fileStream.close();
            console.log(`Downloaded: ${fileName}`);
        });
    }).on('error', (err) => {
        console.error(`Error downloading ${photo.url}: ${err.message}`);
    });
}

// Add debugging to see the data structure
console.log('Menu:', menu);

if (menu && Array.isArray(menu)) {
    menu.forEach(downloadPhoto);
} else {
    console.error('menu is not an array or is undefined');
}