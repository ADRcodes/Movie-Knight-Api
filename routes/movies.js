const express = require("express")
const router = express.Router()
const fs = require("fs")

const getMovies = () => {
  const movies = fs.readFileSync("./data/movieData.json")
  return JSON.parse(movies)
}

const saveMovies = (movies) => {
  console.log("saving movies")
  fs.writeFileSync("./data/movieData.json", JSON.stringify(movies))
}

router.get("/", (_req, res) => {
  let allMovies = getMovies().map((movie) => {
    return {
      imdbID: movie.imdbID,
      title: movie.title,
      overview: movie.overview,
      imdbRating: movie.imdbRating,
      genre1: movie.genre1,
      genre2: movie.genre2,
      genre3: movie.genre3,
      year: movie.year,
      streamingInfo: movie.streamingInfo,
      streamingInfoNetflix: movie.streamingInfoNetflix,
      streamingInfoDisney: movie.streamingInfoDisney,
      overview: movie.overview,
      posterURL: movie.posterURL,
      rating: movie.rating,
      friendRating: movie.friendRating,
    }
  })

  res.status(200).json(allMovies)
})

router.put("/:imdbID", (req, res) => {
  const { imdbID: id } = req.params
  const { rating: rating } = req.body

  let movies = getMovies()

  movieToUpdate = movies.find((movie) => movie.imdbID === id)
  movieToUpdate.rating = rating

  let movieIndex = movies.findIndex(
    (movie) => movie.imdbID === movieToUpdate.imdbID
  )
  movies.splice(movieIndex, 1, movieToUpdate)

  saveMovies(movies)

  res.status(201).json(movieToUpdate)
})

module.exports = router
