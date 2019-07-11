var friends = require("./../data/friend.js");

// put server.js's app variable as parameter in order to use it here.
module.exports = function(app) {
    // api in api/friends does nothing. more for sorting.
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });
    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname, "/../public/survey.html"));
    });

    //post into friends variable
    // app.post listens for anything coming to /api/friends
    app.post("/api/friends", function(req, res){
        // req is the object with all info and keys and .body contains the friends data
        var userInput = req.body
        console.log(userInput);
        

        var totalDiff = 1000;
        for(var i = 0; i < friends.length; i++){
            var eachDiff = 0;
            for(var j = 0; j < userInput.score; j++ ){
                var varscore = userInput.score[j];
                eachDiff += Math.abs(friends[i].score[j] - varscore);
            }
            if(eachDiff == totalDiff){
                totalDiff = eachDiff
                
            }
        }

        //res sends data back to frontend
        res.json({name: "", photo: "",});
        console.log(friends);
        friends.push(userInput);
    });
};