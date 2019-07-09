var friends = require("./../data/fiend.js");

// put server.js's app variable as parameter in order to use it here.
module.exports = function(app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });
    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname, "/../public/survey.html"));
    });
}