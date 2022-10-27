const express = require('express')
const router = express.Router()
const moviesController = require('../controllers/movies')
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, moviesController.getMovies)

router.post('/findMovie', moviesController.findMovie)

router.post('/findMovie/addMovie', moviesController.addMovie)

router.put('/watched', moviesController.watched)

router.put('/unwatched', moviesController.unwatched)

router.delete('/deleteMovie/:id', moviesController.deleteMovie)

module.exports = router
 
