const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// require spotify-web-api-node package here
const SpotifyWebApi = require('spotify-web-api-node');

// setting the spotify-api goes here:
const clientId = '7fcadeae961942f192f92d095ac96576';
const clientSecret = '9a9bb0a1083744ada422b91e579aa053';

const spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret
});

spotifyApi.clientCredentialsGrant()
    .then(data => {
        spotifyApi.setAccessToken(data.body['access_token']);
    })
    .catch(error => {
        console.log('Something went wrong when retrieving an access token', error);
    })

// the routes go here:
const index = require('./routes/index');
app.use('/', index);

const artists = require('./routes/artists');
app.use('/', artists);

const albums = require('./routes/albums');
app.use('/', albums);

const tracks = require('./routes/tracks');
app.use('/', tracks)

app.listen(3000, () => console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊"));