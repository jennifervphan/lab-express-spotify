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

router.get('/tracks', (req, res, next) => {
    let albumId = req.query.album_id
    spotifyApi.getAlbumTracks(albumId)
        .then((tracks) => {
            console.log(tracks.body.items)
            res.render('tracks', { tracks });
        })
        .catch(() => {
            res.status(500).send("ERROR");
        })
})

module.exports = router;