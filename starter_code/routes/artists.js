const express = require('express');
const router = express.Router();

router.get('/artists', (req, res, next) => {
    res.render('artists');
});

module.exports = router;