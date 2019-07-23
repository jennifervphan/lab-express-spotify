const express = require('express');
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

router.get('/albums', (req, res, next) => {
    let artistId = req.query.artist_id;
    spotifyApi.getArtistAlbums(artistId)
        .then((albums) => {
            console.log(albums.body.items)
            res.render('albums', { albums });
        })
        .catch(err => {
            res.status(500).send("ERROR");
        })
})

module.exports = router;