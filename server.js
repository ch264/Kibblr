//add express
// jshint esversion:6
const express = require('express');
const app = express();

//connect to database
const db = require('./models');

//handlebars
// const handlebars = require('handlebars');

//add bodyparser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

//serve static files
app.use(express.static('public'));

//
app.get('/api', (req, res) => {
    res.json({
        woopsIForgotToDocumentAllMyEndpoints: true,
        message: "Welcome to the Kibblr API! Here's what you need to know!",
        documentationUrl: "https://github.com/example-username/express-personal-api/README.md",
        baseUrl: "https://kibblr.herokuapp.com/",
        endpoints: [
            { method: "GET", path: "/api", description: "Describes all available endpoints" },
            { method: "GET", path: "/api/place", description: "Show all place reviews" },
            { method: "GET", path: "/api/place/:id", description: "Show a specific place" },
            { method: "GET", path: "/api/review", description: "Show all reviews" },
            { method: "GET", path: "/api/review/:id", description: "Show a specific review" },
            { method: "DELETE", path: "/api/review/:id", description: "Will delete a specific review." },
            { method: "POST", path: "/api/review", description: "Add a new review" },
            { method: "PUT", path: "/api/review", description: "Edit a review." },
            { method: "GET", path: "/api/user", description: "View all users." },
            { method: "GET", path: "/api/user/:id", description: "View one specific user." },
            { method: "POST", path: "/api/user", description: "Add a user." },
            { method: "PUT", path: "/api/user/:id", description: "Edit a user." },
            { method: "DELETE", path: "/api/user/:id", description: "Delete a user." },
            { method: "GET", path: "/api/search", description: "Search for a place." }
        ]
    });
});


// define a root route: localhost:3000/
app.get('/', (req, res) => {
    res.sendFile('views/index.html', { root: __dirname });
});

// host HTML pages on root route in server. so move html files to views folder and write out new urls here.
// app.get('/one', (req, res) => {
//     res.sendFile('views/restaurantOne.html', { root: __dirname });
// });

//////////////////
// User Routes
//////////////////

//find all users
app.get('/api/user', (req, res) => {
    db.User.find({}, (err, foundUsers) => {
        if (err) return console.log(err);
        res.json(foundUsers);
    });
});

//find one user
app.get('/api/user/:id', (req, res) => {
    db.User.findOne({ _id: req.params.id }, (err, foundUser) => {
        res.json(foundUser);
    });
});

//create a user
app.post('/api/user', (req, res) => {
    let newUser = new db.User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username
    });

    db.User.create(newUser, (err, userCreated) => {
        if (err) { throw err; }
        res.redirect('/');
    });
});

app.put('/api/user/:id', (req, res) => {
    let userId = req.params.id;
    console.log(userId);
    db.User.findOneAndUpdate({ _id: userId }, req.body, (err, updatedUser) => {
        console.log(updatedUser);
        res.json(updatedUser);
    });
});

app.delete('/api/user/:id', (req, res) => {
    let userId = req.params.id;
    db.User.findOneAndRemove({ _id: userId })
        .exec((err, deletedUser) => {
            if (err) return console.log(err);
            res.json(deletedUser);
        });
});

// app.get('/api/user/${username}/${password}', (req, res) => {

// }

//////////////////
// Places Routes
//////////////////

//find all place
app.get('/api/place', (req, res) => {
    db.Place.find({}, (err, foundPlaces) => {
        if (err) return console.log(err);
        res.json(foundPlaces);
    });
});

app.get('/api/placename/:name', (req, res) => {
    db.Place.findOne({ name: req.params.name }, (err, foundPlace) => {
        if (err) { throw err };
        res.json(foundPlace);
    });
});

// find one place
app.get('/api/place/:id', (req, res) => {
    db.Place.findOne({ _id: req.params.id }, (err, foundPlace) => {
        if (err) { throw err };
        res.json(foundPlace);
    });
});

//create a place
app.post('/api/place', (req, res) => {
    let Place = new db.Place({
        name: req.body.name,
        type: req.body.type,
        review: req.body.review,
        address: req.body.address,
        rating: req.body.rating
    });

    db.Place.create(Place, (err, placeCreated) => {
        if (err) { throw err; }
        res.json(placeCreated);
    });
});


//Edit a place
app.put('/api/place/:id', (req, res) => {
    let placeId = req.params.id;
    console.log(placeId);
    db.Place.findOneAndUpdate({ _id: placeId }, req.body, (err, updatedPlace) => {
        console.log(updatedPlace);
        res.json(updatedPlace);
    });
});

// Delete a place
app.delete('/api/place/:id', (req, res) => {
    let placeId = req.params.id;
    db.Place.findOneAndRemove({ _id: placeId })
        .exec((err, deletedPlace) => {
            if (err) return console.log(err);
            res.json(deletedPlace);
        });
});

app.get('/api/search', (req, res) => {
    console.log("You've tried searching for a place.");
    let searchTerm = req.query.place;
    console.log(searchTerm);
    db.Place.find({ "name": { "$regex": searchTerm } })
        .exec((err, searchedPlaces) => {
            if (err) return console.log("this is an error to log places");
            console.log(searchedPlaces);
            res.json(searchedPlaces);
        });
});


//////////////////
// Reviews Routes
//////////////////

// find all reviews 
app.get('/api/review', (req, res) => {
    db.Review.find({})
        .populate('username')
        .populate('place')
        .exec((err, foundReviews) => {
            if (err) return console.log(err);
            res.json(foundReviews);
        })
});

//find one review
app.get('/api/review/:id', (req, res) => {
    db.Review.findOne({ _id: req.params.id }, (err, foundReview) => {
        res.json(foundReview);
    });
});

// find all reviews of one place
app.get('/api/place/:id/reviews', (req, res) => {
    db.Review.find({ place: req.params.id })
        .populate('username')
        .populate('place')
        .exec((err, foundReviews) => {
            if (err) return console.log(err);
            res.json(foundReviews);
        })
});


//create a review
app.post('/api/review', (req, res) => {
    console.log(req.body);
    db.Review.create(req.body, (err, reviewCreated) => {
        if (err) { throw err; }
        res.json(reviewCreated);
        console.log("You have created a review!");
    });
});

app.put('/api/review/:id', (req, res) => {
    let reviewId = req.params.id;
    console.log(reviewId);
    db.Review.findOneAndUpdate({ _id: reviewId }, req.body, (err, updatedReview) => {
        if (err) return console.log(err);
        console.log(updatedReview);
        res.json(updatedReview);
    });
});

app.delete('/api/review/:id', (req, res) => {
    let reviewId = req.params.id;
    db.Review.findOneAndRemove({ _id: reviewId })
        .exec((err, deletedReview) => {
            if (err) return console.log('server delete error:', err);
            res.json(deletedReview);
        });
});



//////////////////
// Places Routes
//////////////////

//find all place
app.get('/api/place', (req, res) => {
    db.Place.find({}, (err, foundPlaces) => {
        if (err) return console.log(err);
        res.json(foundPlaces);
    });
});

//find one place
app.get('/api/place/:id', (req, res) => {
    db.Place.findOne({ _id: req.params.id }, (err, foundPlace) => {
        res.json(foundPlace);
    });
});

//create a place
app.post('/api/place', (req, res) => {
    let Place = new db.Place({
        name: req.body.name,
        type: req.body.type,
        review: req.body.review,
        address: req.body.address,
        rating: req.body.rating
    });

    db.Place.create(Place, (err, placeCreated) => {
        if (err) { throw err; }
        res.json(placeCreated);
    });
});

app.put('/api/place/:id', (req, res) => {
    let placeId = req.params.id;
    console.log(placeId);
    db.Place.findOneAndUpdate({ _id: placeId }, req.body, (err, updatedPlace) => {
        console.log(updatedPlace);
        res.json(updatedPlace);
    });
});

app.delete('/api/place/:id', (req, res) => {
    let placeId = req.params.id;
    db.Place.findOneAndRemove({ _id: placeId })
        .exec((err, deletedPlace) => {
            if (err) return console.log(err);
            res.json(deletedPlace);
        });
});


/*  PASSPORT SETUP  */

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send("Welcome " + req.query.username + "!!"));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    User.findById(id, function(err, user) {
        cb(err, user);
    });
});

/* PASSPORT LOCAL AUTHENTICATION */

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
        db.User.findOne({
            username: username
        }, function(err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false);
            }

            if (user.password != password) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

app.post('/',
    passport.authenticate('local', { failureRedirect: '/login.html' }),
    function(req, res) {
        res.redirect('/');
    });


// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, () => {
    console.log('Express server is up and running on http://localhost:3000/');
});