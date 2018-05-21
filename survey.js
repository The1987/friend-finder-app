
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT ||3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



//ROUTES
//Basic route to send user to AJAX page

// HOME //
// At "/" load page home.html
app.get("/", function(req, res) {
   // res.send("Welcome to Friend Finder");
   res.sendFile(path.join(__dirname, "app/public/home.html"));
});

// SURVEY //
// At "/survey" load page survey.html
app.get("/survey", function(req, res) {
   // res.send("Complete the Survey");
   res.sendFile(path.join(__dirname, "app/public/survey.html"));
});


//DISPLAY ROUTES
// SURVEY //
app.get("/api/survey", function(req, res) {
   return res.json(userData);
});


//DISPLAY SURVEY OR FALSE
// SURVEY //
app.get("/api/survey/:user-data", function(req, res) {
   // Grab the selected parameter
   var chosen = req.params.userData;
   console.log(chosen);
 
   // Filter to show only the selected character
   for (var i = 0; i < userData.length; i++) {
     if (chosen === userData[i].routeName) {
       return res.json(userData[i]);
     }
   }
 
   // Otherwise display "No character found"
   return res.json(false);
 });


 //CREATE or TAKE NEW SURVEY -- DO I NEED THIS ????
 app.post("/api/user-data", function(req, res) {
     var newEntry = req.body;

     newEntry.routeName = newEntry.name.replace(/\s+/g, "").toLowerCase();

     console.log(newEntry);
     userData.push(newEntry);

     res.json(newEntry);   
 });

 //Listening to Server
 app.listen(PORT, function() {
   console.log("App listening on PORT " + PORT);
 });
