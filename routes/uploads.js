var express = require('express'); 
var router = express.Router(); 
var util = require("util"); 
var fs = require("fs"); 
var lineReader = require('line-reader');
 
router.get('/', function(req, res) { 
    res.render("uploadPage", {title: "Upload your workout"}); 
}); 
 
router.post("/upload", function(req, res, next){ 
    if (req.files) { 
        console.log(util.inspect(req.files));
        if (req.files.workout.size === 0) {
                    return next(new Error("No file selected!"));
        }
        fs.exists(req.files.workout.path, function(exists) { 
            if(exists) {
                lineReader.eachLine(req.files.workout.path, function(line, last) {
                    console.log(line);
                    var arr = line.split(",");
                    console.log(arr[0]);
                    // Set internal DB variable
                    var db = req.db;
                    // Set collection
                    var userWorkouts = db.get('workouts');
                    // Submit to the DB, very quick and durty!
                    userWorkouts.insert({
                        "ActivityID" : arr[0],
                        "ActivityName" : arr[1],
                        "Description" : arr[2],
                        "BeginTimestamp" : arr[3],
                        "BeginTimestamp (Raw Milliseconds)" : arr[4],
                        "EndTimestamp" : arr[5],
                        "EndTimestampRaw Milliseconds" : arr[6],
                        "Device" : arr[7],
                        "ActivityParent" : arr[8],
                        "ActivityType" : arr[9],
                        "EventType" : arr[10],
                        "ActivityTimeZone" : arr[11],
                        "MaxElevation" : arr[12],
                        "MaxElevationRaw" : arr[13],
                        "BeginLatitudeDecimalDegreesRaw" : arr[14],
                        "BeginLongitudeDecimalDegreesRaw" : arr[15],
                        "EndLatitudeDecimalDegreesRaw" : arr[16],
                        "EndLongitudeDecimalDegreesRaw" : arr[17],
                        "AverageMovingSpeed" : arr[18],
                        "AverageMovingSpeedRaw" : arr[19],
                        "MaxHeartRatebpm" : arr[20],
                        "AverageHeartRatebpm" : arr[21],
                        "MaxSpeed" : arr[22],
                        "MaxSpeed (Raw)" : arr[23],
                        "Calories" : arr[24],
                        "CaloriesRaw" : arr[25],
                        "Duration" : arr[26],
                        "DurationRawSeconds" : arr[27],
                        "MovingDuration" : arr[28],
                        "MovingDurationRawSeconds" : arr[29],
                        "AverageSpeed" : arr[30],
                        "AverageSpeed (Raw)" : arr[31],
                        "Distance" : arr[32],
                        "DistanceRaw" : arr[33],
                        "MaxHeartRatebpm" : arr[34],
                        "MinElevation" : arr[35],
                        "MinElevationRaw" : arr[36],
                        "ElevationGain" : arr[37],
                        "ElevationGainRaw" : arr[38],
                        "ElevationLoss" : arr[39],
                        "ElevationLossRaw" : arr[40]
                    }, function (err, doc) {
                        if (err) {
                            // If it failed, return error
                            console.log(err);
                        }
                        else {
                            console.log("success");
                        }
                    });
                    // do whatever you want with line...
                    if(last){
                        // or check if it's the last one
                    }
                });                
                res.render("fileupload", {title: "Upload your workout"}); 
                res.end("File upload Successful."); 
            } else { 
                res.render("fileupload", {title: "Upload your workout"}); 
                res.end("error occurred during upload!!"); 
            } 
        }); 
    } 
});
module.exports = router;
