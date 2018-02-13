// require("dotenv").config();

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

var action = process.argv[2];

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
if (action === "my-tweets") {
//This will show your last 20 tweets and when they were created at in your terminal/bash window.






} else if (action === "spotify-this-song") {

// This will show the following information about the song in your terminal/bash window
	// Artist(s)
	// The song's name
	// A preview link of the song from Spotify
	// The album that the song is from
	// If no song is provided then your program will default to "The Sign" by Ace of Base.

} else if (action === "movie-this") {
	
	var request = require("request");

	if (process.argv[3]) {

		var movieName = process.argv[3];

		for (var i = 4; i < process.argv.length; i++) {
		movieName += `+${process.argv[i]}`;
		}

	} else {

		var movieName = "Mr. Nobody"
	}

	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

	console.log(queryUrl);

	request(queryUrl, function(error, response, body) {

		if (!error && response.statusCode === 200) {
	    	console.log(`Title: ${JSON.parse(body).Title}`);
	    	console.log(`Release Year: ${JSON.parse(body).Year}`);
	    	console.log(`IMBD Rating: ${JSON.parse(body).imdbRating}/10`);
	    	console.log(`Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}`);	    	
	    	console.log(`Country: ${JSON.parse(body).Country}`);
	    	console.log(`Language: ${JSON.parse(body).Language}`);
	    	console.log(`Plot: ${JSON.parse(body).Plot}`);
 	    	console.log(`Actors: ${JSON.parse(body).Actors}`);
	  	}

	});

} else if (action === "do-what-it-says") {

	var fs = require("fs");

	fs.readFile("random.txt", "utf8", function(error, data) {

	  	if (error) {
	    	return console.log(error);
	  	}

	  	console.log(data);

	  	var dataArr = data.split(",");
	  	var newAction = dataArr[0];
	  	var newValue = dataArr[1];
	  	console.log(newAction);
	  	console.log(newValue);

	  	//now make it do what it says in the new action with the new value

	});

}
