const puppeteer = require("puppeteer")

const launchSingleScraper = async (link) => {
  const browser = await puppeteer.launch({
    headless: true,
  })
  const page = await browser.newPage()

  await page.goto(link)
  const scraped = await singleScraper(page)

  return scraped
}

const singleScraper = async (page) => {
  const streamingLink = await page.$$eval(
    "div.price-comparison__grid__row__element__icon a",
    (el) => el.map((x) => x.getAttribute("href"))
  )
  const imdbRating = await page.$$eval(
    "div.jw-scoring-listing__rating a",
    (el) => el.map((x) => x.innerText)
  )
  const imdbId = await page.$$eval("div.jw-scoring-listing__rating a", (el) =>
    el.map((x) => x.getAttribute("href"))
  )
  const genres = await page.$$eval("div.detail-infos__value", (el) =>
    el.map((x) => x.innerText)
  )

  const filteredGenres = genres[1].split(" , ")

  for (let i = 0; i < 5; i++) {
    if (filteredGenres[i] === undefined) {
      filteredGenres[i] = "null"
    }
  }
  const synopsis = await page.$$eval("p.text-wrap-pre-line span", (anchors) =>
    anchors.map((anchor) => anchor.innerText)
  )

  const streamingServices = await page.$$eval(
    "img.price-comparison__grid__row__icon",
    (el) => el.map((x) => x.getAttribute("alt"))
  )

  let detailMovieData = {
    imdbId: imdbId[1].slice(27, 36),
    imdbRating: imdbRating[1].trim(),
    // streamingLink: streamingLink,
    runTime: genres[2],
    director: genres[3],
    streamingServices: streamingServices[0],
    genre1: filteredGenres[0].trim(),
    genre2: filteredGenres[1].trim(),
    genre3: filteredGenres[2].trim(),
    genre4: filteredGenres[3].trim(),
    genre5: filteredGenres[4].trim(),
    synopsis: synopsis[0].trim(),
  }

  //   console.log(detailMovieData)
  return detailMovieData
}

module.exports = launchSingleScraper
