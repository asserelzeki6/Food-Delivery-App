const dummyData = {
    categories: [
        { /*id:1,*/ name: "Burgers", description: "Juicy grilled burgers" },
        { /*id:2,*/ name: "Pizzas", description: "Oven-baked cheesy pizzas" },
        { /*id:3,*/ name: "Burritos", description: "Rolled Mexican delights" },
        { /*id:4,*/ name: "Sandwiches", description: "Stacked and stuffed sandwiches" },
        { /*id:5,*/ name: "Wraps", description: "Rolled up wraps packed with flavor" },
        { /*id:6,*/ name: "Bowls", description: "Balanced rice and protein bowls" },
    ],

    customizations: [   
        // Toppings
        { /*id: 1,*/ name: "Extra Cheese", price: 25, type: "topping" },
        { /*id: 2,*/ name: "Jalapeños", price: 20, type: "topping" },
        { /*id: 3,*/ name: "Onions", price: 10, type: "topping" },
        { /*id: 4,*/ name: "Olives", price: 15, type: "topping" },
        { /*id: 5,*/ name: "Mushrooms", price: 18, type: "topping" },
        { /*id: 6,*/ name: "Tomatoes", price: 10, type: "topping" },
        { /*id: 7,*/ name: "Bacon", price: 30, type: "topping" },
        { /*id: 8,*/ name: "Avocado", price: 35, type: "topping" },

        // Sides
        { /*id: 9,*/ name: "Coke", price: 30, type: "side" },
        { /*id: 10,*/ name: "Fries", price: 35, type: "side" },
        { /*id: 11,*/ name: "Garlic Bread", price: 40, type: "side" },
        { /*id: 12,*/ name: "Chicken Nuggets", price: 50, type: "side" },
        { /*id: 13,*/ name: "Iced Tea", price: 28, type: "side" },
        { /*id: 14,*/ name: "Salad", price: 33, type: "side" },
        { /*id: 15,*/ name: "Potato Wedges", price: 38, type: "side" },
        { /*id: 16,*/ name: "Mozzarella Sticks", price: 45, type: "side" },
        { /*id: 17,*/ name: "Sweet Corn", price: 25, type: "side" },
        { /*id: 18,*/ name: "Choco Lava Cake", price: 42, type: "side" },
    ],

    menu: [
        {
            /*id: "1",*/
            name: "Classic Cheeseburger",
            description: "Beef patty, cheese, lettuce, tomato",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/044/844/600/large_2x/homemade-fresh-tasty-burger-with-meat-and-cheese-classic-cheese-burger-and-vegetable-ai-generated-free-png.png",
            price: 25.99,
            rating: 4.5,
            calories: 550,
            protein: 25,
            category_name: "Burgers",
            customizations: ["Extra Cheese", "Coke", "Fries", "Onions", "Bacon"],
        },
        {
            /*id: "2",*/
            name: "Pepperoni Pizza",
            description: "Loaded with cheese and pepperoni slices",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/023/742/417/large_2x/pepperoni-pizza-isolated-illustration-ai-generative-free-png.png",
            price: 30.99,
            rating: 4.7,
            calories: 700,
            protein: 30,
            category_name: "Pizzas",
            customizations: [
                "Extra Cheese",
                "Jalapeños",
                "Garlic Bread",
                "Coke",
                "Olives",
            ],
        },
        {
            /*id: "3",*/
            name: "Bean Burrito",
            description: "Stuffed with beans, rice, salsa",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/055/133/581/large_2x/deliciously-grilled-burritos-filled-with-beans-corn-and-fresh-vegetables-served-with-lime-wedge-and-cilantro-isolated-on-transparent-background-free-png.png",
            price: 20.99,
            rating: 4.2,
            calories: 480,
            protein: 18,
            category_name: "Burritos",
            customizations: ["Jalapeños", "Iced Tea", "Fries", "Salad"],
        },
        {
            /*id: "4",*/
            name: "BBQ Bacon Burger",
            description: "Smoky BBQ sauce, crispy bacon, cheddar",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/060/236/245/large_2x/a-large-hamburger-with-cheese-onions-and-lettuce-free-png.png",
            price: 27.5,
            rating: 4.8,
            calories: 650,
            protein: 29,
            category_name: "Burgers",
            customizations: ["Onions", "Fries", "Coke", "Bacon", "Avocado"],
        },
        {
            /*id: "5",*/
            name: "Chicken Caesar Wrap",
            description: "Grilled chicken, lettuce, Caesar dressing",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/048/930/603/large_2x/caesar-wrap-grilled-chicken-isolated-on-transparent-background-free-png.png",
            price: 21.5,
            rating: 4.4,
            calories: 490,
            protein: 28,
            category_name: "Wraps",
            customizations: ["Extra Cheese", "Coke", "Potato Wedges", "Tomatoes"],
        },
        {
            /*id: "6",*/
            name: "Grilled Veggie Sandwich",
            description: "Roasted veggies, pesto, cheese",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/047/832/012/large_2x/grilled-sesame-seed-bread-veggie-sandwich-with-tomato-and-onion-free-png.png",
            price: 19.99,
            rating: 4.1,
            calories: 420,
            protein: 19,
            category_name: "Sandwiches",
            customizations: ["Mushrooms", "Olives", "Mozzarella Sticks", "Iced Tea"],
        },
        {
            /*id: "7",*/
            name: "Double Patty Burger",
            description: "Two juicy beef patties and cheese",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/060/359/627/large_2x/double-cheeseburger-with-lettuce-tomatoes-cheese-and-sesame-bun-free-png.png",
            price: 32.99,
            rating: 4.9,
            calories: 720,
            protein: 35,
            category_name: "Burgers",
            customizations: [
                "Extra Cheese",
                "Onions",
                "Fries",
                "Coke",
                "Chicken Nuggets",
            ],
        },
        {
            /*id: "8",*/
            name: "Paneer Tikka Wrap",
            description: "Spicy paneer, mint chutney, veggies",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/057/913/530/large_2x/delicious-wraps-a-tantalizing-array-of-wraps-filled-with-vibrant-vegetables-succulent-fillings-and-fresh-ingredients-artfully-arranged-for-a-mouthwatering-culinary-experience-free-png.png",
            price: 23.99,
            rating: 4.6,
            calories: 470,
            protein: 20,
            category_name: "Wraps",
            customizations: ["Jalapeños", "Tomatoes", "Salad", "Fries", "Iced Tea"],
        },
        {
            /*id: "9",*/
            name: "Mexican Burrito Bowl",
            description: "Rice, beans, corn, guac, salsa",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/057/466/374/large_2x/healthy-quinoa-bowl-with-avocado-tomato-and-black-beans-ingredients-free-png.png",
            price: 26.49,
            rating: 4.7,
            calories: 610,
            protein: 24,
            category_name: "Bowls",
            customizations: ["Avocado", "Sweet Corn", "Salad", "Iced Tea"],
        },
        {
            /*id: "10",*/
            name: "Spicy Chicken Sandwich",
            description: "Crispy chicken, spicy sauce, pickles",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/051/814/008/large_2x/a-grilled-chicken-sandwich-with-lettuce-and-tomatoes-free-png.png",
            price: 24.99,
            rating: 4.3,
            calories: 540,
            protein: 26,
            category_name: "Sandwiches",
            customizations: [
                "Jalapeños",
                "Onions",
                "Fries",
                "Coke",
                "Choco Lava Cake",
            ],
        },
        {
            /*id: "11",*/
            name: "Classic Margherita Pizza",
            description: "Tomato, mozzarella, fresh basil",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/058/700/845/large_2x/free-isolated-on-transparent-background-delicious-pizza-topped-with-fresh-tomatoes-basil-and-melted-cheese-perfect-for-food-free-png.png",
            price: 26.99,
            rating: 4.1,
            calories: 590,
            protein: 21,
            category_name: "Pizzas",
            customizations: ["Extra Cheese", "Olives", "Coke", "Garlic Bread"],
        },
        {
            /*id: "12",*/
            name: "Protein Power Bowl",
            description: "Grilled chicken, quinoa, veggies",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/056/106/379/large_2x/top-view-salad-with-chicken-avocado-tomatoes-and-lettuce-free-png.png",
            price: 29.99,
            rating: 4.8,
            calories: 580,
            protein: 38,
            category_name: "Bowls",
            customizations: ["Avocado", "Salad", "Sweet Corn", "Iced Tea"],
        },
        {
            /*id: "13",*/
            name: "Paneer Burrito",
            description: "Paneer cubes, spicy masala, rice, beans",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/056/565/254/large_2x/burrito-with-cauliflower-and-vegetables-free-png.png",
            price: 24.99,
            rating: 4.2,
            calories: 510,
            protein: 22,
            category_name: "Burritos",
            customizations: ["Jalapeños", "Fries", "Garlic Bread", "Coke"],
        },
        {
            /*id: "14",*/
            name: "Chicken Club Sandwich",
            description: "Grilled chicken, lettuce, cheese, tomato",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/060/364/135/large_2x/a-flavorful-club-sandwich-with-turkey-bacon-and-fresh-vegetables-sliced-and-isolated-on-a-transparent-background-free-png.png",
            price: 27.49,
            rating: 4.5,
            calories: 610,
            protein: 31,
            category_name: "Sandwiches",
            customizations: ["Bacon", "Tomatoes", "Mozzarella Sticks", "Iced Tea"],
        },
    ],
};

export default dummyData;