const puppeteer = require("puppeteer");

const diceWebScraper = async (url) => {
  // browser set up
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto(url);

  const allPosts = [];
  let pageNumber = 1;
  let pageNextExists = true;

  // loops through each page job posts
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

    // adds posts
    allPosts.push(...pagePosts);
    // checks if we are on last page
    pageNextExists = await page.evaluate(() => {
      return !document.querySelector(".pagination-next.disabled");
    });

    if (!pageNextExists) break;

    // moves to next page
    await page.waitForSelector(".pagination-page", { timeout: 10_000 });
    url = url.split(`page=${pageNumber}`);
    pageNumber++;
    url = url.join(`page=${pageNumber}`);
    await page.goto(url + pageNumber)
  }

  await browser.close();
  return allPosts;
};

module.exports = diceWebScraper;