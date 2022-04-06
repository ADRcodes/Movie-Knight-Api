const cors = require('cors');
const express = require('express');
const app = express()
const fs = require("fs");
const streamingAvailability = require('./apis/apis')
const genreConvert = require('./utils/genreConvert')
app.use(express.json())
app.use(express.static('./public'))
app.use(cors());

const PORT = 8080;


const getMovies = () => {
    const movies = fs.readFileSync('./data/movieData.json')
    return JSON.parse(movies)
}

const saveMovies = (movies) => {
    fs.writeFileSync('./data/movieData.json', JSON.stringify(movies))
}


// ----------- To update movie data, uncomment below and edit lines 8 - 11 in apis.js ----------

// streamingAvailability().then(function (updatedMovies) {
//     updatedMovies.forEach(movie => {
//         if (movie.streamingInfo) {
//             if (movie.streamingInfo.disney) {
//                 movie.streamingInfoDisney = movie.streamingInfo.disney.ca.link
//             }
//             if (movie.streamingInfo.netflix) {
//                 movie.streamingInfoNetflix = movie.streamingInfo.netflix.ca.link
//             }
//         }
//         if (typeof (movie.genre1) === "number") {
//             movie.genre1 = genreConvert(movie.genre1)
//         }
//         if (typeof (movie.genre2) === "number") {
//             movie.genre2 = genreConvert(movie.genre2)
//         }
//         if (typeof (movie.genre3) === "number") {
//             movie.genre3 = genreConvert(movie.genre3)
//         } else {
//             delete movie.genre3
//         }

//     });
//     if(updatedMovies.length !== getMovies().length){
//         saveMovies(updatedMovies)
//         console.log("movies updated")
//     }
//     else {
//         return;
//     }
// })


//Routes
const movieRoutes = require('./routes/movies');
app.use('/browse', movieRoutes);


//Listen
app.listen(PORT, () => {
    console.log("server is running on port " + PORT)
})