const puppeteer = require("puppeteer");

const diceWebScraper = async (url) => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const allPosts = [];
  let pageNumber = 1;
  let pageNextExists = true;
  await page.goto(url);

  while (true) {
    await page.waitForSelector("dhi-search-cards-widget", { timeout: 10_000 });
    // gets post info
    const pagePosts = await page.evaluate(() => {
      const posts = document.querySelectorAll("dhi-search-card");
      return Array.from(posts).map((post) => {
        const title = post.querySelector(".card-title-link").innerText ?? "n/a";
        const companyName =
          post.querySelector('[data-cy="search-result-company-name"]')
            .innerText ?? "n/a";
        const companyLocation =
          post.querySelector('[data-cy="search-result-location"]').innerText ??
          "n/a";
        const url = post.querySelector(".card-title-link").href ?? "n/a";
        const description =
          post.querySelector('[data-cy="card-summary"]').innerText ?? "n/a";

        return {
          title,
          companyName,
          companyLocation,
          url,
          salary: "n/a",
          description,
          date: new Date().toString(),
        };
      });
    });
    allPosts.push(...pagePosts);
    pageNextExists = await page.evaluate(() => {
      return !document.querySelector(".pagination-next.disabled");
    });
    // CURRENTLY ON
    if (!pageNextExists) break;
    await page.waitForSelector(".pagination-page", { timeout: 10_000 });
    url = url.split(`page=${pageNumber}`);
    pageNumber++;
    url = url.join(`page=${pageNumber}`);
    // console.log(pageNumber, pageNextExists, url);
    await page.goto(url + pageNumber)
  }

  // UNCOMMENT TO CHECK
  // console.log(allPosts);
  await browser.close();
  return allPosts;
};

// diceWebScraper(
//   "https://www.dice.com/jobs?q=react%20-senior%20-sr%20-staff%20-architect%20-Principal%20-manager&location=Remote,%20OR,%20USA&latitude=43.00594549999999&longitude=-123.8925908&countryCode=US&locationPrecision=City&radius=30&radiusUnit=mi&page=1&pageSize=10&filters.postedDate=ONE&language=en&eid=S2Q_"
// );

module.exports = diceWebScraper;