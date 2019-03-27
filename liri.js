require("dotenv").config();

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
        case movie-this(params):
            // code block
            break;
        case "do-what-it-says":
            doWhatISay();
            break;
        default:
            console.log("I dont know that command")
    }
};

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

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: "9c16f68fc27c4260a12d6d608d7769d8",
  secret: "1b1dacd030c54078bb865f1c419d81db"
});
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});
//Spotify
// Client ID 9c16f68fc27c4260a12d6d608d7769d8
// Client Secret 1b1dacd030c54078bb865f1c419d81db