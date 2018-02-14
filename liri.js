require("dotenv").config();

const Twitter = require('twitter');
const Spotify = require('node-spotify-api');

const twitterKeys = require('./keys.js').twitter;
const spotifyKeys = require('./keys.js').spotify;


const client = new Twitter(twitterKeys);
const spotify = new Spotify(spotifyKeys);

var action = process.argv[2];
var newValue = "";

var request = "";
var result = "";
var resultArray = [];

for (var i = 2; i < process.argv.length; i++) {
	request += (`${process.argv[i]} `);
}


function tweetSearch() {
	
	var params = {screen_name: 'sleechinator'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  	if (!error) {
			result = "";

		  	for (var i = 0; i < 5; i++) {

		  		var tweet = tweets[i].text
		  		var time = tweets[i].created_at
		  		result = (`-------\nTweet ${i+1}: ${tweet}\nTimestamp: ${time}\n-------`)
		  		resultArray.push(result);

				console.log(result);

			}

		result = resultArray.join("\n")
		writeLog();

	  	}
	});

}

function spotifySearch(item) {
	
	var search = (item || process.argv[3] || "The Sign, Ace of Base")

	if (process.argv[4]) {
		for (var i = 4; i < process.argv.length; i++) {
			search += (`+${process.argv[i]}`)
		}
	}

	spotify.search({ type: 'track', query: search }, function(err, data) {
	  	if (err) {
	    	return console.log('Error occurred: ' + err);
	  	}

	  	var artist = data.tracks.items[0].album.artists[0].name;
	  	var song = data.tracks.items[0].name;
	  	var preview = data.tracks.items[0].preview_url;
	  	var album = data.tracks.items[0].album.name;

	  	result = (`-------\nArtist: ${artist}\nSong: ${song}\nPreview Link: ${preview}\nAlbum: ${album}\n-------`);
		console.log(result);

		writeLog();

	});	
}

function movieSearch(item) {
	
	var request = require("request");

	if (process.argv[3]) {

		var movieName = (process.argv[3]);

		for (var i = 4; i < process.argv.length; i++) {
		movieName += `+${process.argv[i]}`;
		}

	} else {

		var movieName = (item || "Mr. Nobody")
	}

	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

	request(queryUrl, function(error, response, body) {

		if (!error && response.statusCode === 200) {
			
			var title = JSON.parse(body).Title
			var year = JSON.parse(body).Year
			var imbd = JSON.parse(body).imdbRating
			var rotten = JSON.parse(body).Ratings[1].Value
			var country = JSON.parse(body).Country
			var language = JSON.parse(body).Language;
			var plot = JSON.parse(body).Plot;
			var actors = JSON.parse(body).Actors;

			result = (`-------------\nTitle: ${title}\nRelease Year: ${year}\nIMBD Rating: ${imbd}/10\nRotten Tomatoes Rating: ${rotten}\nCountry: ${country}\nLanguage: ${language}\nPlot: ${plot}\nActors: ${actors}\n-------------`);

			console.log(result);
			writeLog();
	  	}

	});	
}

function decide() {

	if (action === "my-tweets") {
	
		tweetSearch(newValue);

	} else if (action === "spotify-this-song") {

		spotifySearch(newValue);

	} else if (action === "movie-this") {
		
		movieSearch(newValue);

	} else {
		console.log("Invalid Entry")
	}

}


function writeLog() {

	var fs = require("fs");

	var data = (`\nRequest: ${request}\n${result}\n==========`)

	fs.appendFile("log.txt", data, function(err) {

	  if (err) {
	    console.log(err);
	  }

	  else {
	    console.log("(added to log.txt)");
	  }

	});

}



//Conditionals

if (action === "do-what-it-says") {

	var fs = require("fs");

	fs.readFile("random.txt", "utf8", function(error, data) {

	  	if (error) {
	    	return console.log(error);
	  	}

	  	var dataArr = data.split(",");
	  	action = dataArr[0];
	  	newValue = dataArr[1];
	  	request = (`do-what-it-says (${action} ${newValue})`)
	  	console.log(action);
	  	console.log(newValue);
	  	decide();

	});

} else {
	decide();
}



