require("dotenv").config();

const Twitter = require('twitter');
const Spotify = require('node-spotify-api');

const twitterKeys = require('./keys.js').twitter;
const spotifyKeys = require('./keys.js').spotify;


const client = new Twitter(twitterKeys);
const spotify = new Spotify(spotifyKeys);

var action = process.argv[2];
var newValue = "";

function tweetSearch() {
	
	var params = {screen_name: 'sleechinator'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  	if (!error) {
		  	for (var i = 0; i < 20; i++) {
				console.log("-------")
		    	console.log(`Tweet ${i+1}: ${tweets[i].text}`);
		    	console.log(`Timestamp: ${tweets[i].created_at}`)
			}
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

		console.log("-------") 
		console.log(data.tracks.items[0].album.artists[0].name); 
		console.log(data.tracks.items[0].name); 
		console.log(data.tracks.items[0].preview_url);
		console.log(data.tracks.items[0].album.name); 
		console.log("-------")


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
			console.log("-------------")
	    	console.log(`Title: ${JSON.parse(body).Title}`);
	    	console.log(`Release Year: ${JSON.parse(body).Year}`);
	    	console.log(`IMBD Rating: ${JSON.parse(body).imdbRating}/10`);
	    	console.log(`Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}`);	    	
	    	console.log(`Country: ${JSON.parse(body).Country}`);
	    	console.log(`Language: ${JSON.parse(body).Language}`);
	    	console.log(`Plot: ${JSON.parse(body).Plot}`);
 	    	console.log(`Actors: ${JSON.parse(body).Actors}`);
			console.log("-------------")
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

	}

}


function writeLog() {

	var fs = require("fs");

	var data = ""//need to somehow save the data on the console log into a variable, then call this function after each conditional is run

	fs.appendFile("log.txt", data, function(err) {

	  if (err) {
	    console.log(err);
	  }

	  else {
	    console.log("Added to log.txt");
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
	  	console.log(action);
	  	console.log(newValue);
	  	decide();

	});

} else {
	decide();
}



