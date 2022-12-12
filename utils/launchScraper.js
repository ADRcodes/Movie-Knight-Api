const puppeteer = require("puppeteer")

const url = "https://www.justwatch.com/ca/movies?providers=dnp,nfx,prv"

const scraper = require("./scraper")
const singleScraper = require("./singleScraper")

let allMovies
const launchScraper = async () => {
  const browser = await puppeteer.launch({
    headless: true,
  })
  const page = await browser.newPage()

  await page.goto(url)
  allMovies = await scraper(page, 0)

  // get detailed info
  await allMovies.forEach((movie, i) => {
    let movieDetails = singleScraper(movie.link)
    console.log(movieDetails)
    allMovies[i] = {
      ...allMovies[i],
      ...movieDetails,
    }
  })

  console.log(allMovies)

  // TODO get old movies from database

  // TODO Add only new movies

  // TODO Add to updated movies to database

  return allMovies
}

module.exports = launchScraper
