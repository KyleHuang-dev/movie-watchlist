const addBtn = document.querySelectorAll('.add')
const deleteBtn = document.querySelectorAll('.del')
const movieItem = document.querySelectorAll('span.not')
const movieComplete = document.querySelectorAll('span.completed')

Array.from(addBtn).forEach((el) => {
    el.addEventListener('click', addMovie)
})

Array.from(deleteBtn).forEach((el) => {
    el.addEventListener('click', deleteMovie)
})

Array.from(movieItem).forEach((el) => {
    el.addEventListener('click', watched)
})

Array.from(movieComplete).forEach((el) => {
    el.addEventListener('click', unwatched)
})

async function addMovie() {
    const movieId = this.parentNode.dataset.id
    const movieTitle = this.parentNode.dataset.title
    const moviePoster = this.parentNode.dataset.poster_path
    try {
        const response = await fetch('./findMovie/addMovie', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'movieIdFromJSFile': movieId,
                'title': movieTitle,
                'poster': moviePoster
            })
        })
        const data = await response.json()
        // console.log(data)
        window.location = '/movies'
    } catch (err) {
        console.log(err)
    }
}

async function deleteMovie() {
    const movieId = this.parentNode.dataset.id
    try {
        const response = await fetch('movies/deleteMovie', {
            method: 'delete',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'movieIdFromJSFile': movieId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}

async function watched() {
    const movieId = this.parentNode.dataset.id
    try {
        const response = await fetch('movies/watched', {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'movieIdFromJSFile': movieId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}

async function unwatched() {
    const movieId = this.parentNode.dataset.id
    try {
        const response = await fetch('movies/unwatched', {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'movieIdFromJSFile': movieId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}