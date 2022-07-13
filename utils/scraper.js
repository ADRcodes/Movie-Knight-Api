const scrapeScroll = async (page, itemTargetCount) => {
    let titleCount = 0;
  
    while (itemTargetCount > titleCount) {
      const titles = await page.$$eval("img.picture-comp__img", (el) =>
        el.map((x) => x.getAttribute("alt"))
      );
      titleCount = titles.length;
  
      previousHeight = await page.evaluate("document.body.scrollHeight");
      await page.evaluate("window.scrollTo(0,document.body.scrollHeight)");
      await page.waitForFunction(
        `document.body.scrollHeight > ${previousHeight}`
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  
    const allTitles = await page.$$eval("img.picture-comp__img", (el) =>
      el.map((x) => x.getAttribute("alt"))
    );
    const links = await page.$$eval("a.title-list-grid__item--link", (el) =>
      el.map((x) => x.getAttribute("href"))
    );
    const posters1 = await page.$$eval("img.picture-comp__img", (el) =>
      el.map((x) => x.getAttribute("src"))
    );
    const posters2 = await page.$$eval("img.picture-comp__img", (el) =>
      el.map((x) => x.getAttribute("data-src"))
    );
    const posters = posters1.map((poster, i) => {
      if (poster.substring(0, 4) === "http") {
        poster = posters1[i];
      } else {
        poster = posters2[i];
      }
      return poster;
    });
  
    let titlesAndProviders = allTitles.map((title, i) => {
      let allInfo = {
        title: title,
        link: "https://www.justwatch.com" + links[i],
        poster: posters[i],
      };
      return allInfo;
    });

    let tempArray = [titlesAndProviders[0],titlesAndProviders[1],titlesAndProviders[2]]

    return tempArray;
    // return titlesAndProviders;
  };


module.exports = scrapeScroll;