// var friends = require("./../data/friend.js");

// // put server.js's app variable as parameter in order to use it here.
// module.exports = function(app) {
//     // api in api/friends does nothing. more for sorting.
//     app.get("/api/friends", function (req, res) {
//         res.json(friends);
//     });
//     app.get("/survey", function (req, res) {
//         res.sendFile(path.join(__dirname, "/../public/survey.html"));
//     });

//     //post into friends variable
//     // app.post listens for anything coming to /api/friends
//     app.post("/api/friends", function(req, res){
//         // req is the object with all info and keys and .body contains the friends data
//         var userInput = req.body
//         var scoreDifference = Infinity;
        

//         // loop thru list of friends
//         for(var i = 0; i < friends.length; i++){
//             console.log(friends[i]);
//             var currentFriend = friends[i];

//             // loop through our list of scores
//             for(var j = 0; j < userInput.score; j++ ){

//                 var myCurrentScore = userInput.score[j];
//                 var friendsCurrentScore = currentFriend.score[j];

//                 console.log(Math.abs(myCurrentScore - friendsCurrentScore))
//                 // eachDiff += 
//                 // var answer = Math.abs(friends[i].score[j] - myCurrentScore);
//                 // answer = numbers;
//                 // app.post("api/friends", function(req, res){
//                 //     res.send()
//                 // })
//             }
//             // if(eachDiff == totalDiff){
//             //     totalDiff = eachDiff

//             // }
//         }

//         //res sends data back to frontend
//         res.json({name: userInput.name, photo: userInput.photo, score: userInput.score});
//         console.log(friends);
//         friends.push(userInput);
//     });
// };

// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on all possible friends
// ===============================================================================

var friends = require("../data/friend.js");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
 // API GET Requests
 // Below code handles when users "visit" a page.
 // In each of the below cases when a user visits a link
 // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
 // ---------------------------------------------------------------------------

 app.get("/api/friends", function(req, res) {
   res.json(friends);
 });

 // API POST Requests
 // Below code handles when a user submits a form and thus submits data to the server.
 // In each of the below cases, when a user submits form data (a JSON object)
 // ...the JSON is pushed to the appropriate JavaScript array
 // ---------------------------------------------------------------------------

 app.post("/api/friends", function(req, res) {
   // Note the code here. Our "server" will respond to a user"s survey result
   // Then compare those results against every user in the database.
   // It will then calculate the difference between each of the numbers and the user"s numbers.
   // It will then choose the user with the least differences as the "best friend match."
   // In the case of multiple users with the same result it will choose the first match.
   // After the test, it will push the user to the database.

   // We will use this object to hold the "best match". We will constantly update it as we
   // loop through all of the options
   var bestMatch = {
     name: "",
     photo: "",
     friendDifference: Infinity
   };

   // Here we take the result of the user"s survey POST and parse it.
   var userData = req.body;
   var userScores = userData.score;

   // This variable will calculate the difference between the user"s scores and the scores of
   // each user in the database
   var totalDifference;

   // Here we loop through all the friend possibilities in the database.
   for (var i = 0; i < friends.length; i++) {
     var currentFriend = friends[i];
     totalDifference = 0;

     console.log(currentFriend.name);

     // We then loop through all the scores of each friend
     for (var j = 0; j < currentFriend.score.length; j++) {
       var currentFriendScore = currentFriend.score[j];
       var currentUserScore = userScores[j];

       // We calculate the difference between the scores and sum them into the totalDifference
       totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
     }

     // If the sum of differences is less then the differences of the current "best match"
     if (totalDifference <= bestMatch.friendDifference) {
       // Reset the bestMatch to be the new friend.
       bestMatch.name = currentFriend.name;
       bestMatch.photo = currentFriend.photo;
       bestMatch.friendDifference = totalDifference;
     }
   }

   // Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
   // the database will always return that the user is the user's best friend).
   friends.push(userData);

   // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page
   res.json(bestMatch);
   // for some reason, this is npt preforming the subtraction and is instead displaying all friends.
  });
};