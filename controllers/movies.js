const Movie = require('../models/Movie')
// const form = document.getElementById('form')



// All the different operations you can do in the movie list


module.exports = {
    getMovies: async (req, res) => {
        console.log(req.user)
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`);
            const data = await response.json();
            // console.log(data); 
            const movieItems = await Movie.find({ userId: req.user.id })
            const itemsLeft = await Movie.countDocuments({ userId: req.user.id, completed: false })
            res.render('movies.ejs', { movies: movieItems, left: itemsLeft, user: req.user, data:data})
        } catch (err) {
            console.log(err)
        }
    },

    // redirect to add movies page with movies that match search term. 
    addMovie: async (req, res) => {
        // try {
            await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&page=1&include_adult=false&query=${req.body.movieItem}`)
            .then((res) => res.json())
            .then(data => {
                console.log(data.results)
                res.render('add-movie.ejs', {movies: data.results})})
        // }catch(err){ 
        //     console.log(err)
        // }
    },
    
    // add selected movie to watch list
    addToList: async (req, res) => {
        try {
            await Movie.create({_id: req.body.movieIdFromJSFile, movie: req.body.title, poster: req.body.poster, completed: false, userId: req.user.id})
            console.log('Movie has been added!')
            res.redirect('/movies')
        } catch(err){
            console.log(err)
        }
    },

    // mark a movie as watched
    watched: async (req, res) => {
        try {
            await Movie.findOneAndUpdate({ _id: req.body.movieIdFromJSFile }, {
                completed: true
            })
            console.log('Mark Watched')
            res.json('Mark Watched')
        } catch (err) {
            console.log(err)
        }
    },
    // mark a movie as unwatched
    unwatched: async (req, res) => {
        try {
            await Movie.findOneAndUpdate({ _id: req.body.movieIdFromJSFile }, {
                completed: false
            })
            console.log('Marked Unwatched')
            res.json('Marked Unwatched')
        } catch (err) {
            console.log(err)
        }
    },
    // delete a movie on the list
    deleteMovie: async (req, res) => {
        console.log(req.body.movieIdFromJSFile)
        try {
            await Movie.findOneAndDelete({ _id: req.body.movieIdFromJSFile })
            console.log('Deleted Movie')
            res.json('Deleted It')
        } catch (err) {
            console.log(err)
        }
    }
}    