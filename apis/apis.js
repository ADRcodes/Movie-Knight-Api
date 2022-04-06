const axios = require('axios')
const fs = require("fs");
const express = require('express');
const app = express()
app.use(express.json())
app.use(express.static('../public'))

//------------ Once section is uncommented in server.js, Edit below to download movie data 
//----------------(each call saves 10 movies)-------------------------
//----------------(limit of 100 calls per day)------------------------

const genre = 878;
const streamingService = "disney";
const country = "ca";
const page = "4";

const genreKey = {
    "1": "Biography",
    "2": "Film Noir",
    "3": "Game Show",
    "4": "Musical",
    "5": "Sport",
    "6": "Short",
    "7": "Adult",
    "12": "Adventure",
    "14": "Fantasy",
    "16": "Animation",
    "18": "Drama",
    "27": "Horror",
    "28": "Action",
    "35": "Comedy",
    "36": "History",
    "37": "Western",
    "53": "Thriller",
    "80": "Crime",
    "99": "Documentary",
    "878": "Science Fiction",
    "9648": "Mystery",
    "10402": "Music",
    "10749": "Romance",
    "10751": "Family",
    "10752": "War",
    "10763": "News",
    "10764": "Reality",
    "10767": "Talk Show"
}

const options = {
    method: 'GET',
    url: 'https://streaming-availability.p.rapidapi.com/search/basic',
    params: {
        country: country,
        service: streamingService,
        type: 'movie',
        genre: genre,
        page: page,
        output_language: 'en',
        language: 'en'
    },
    headers: {
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
        'X-RapidAPI-Key': '9a87deb617msh16feea32bef961ep1e5026jsn3155949ab9aa'
    }
};

const getMovies = () => {
    const movies = fs.readFileSync('./data/movieData.json')
    return JSON.parse(movies)
}

const streamingAvailability = () => {
    return axios.request(options)
        .then(function (response) {
            let currentMovies = getMovies()
            let formattedMovies = response.data.results
                .map(movie => ({
                    imdbID: movie.imdbID,
                    title: movie.originalTitle,
                    imdbRating: movie.imdbRating,
                    genre1: movie.genres[0],
                    genre2: movie.genres[1],
                    genre3: movie.genres[2],
                    year: movie.year,
                    streamingInfo: movie.streamingInfo,
                    overview: movie.overview,
                    posterURL: movie.posterURLs.original
                }))
            return addNewMovies(formattedMovies, currentMovies);
        })
        .catch(function (error) {
            console.error(error);
        });
}

const addNewMovies = (newMovies, currentMovies) => {
    newMovies.forEach(newObject => {
        let inArray = false;

        currentMovies.forEach(currentObject => {
            if (newObject.imdbID === currentObject.imdbID) {
                inArray = true
            }
        })
        if (!inArray) {
            currentMovies.push(newObject)
        }
    })
    return currentMovies;
}


module.exports = streamingAvailability