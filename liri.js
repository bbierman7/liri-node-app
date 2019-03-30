require("dotenv").config();
var figlet = require('figlet');
const chalkAnimation = require('chalk-animation');
const axios = require("axios");
const moment = require("moment")
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var params= process.argv.slice(3).join("+");


//Decoration for the word LIRI
figlet('LIRI', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    const rainbow = chalkAnimation.rainbow(data); // Animation starts

    setTimeout(() => {
        rainbow.stop(); // Animation stops
    });

    setTimeout(() => {
        rainbow.start(); // Animation resumes
    }, 1000);

});

setTimeout(runApp, 1000);

function runApp() {
    App(process.argv[2], process.argv[3])
};

//
function App(command, params) {
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
        case "do-what-it-says":
            doWhatISay();
            break;
        default:
            console.log("I dont know that command")
    }
};

//Band
function getMyBand(params) {
    var queryURL = "https://rest.bandsintown.com/artists/" + params + "/events?app_id=codingbootcamp";
    axios.get(queryURL)
        .then(function (response) {
            console.log("upcoming concerts for " + params + ": ");
            for (let i = 0; i < response.data.length; i++) {
                var show = response.data[i];
                console.log(show.venue.city + "," +
                    (show.venue.region || show.venue.country) +
                    " at " + show.venue.name + " " +
                    moment(show.datetime).format("MM/DD/YYYY"))
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};

//Spotify
function getMySong(params) {
    spotify.search({ type: 'track', query: params }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // console.log(JSON.stringify(data, null, 2)); 
        var songs = data.tracks.items;
        for (let i = 0; i < songs.length; i++) {

            console.log("number: ", i + 1, "/", songs.length);
            console.log("artist(s): ", songs[i].artists[0].name);
            console.log("song name: ", songs[i].name);  
            console.log("preview song: ", songs[i].preview_url);
            console.log("album: ", songs[i].album.name);
            console.log("===============================================");
        }
    });
};

function doWhatISay() {
	var commands;
    var parameter;

	
	fs.readFile("random.txt", "utf8", function (error, data) {	
		if (error) {
			return console.log(error);
        }
        console.log(data);
        // const dataArr = data.split(',');
        var dataArr = data.split(',');
        
        commands=dataArr[0];
        parameter=dataArr[1];
        // console.log(dataArr);
        // console.log(parameter);
        // console.log("here");
        App(commands, parameter);
        // App(commands, parameter);


		// for (var i = 0; i < dataArr.length; i++) {
		// 	commands = dataArr[i];
		// 	parameter = dataArr[i];
		// 	console.log(commands, parameter);
		// 	App(commands, parameter)
		// };
	})
};



//OMDB
// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.
function getMyMovie(params) {
    var axios = require("axios");
    // var nodeArgs = process.argv;
    // var movieName = "";
    var params= process.argv.slice(3).join("+");
  

    if(params=="") {
        params="Mr.Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + params + "&y=&plot=short&apikey=trilogy";
    console.log(queryUrl);

    // queryUrl = "http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy"
    axios.get(queryUrl).then(
        function (response) {
            for(var i=0;i<response.data.Ratings.length;i++) {
                if(response.data.Ratings[i].Source=="Rotten Tomatoes") {
                    var rotten=response.data.Ratings[i].Value;
                }
            }
            console.log(
                "\nTitle: " + response.data.Title +
                "\nRelease Year: " + response.data.Released +
                "\nRotten Tomatoes Rating: " + rotten +
                "\nIMDB Rating: " + response.data.imdbRating +
                "\nCountry of production: " + response.data.Country +
                "\nLanguage: " + response.data.Language +
                "\nPlot: " + response.data.Plot +
                "\nActors: " + response.data.Actors
            );
        }
    )
        .catch(function (error) {
            console.log(error);
        });
};

