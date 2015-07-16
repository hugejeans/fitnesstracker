var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Fitness Tracker' });
});

/* Get the workout list page */
router.get('/workouts', function(req, res){
    var db = req.db;
    var userWorkouts = db.get('workouts');
    userWorkouts.find( {}, {}, function(e,docs){
        res.render('workouts', {
            "workouts" : docs
        });
    });
});

/* Log New workout page. */
router.get('/lognew', function(req, res) {
    res.render('lognew', { title: 'Log New workout' });
});

/* POST to Add User Service */
router.post('/lognew', function(req, res) {

    // Set internal DB variable
    var db = req.db;

    // Get form values. These rely on the "name" attributes
    var ActivityID = req.body.ActivityID;
    var ActivityName = req.body.ActivityName;

    // Set collection
    var collection = db.get('workouts');

    // Submit to the DB
    collection.insert({
        "ActivityID" : ActivityID,
        "ActivityName" : ActivityName
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("workouts");
        }
    });
});


module.exports = router;
