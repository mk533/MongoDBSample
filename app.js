var express = require("express");
var app = express();
//var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = 8000 || process.env.PORT;
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));


var MovieRouter = express.Router();

app.use(bodyParser.json());
app.listen(port, function () {
    console.log("Server Listening on port " + port);
});
app.get('/', function (req, res) {
    //res.send("Hello MK!! This is World0 Welcome");
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect("mongodb://localhost:27017/test", function (err, db) {
        var collection = db.collection('Films');
        collection.find({}).toArray(function (err, results) {
            if (err) {
                throw err;
            } else {
                res.send(results);
            }
        });

    });
    // res.render('index');
});
var objectId = require('mongodb').ObjectId;
app.get('/:id', function (req, res) {
    var id = new objectId(req.params.id);
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect("mongodb://localhost:27017/test", function (err, db) {
        var collection = db.collection('Films');
        collection.findOne({
            _id: id
        }, function (err, results) {
            if (err) {
                throw err;
            } else {
                console.log(results);
                res.send(results);
            }
        });

    });

});
app.get('/2', function (req, res) {
    res.send("Hello MK!! This is World2");
});