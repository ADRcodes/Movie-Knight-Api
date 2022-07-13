const puppeteer = require("puppeteer");

const url = "https://www.justwatch.com/ca/movies?providers=dnp,nfx,prv";
const url2 = "https://www.justwatch.com/ca/movies";

const scraper = require("./scraper");
const singleScraper = require("./singleScraper");

const launchScraper = async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  await page.goto(url);
  let allMovies = await scraper(page, 0);

  // get detailed info
  allMovies.forEach((movie, i) => {
    let link = movie.link;
    console.log(link);
    let movieDetails = singleScraper(link)
    setTimeout(() => console.log({
      ...allMovies[i],
      ...movieDetails,
    }), 10000);
    // allMovies[i] = {
    //   ...allMovies[i],
    //   ...movieDetails,
    // };
  });

  // allMoviesDetails();

  setTimeout(() => console.log(allMovies), 1000);

  // const leMovies = async () => {
  //   const result = await allMoviesDetails;
  //   console.log(result);
  //   // console.log(allMovies)
  // };
  // leMovies()
  // await console.log(allMovies)

  // get old movies from database

  // check for duplicates

  // add to database

  return allMovies;
};


module.exports = launchScraper
