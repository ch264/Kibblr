//add express
const express = require('express');
const app = express();

//connect to database
const db = require('./models');

//add bodyparser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
        baseUrl: "http://YOUR-APP-NAME.herokuapp.com",
        endpoints: [
          {method: "GET", path: "/api", description: "Describes all available endpoints"},
          {method: "GET", path: "/api/profile", description: "Data about the user"},
          {method: "GET", path: "/api/place", description: "Show all place reviews"},
          {method: "GET", path: "/api/place/:id", description: "Show a specific place"},
          {method: "GET", path: "/api/review", description: "Show all reviews"},
          {method: "GET", path: "/api/review/:id", description: "Show a specific review"},
          {method: "DELETE", path: "/api/review/:id", description: "Will delete a specific review."},
          {method: "POST", path: "/api/review", description: "Add a new review"},
          {method: "PUT", path: "/api/review", description: "Edit a review."}
        ]
      })
})



// define a root route: localhost:3000/
app.get('/', (req, res) => {
  res.sendFile('views/index.html' , { root : __dirname});
});

//find all users
app.get('/api/user', (req, res) => {
  db.User.find({}, (err, foundUsers) => {
    if (err) return console.log(err);
    res.json(foundUsers);
  });
});

//find one user
app.get('/api/user/:id', (req, res) => {
  db.User.findOne({
    _id: req.params.id
  }, (err, foundUser) => {
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
    if (err) {throw err}
    res.json(userCreated);
  });
});

app.put('/api/user/:id', (req, res) => {
  let userId = req.params.id;
  console.log(userId);
  db.User.findOneAndUpdate({ _id: userId }, req.body, (err, updatedUser) => {
  console.log(updatedUser);
  res.json(updatedUser);
})
})

app.delete('/api/user/:id', (req, res) => {
  // let userId = req.params.id;
  // db.User.findOneAndRemove({_id: userId }), (err, deletedUser) => {
  //   res.json(deletedUser);
  // }
  let userId = req.params.id;
  db.User.findOneAndRemove({ _id: userId})
  .exec((err, deletedUser) => {
    if (err) return console.log(err);
    res.json(deletedUser);
});
});

// show all places


// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, () => {
    console.log('Express server is up and running on http://localhost:3000/');
  });
