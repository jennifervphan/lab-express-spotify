const express = require('express');
// const app = express();
const bodyParser = require('body-parser')
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');

// setting the spotify-api goes here:
const clientId = '7fcadeae961942f192f92d095ac96576',
    clientSecret = '9a9bb0a1083744ada422b91e579aa053';

const spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret
});


spotifyApi.clientCredentialsGrant()
    .then(function(data) {
        spotifyApi.setAccessToken(data.body['access_token']);
    }, function(err) {
        console.log('Something went wrong when retrieving an access token', err);
    });


router.use(bodyParser.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', (req, res, next) => {
    res.render('index');
});

router.post('/', (req, res, next) => {
    let name = req.body.name;

    spotifyApi.searchArtists(`${name}`)
        .then(function(artist) {
            console.log(artist.body.artists.items[0].images);
            res.render('artists', { artist });
        })
        .catch(() => {
            res.status(500).send("ERROR");

        })
});

module.exports = router;