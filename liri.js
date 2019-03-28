require("dotenv").config();
// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var figlet = require('figlet');
const chalkAnimation = require('chalk-animation');
const axios = require("axios");

figlet('LIRI', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    const rainbow = chalkAnimation.rainbow(data); // Animation starts
    // console.log(data)

    setTimeout(() => {
        rainbow.stop(); // Animation stops
    }, 1000);

    setTimeout(() => {
        rainbow.start(); // Animation resumes
    }, 2000);

});

setTimeout(runApp, 1000);

function runApp() {
    App(process.argv[2], process.argv[3])
};


function App(command, params) {
// function App(command, artists) {
    switch (command) {
        case "concert-this":
            getMyBand(params);
            break;
        case "spotify-this-song":
            getMySong(params);
            break;
        case "movie-this":
            getMyMovie(params);
            break;
        // case "do-what-it-says":
        //     doWhatISay();
        //     break;
        default:
            console.log("I dont know that command")
    }
};

//Band
function getMyBand(params) {
// function getMyBand(artists) {
    var queryURL = "https://rest.bandsintown.com/artists/" + params + "/events?app_id=codingbootcamp";
    // var queryURL = "https://rest.bandsintown.com/artists/" + artists + "/events?app_id=codingbootcamp";
    // Make a request for a user with a given ID

    axios.get(queryURL)
        .then(function (response) {
            console.log("upcoming concerts for" + params + ": ");
            // console.log("upcoming concerts for" + artists + ": ");
            for (let i = 0; i < response.data.length; i++) {
                var show = response.data[i];
                console.log(show.venue.city + "," +
                 (show.venue.region || show.venue.country +
                     " at " + show.venue.name + " " +
                     moment(show.datatime).format("MM/DD/YYYY") ))
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};

//Spotify
function getMySong(params){
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var Spotify = require('node-spotify-api');
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});
};


//OMDB
function getMyMovie(params){
    var axios = require("axios");
    var nodeArgs = process.argv;
    var movieName = "";

    for(var i = 2; i < nodeArgs.length; i++){
        if (i > 2 && i < nodeArgs.length){
            movieName = movieName + "+" + nodeArgs[i];
        }
        else{
            movieName += nodeArgs[i];
        }
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + params + "&y=&plot=short&apikey=trilogy";
    console.log(queryURL);

    axios.get(queryURL).then(
        function(response){
            console.log("Release Year: " + response.data.Year);
        }
    )
    .catch(function (error) {
        console.log(error);
    });
};

// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.
