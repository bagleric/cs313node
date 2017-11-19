const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var pg = require("pg"); // This is the postgres database connection module.
const connectionString = "postgres://the_user:the_user@localhost:5432/workout";
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
app.get('/try', function (request, response) {
    getInitialData();
});

function signIn(request, response) {
    // First get the person's id
    var id = request.query.id;
    // TODO: It would be nice to check here for a valid id before continuing on...
    // use a helper function to query the DB, and provide a callback for when it's done
    getUserInfo(id, function (error, result) {
        // This is the callback function that will be called when the DB is done.
        // The job here is just to send it back.
        // Make sure we got a row with the person, then prepare JSON to send back
        if (error || result == null || result.length != 1) {
            response.status(500).json({
                success: false
                , data: error
            });
        }
        else {
            var person = result[0];
            response.status(200).json(result[0]);
        }
    });
}

function getInitialData(request, response) {
    var client = new pg.Client(connectionString);
    client.connect(function (err) {
        if (err) {
            console.log("Error connecting to DB: ")
            console.log(err);
            callback(err, null);
        }
        getCategories(client);
        getWorkouts(client);
        getAllExercises(client);

    });
}

function getCategories(client) {
    var sql = "SELECT id, name FROM workout_category";
    //var params = [id];
    var query = client.query(sql, function (err, result) {
        client.end(function (err) {
            if (err) throw err;
        });
        if (err) {
            console.log("Error in query: ")
            console.log(err);
            callback(err, null);
        }
        console.log("Found result: " + JSON.stringify(result.rows));
        // call whatever function the person that called us wanted,     giving it
        // the results that we have been compiling
        callback(null, result.rows);
    });
    console.log(query);
//    for (var i = 0; i < query.length; i++) {
//        var id = query[i].id;
//        var name = query[i].name;
//        console.log("ID: " + id + " Name:" + name);
//    }
}

function getCategoryExercises() {}

function getWorkouts() {}

function getWorkoutExercises() {}

function getAllExercises() {}

function getUserInfo() {}

function getFavoriteExercises() {}

function createWorkout() {}

function createExercise() {}

function createUser() {}

function updateUserInfo() {}

function updateFavoriteExercises() {}

function getUserInfo(id, callback) {
    console.log("Getting person from DB with id: " + id);
    var client = new pg.Client(connectionString);
    client.connect(function (err) {
        if (err) {
            console.log("Error connecting to DB: ")
            console.log(err);
            callback(err, null);
        }
        var sql = "SELECT id, first, last, birthdate FROM person WHERE id = $1::int";
        var params = [id];
        var query = client.query(sql, params, function (err, result) {
            // we are now done getting the data from the DB, disconnect the client
            client.end(function (err) {
                if (err) throw err;
            });
            if (err) {
                console.log("Error in query: ")
                console.log(err);
                callback(err, null);
            }
            console.log("Found result: " + JSON.stringify(result.rows));
            // call whatever function the person that called us wanted, giving it
            // the results that we have been compiling
            callback(null, result.rows);
        });
    });
} // end of getPersonFromDb