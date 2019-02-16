const db = require('./models');

let reviews_list = [
    {
        date: "February 15, 2019",
        rating: 4,
        username: "tiffany",
        text: "My dog loved this restaurant.",
        place: "Universal Cafe"
    },
    {
        date: "February 14, 2019",
        rating: 5,
        username: "christina",
        text: "My dog REALLY loved this restaurant.",
        place: "Barebottle Brewing Company"
    },
    {
        date: "February 13, 2019",
        rating: 2,
        username: "brandon",
        text: "My dog hated this restaurant.",
        place: "Hops And Hominy"
    }
];

let users_list = [
    {
        name: "Tiffany Teaze",
        email: "tteaze@gmail.com",
        password: "cookie123",
        username: "tiffany"
    },
    {
        name: "Christina Hastenrath",
        email: "christinahastenrath@gmail.com",
        password: "password123",
        username: "christina"
    },
    {
        name: "Brandon Castillo",
        email: "brandoncastillo@gmail.com",
        password: "password123",
        username: "brandon"
    }
];

let places_list = [
    {
        name: "Hops And Hominy",
        type: "restaurant",
        address: "1 Tillman Pl, San Francisco, CA 94108",
        rating: 2
    },
    {
        name: "Universal Cafe",
        type: "restaurant",
        address: "2814 19th St San Francisco, CA 94110",
        rating: 4
    },
    {
        name: "Barebottle Brewing Company",
        type: "restaurant",
        address: "1525 Cortland Ave San Francisco, CA 94110",
        rating: 5
    }
];

db.Review.remove({}, (err, reviews) => {
    db.Review.create(reviews_list, function(err, reviews){
    if (err){
        return console.log("Error:", err);
    }
    console.log(`Created new review: ${reviews.text}`);
    process.exit();
});
});

db.User.remove({}, (err, users) => {
    db.User.create(users_list, function(err, users){
    if (err){
        return console.log("Error:", err);
    }
    console.log(`Created new user ${users.username}`);
    process.exit();
});
});