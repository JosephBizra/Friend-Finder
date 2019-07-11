var express = require("express");

var path = require("path");

var PORT = 8080;

var app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
require("./app/routing/htmlRoutes")(app);
require("./app/routing/apiRoutes")(app);
    // app.get("/", function (req, res) {
    //     res.sendFile(path.join(__dirname, "/app/public/home.html"));
    // });
    // app.get("/survey", function (req, res) {
    //     res.sendFile(path.join(__dirname, "/app/public/survey.html"));
    // });

    // Start our server so that it can begin listening to client requests.
// listens to everyhting coming to every route
app.listen(PORT, function () {

    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});

