# Liri-Node-APP

**L**anguage **I**nterpretation and **R**ecognition **I**nterface

Takes input and spits output :)


## To use, 

* Clone repository, use an "npm install" in your terminale to install all necessary packages for game from package-json file.

* Create a .env file in the cloned repository.  You must enter your Twitter and Spotify keys/tokens/SECRETS into this .env file.  Here is what you should enter in the .env file (INSERT YOUR DETAILS IN ALL THE NECESSARY SPOTS):

		```
		# Spotify API keys

		SPOTIFY_ID=your-spotify-id
		SPOTIFY_SECRET=your-spotify-secret

		# Twitter API keys

		TWITTER_CONSUMER_KEY=your-twitter-consumer-key
		TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
		TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
		TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret
		```


* Once all packages are installed and .env file is created, open your teminal

#### You have 4 options:

##### 1. node liri.js my-tweets

	* This will show the last 20 tweets for the connected account

##### 2. node liri.js spotify-this-song ""

	* This will seach spotify for the song entered in the ""
	* It will return details about hte song, artist, and a previe to the song (if available)

##### 3. node liri.js movie-this ""

	* This will seach OMDB for the movie entered in the ""
	* It will return details about hte movie

##### 4. node liri.js do-what-it-says
	
	* This will have LIRI execute whatever the random.txt file has in it.  THe format for entering text into this is"

		```
		command, ""
		Ex. movie-this, "Space Jam"
		```



LIRI will also save all of your searches to a log.txt file automagically.


## Built With

* Node.js

## Versioning

1.0

## Authors

* **Samuel Mast** - [GitHub](https://github.com/SamMast)