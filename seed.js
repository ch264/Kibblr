const db = require('./models');

let reviews_list = [{
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
        username: 'brandon',
        text: "My dog hated this restaurant.",
        place: "Hops And Hominy"
    }
];

let users_list = [{
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

let places_list = [{
        name: "Hops And Hominy",
        type: "restaurant",
        address: "1 Tillman Pl, San Francisco, CA 94108",
        rating: 2,
        url: '../public/restaurantThree.html'
    },
    {
        name: "Universal Cafe",
        type: "restaurant",
        address: "2814 19th St San Francisco, CA 94110",
        rating: 4,
        url: '../public/restaurantOne.html'
    },
    {
        name: "Universal Restaurant",
        type: "restaurant",
        address: "0101 Public Street San Francisco, CA 94110",
        rating: 4,
        url: '../public/restaurantOne.html'
    },
    {
        name: "Barebottle Brewing Company",
        type: "restaurant",
        address: "1525 Cortland Ave San Francisco, CA 94110",
        rating: 5,
        url: '../public/restaurantTwo.html'
    }
];

//  HEAD
// db.Review.remove({}, (err, reviews) => {
//     db.Review.create(reviews_list, function(err, reviews){
//         if (err){
//             return console.log("Error:", err);
//     }
//     console.log(`Created new review: ${reviews.text}`);
//     process.exit();
//     });
// });

// db.User.remove({}, (err, users) => {
//     db.User.create(users_list, function(err, users){
//         if (err){
//             return console.log("Error:", err);
//     }
//     console.log(`Created new user ${users.username}`);
//     process.exit();
//     });
// });

// db.Place.remove({}, (err, places) => {
//     db.Place.create(places_list, function(err, places){
//         if (err){
//             return console.log("Error:", err);
//     }
//     console.log(`Created new place: ${places.text}`);
//     process.exit();
// =======
// db.Review.remove({}, (err, reviews) => {
//     db.Review.create(reviews_list, function(err, reviews){
//     if (err){
//         return console.log("Error:", err);
//     }
//     console.log(`Created new review: ${reviews.text}`);
//     process.exit();
// });
// });

// db.User.remove({}, (err, users) => {
//     db.User.create(users_list, function(err, users){
//     if (err){
//         return console.log("Error:", err);
//     }
//     console.log(`Created new user ${users.username}`);
//     process.exit();
// });
// });

db.Place.deleteMany({}, function(err, places) {
    console.log('removed all places');

    places_list.forEach(function(placeData) {
        var place = new db.Place({
            name: placeData.name,
            type: placeData.type,
            review: placeData.review,
            address: placeData.address,
            rating: placeData.rating
        });

        place.save(function(err, savedPlace) {
            if (err) {
                console.log(err);
            }
            console.log('saved ' + savedPlace.name + ' by ' + savedPlace.type);
        });
    });
});

db.User.deleteMany({}, function(err, users) {
    console.log('removed all users');

    users_list.forEach(function(userData) {
        var user = new db.User({
            name: userData.name,
            username: userData.username,
            email: userData.email,
            password: userData.password
        });

        user.save(function(err, savedUser) {
            if (err) {
                console.log(err);
            }
            console.log('saved ' + savedUser.name + ' by ' + savedUser.username);
        });
    });
});

db.Review.deleteMany({}, function(err, reviews) {
    console.log('removed all reviews');

    reviews_list.forEach(function(reviewData) {
        var review = new db.Review({
            date: reviewData.date,
            rating: reviewData.rating,
            text: reviewData.text
        });

        review.save(function(err, savedReview) {
            if (err) {
                console.log(err);
            }
            console.log('saved ' + savedReview.date + ' by ' + savedReview.text);
        });
    });
});