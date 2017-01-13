// server.js

// BASE SETUP
// =============================================================================
var Beer = require('./app/models/beer');
// call the packages we need
var express    = require('express');
// call express
var app        = express();
// define our app using express
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/beer_api');
mongoose.Promise = global.Promise;

// set up a variable to hold our model here...

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
// set our port


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();
// get an instance of the express Router

router.use(function(req, res, next) {
  console.log("Something is happening");
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the beer api!' });
});

// more routes for our API will happen here
router.route('/beers')

// create
  .post(function(req, res) {
    // code here
    Beer.create(req.body.beer)
      .then((beer) => { res.json(beer); })
      .catch((err) => { if(err) console.log(err); });
  })

// index
  .get(function(req, res) {
    Beer.find({})
      .then((beers) => { res.json(beers); })
      .catch((err) => { if(err) console.log(err); });
  });


router.route('/api/beers/:beer_id')

  // show
  .get(function(req, res) {
    Beer.findOne({_id: req.params.beer_id})
      .then((beer) => { res.json(beer); })
      .catch((err) => { if(err) console.log(err); });
  })

  // update
  .put(function(req, res) {
    // code here
  })

  // destroy
  .delete(function(req, res) {
    // code here
  })

// View all routes
router.get("/routes", function(req, res){
  console.log(router.stack);
  res.json(router.stack);
});
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(process.env.PORT || port);
console.log('Beer is being served on port ' + port);
