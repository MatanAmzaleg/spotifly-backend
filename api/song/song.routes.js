const express = require('express')
const { getCurrSongs, fetchRelatedSongs, getSongs, fetchLyrics , getSong} = require('./song.controller')
const router = express.Router()


router.get('/', getSongs)
router.get('/lyrics', fetchLyrics)
router.get('/related', fetchRelatedSongs)
router.get('/:id', getSong)


module.exports = router