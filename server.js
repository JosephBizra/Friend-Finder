var express = require("express");

var path = require("path");

var PORT = 8080;

var app = express();
require("./app/routing/htmlRoutes")(app);
require("./app/routing/apiRoutes.js")(app);
    // app.get("/", function (req, res) {
    //     res.sendFile(path.join(__dirname, "/app/public/home.html"));
    // });
    // app.get("/survey", function (req, res) {
    //     res.sendFile(path.join(__dirname, "/app/public/survey.html"));
    // });
// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {

    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});

